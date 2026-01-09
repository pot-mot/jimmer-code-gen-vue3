import ts from "typescript";
import {getTsFiles, writeFiles} from "../utils/fileTools";
import {ensureDirExists} from "../utils/checkFileExisted";
import {buildProjectTsProgram} from "../utils/buildProjectTsProgram";
import {getTypeInfo, hasTypeParameters, isFunctionType} from "../utils/typeTools";

const defaultScriptSourcePath = "src/modelEditor/script/default";
ensureDirExists(defaultScriptSourcePath)
const defaultScriptPath = "../jimmer-code-gen-kotlin-refactor/src/main/kotlin/top/potmot/init";
ensureDirExists(defaultScriptPath)

const defaultScriptSourceFiles = getTsFiles(defaultScriptSourcePath)

const {
    program,
    scriptTypeFiles,
} = buildProjectTsProgram(
    defaultScriptSourceFiles
)
const typeChecker = program.getTypeChecker()

// 默认脚本
const defaultScripts = []
const jvmLanguageSet = new Set(["JAVA", "KOTLIN"])
const databaseTypeSet = new Set(["MYSQL", "POSTGRESQL", "ORACLE", "SQLSERVER", "H2", "SQLITE"]);

// 收集脚本类型
const scriptTypeDeclareSet = new Set<string>()
for (const {fileName} of scriptTypeFiles) {
    const sourceFile = program.getSourceFile(fileName)
    for (const statement of sourceFile.statements) {
        const {declaration, type, typeName} = getTypeInfo(statement, typeChecker, fileName)

        if (!isFunctionType(type)) continue
        if (hasTypeParameters(declaration)) continue
        const signatures = type.getCallSignatures()
        if (signatures.length !== 1) continue

        scriptTypeDeclareSet.add(typeName)
    }
}

for (const {fileName} of defaultScriptSourceFiles) {
    const sourceFile = program.getSourceFile(fileName)
    if (sourceFile.statements.length !== 1) {
        throw new Error(`[${fileName}] contains more than one statement`)
    }
    const statement = sourceFile.statements[0]
    if (!ts.isVariableStatement(statement)) {
        throw new Error(`[${fileName}] contains statement not a variable declaration`)
    }
    const declaration = statement.declarationList.declarations[0];
    if (!declaration || !ts.isIdentifier(declaration.name)) {
        throw new Error(`[${fileName}] does not contain a valid identifier`);
    }

    const variableName = declaration.name.text;
    const variableType = typeChecker.getTypeAtLocation(declaration);
    const typeLiteral = typeChecker.typeToString(variableType);

    if (!isFunctionType(variableType)) {
        throw new Error(`[${fileName}] ${variableName} is not a function type`);
    }
    if (variableType.getCallSignatures().length !== 1) {
        throw new Error(`[${fileName}] ${variableName} has more than one call signature`);
    }
    if (!scriptTypeDeclareSet.has(typeLiteral)) {
        throw new Error(`[${fileName}] ${variableName} is not a script type`);
    }

    const leadingComments = ts.getLeadingCommentRanges(sourceFile.text, statement.getFullStart())
    let commentText = '';
    if (leadingComments) {
        commentText = leadingComments.map(range =>
            sourceFile.text.substring(range.pos, range.end)
        ).join('\n').trim()
    }

    let enabled = true;
    let databaseType = 'ANY';
    let jvmLanguage = 'ANY';
    if (commentText) {
        // 匹配 enabled=$value 格式
        const enabledMatch = commentText.match(/enabled\s*=\s*(\w+)/);
        if (enabledMatch) {
            enabled = enabledMatch[1].toLowerCase() === 'true';
        }

        // 匹配 databaseType=$value 格式
        const databaseTypeMatch = commentText.match(/databaseType\s*=\s*(\w+)/)
        const databaseTypeValue = databaseTypeMatch?.[1]?.toUpperCase();
        if (databaseTypeValue && databaseTypeSet.has(databaseTypeValue)) {
            databaseType = databaseTypeValue;
        }

        // 匹配 jvmLanguage=$value 格式
        const jvmLanguageMatch = commentText.match(/jvmLanguage\s*=\s*(\w+)/);
        const jvmLanguageValue = jvmLanguageMatch?.[1]?.toUpperCase();
        if (jvmLanguageValue && jvmLanguageSet.has(jvmLanguageValue)) {
            jvmLanguage = jvmLanguageValue
        }
    }

    defaultScripts.push({
        fileName,
        name: variableName,
        type: typeLiteral,
        enabled,
        databaseType,
        jvmLanguage,
        content: declaration.initializer.getFullText(sourceFile).trim()
    })
}

defaultScripts.sort((a, b) => a.name.localeCompare(b.name))


const defaultScriptFiles = [{
    fileName: `${defaultScriptPath}/GenerateScript.kt`,
    content: `package top.potmot.init

import top.potmot.entity.database.DatabaseTypeOrAny
import top.potmot.entity.model.JvmLanguageOrAny
import top.potmot.entity.script.ScriptType
import top.potmot.entity.script.dto.GenerateScriptInsertInput

val initGenerateScripts = listOf(
${defaultScripts.map(it => `    GenerateScriptInsertInput(
        name = "${it.name}",
        type = ScriptType.${it.type},
        enabled = ${it.enabled},
        databaseType = DatabaseTypeOrAny.${it.databaseType},
        jvmLanguage = JvmLanguageOrAny.${it.jvmLanguage},
        scriptContent = $$"""
${it.content}
""".trim(),
    )
`)}
)
`,
}]

writeFiles(defaultScriptFiles)