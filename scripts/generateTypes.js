import fs from "fs";
import ts from "typescript";
import * as tjs from "typescript-json-schema";
import {createDefaultMapFromNodeModules, createSystem, createVirtualCompilerHost} from "@typescript/vfs";
import path from "path";

// 确保目录存在
const ensureDirExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true})
    }
}

const modelPath = "src/type/model";
ensureDirExists(modelPath)
const contextPath = "src/type/context";
ensureDirExists(contextPath)
const scriptPath = "src/type/script";
ensureDirExists(scriptPath)
const defaultScriptSourcePath = "src/type/script/default";
ensureDirExists(defaultScriptSourcePath)

const typeDeclarePath = "src/type/__generated/typeDeclare";
ensureDirExists(typeDeclarePath)
const jsonSchemaPath = "src/type/__generated/jsonSchema";
ensureDirExists(jsonSchemaPath)
const contextJsonSchemaPath = "src/type/context/jsonSchema";
ensureDirExists(contextJsonSchemaPath)
const scriptTypeDeclarePath = "src/type/__generated/scriptTypeDeclare";
ensureDirExists(scriptTypeDeclarePath)
const defaultScriptPath = "src/type/__generated/defaultScript";
ensureDirExists(defaultScriptPath)
const scriptTemplatePath = "src/type/__generated/scriptTemplate";
ensureDirExists(scriptTemplatePath)

const getTsFiles = (path) => {
    const files = fs.readdirSync(path);
    return files
        .filter(it => it.endsWith(".ts"))
        .map(it => ({
            fileName: it,
            content: String(fs.readFileSync(path + "/" + it, "utf-8")).replace("\r\n", "\n"),
        }))
}

const getAllTsFiles = (dirPath) => {
    let results = [];

    const walk = (currentPath) => {
        const files = fs.readdirSync(currentPath);

        for (const file of files) {
            const fullPath = path.join(currentPath, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                walk(fullPath); // 递归遍历子目录
            } else if (file.endsWith(".ts")) {
                results.push({
                    fileName: path.relative(dirPath, fullPath).replace(/\\/g, "/"), // 保持相对路径
                    content: String(fs.readFileSync(fullPath, "utf-8")).replace(/\r\n/g, "\n"),
                });
            }
        }
    };

    walk(dirPath);
    return results;
};

const getDeclareTsFiles = (path) => {
    const files = fs.readdirSync(path);
    return files
        .filter(it => it.endsWith(".d.ts"))
        .map(it => ({
            fileName: it,
            content: String(fs.readFileSync(path + "/" + it, "utf-8")).replace("\r\n", "\n"),
        }))
}

const modelTypeFiles = getDeclareTsFiles(modelPath)
const contextTypeFiles = getDeclareTsFiles(contextPath)
const contextJsonSchemaFiles = getTsFiles(contextJsonSchemaPath)
const scriptTypeFiles = getDeclareTsFiles(scriptPath)
const defaultScriptSourceFiles = getAllTsFiles(defaultScriptSourcePath)

// 创建编译器选项
const compilerOptions = Object.freeze({
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    strict: true,
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true,
    baseUrl: "./",
    skipLibCheck: true, // 跳过库文件检查，解决 DOM 类型冲突
    skipDefaultLibCheck: true, // 跳过默认库检查
})

const fsMap = createDefaultMapFromNodeModules(
    compilerOptions,
)

for (const {fileName, content} of modelTypeFiles) {
    fsMap.set(fileName, content)
}
for (const {fileName, content} of contextTypeFiles) {
    fsMap.set(fileName, content)
}
for (const {fileName, content} of scriptTypeFiles) {
    fsMap.set(fileName, content)
}
for (const {fileName, content} of defaultScriptSourceFiles) {
    fsMap.set(fileName, content)
}

const system = createSystem(fsMap)
const host = createVirtualCompilerHost(system, compilerOptions, ts)

// 创建编译程序
const program = ts.createProgram({
    rootNames: [...fsMap.keys()],
    options: compilerOptions,
    host: host.compilerHost,
})

const isFunctionType = (type) => {
    if (!type) return false;
    const signatures = type.getCallSignatures();
    return signatures.length > 0;
}

const hasTypeParameters = (node) => {
    return node.typeParameters && Array.isArray(node.typeParameters) && node.typeParameters.length > 0;
}

const jsonSchemaProgram = tjs.getProgramFromFiles(
    modelTypeFiles.map(it => `${modelPath}/${it.fileName}`),
    {
        strictNullChecks: true,
    }
)

const typeChecker = program.getTypeChecker()
const jsonSchemaGenerator = tjs.buildGenerator(
    jsonSchemaProgram,
    {
        required: true,
        strictNullChecks: true,
    }
)


const existedTypeSet = new Set()

// 类型
const typeDeclares = []
const jsonSchemaDeclares = []

for (const {fileName} of modelTypeFiles) {
    const sourceFile = program.getSourceFile(fileName)
    for (const statement of sourceFile.statements) {
        if (
            !ts.isTypeAliasDeclaration(statement) &&
            !ts.isInterfaceDeclaration(statement)
        ) {
            throw new Error(`[${fileName}] contains statement not a type alias or interface`)
        }

        const type = typeChecker.getTypeAtLocation(statement)
        const typeName = statement?.symbol?.escapedName
        if (!type || !typeName) {
            throw new Error(`[${fileName}] ${statement} is not a valid type alias or interface`)
        }

        if (existedTypeSet.has(typeName)) {
            throw new Error(`[${fileName}] ${typeName} is already exists`)
        }

        const hasGenericType = hasTypeParameters(statement)

        const content = statement.getFullText(sourceFile)
        typeDeclares.push({type, typeName, content, hasGenericType})
        existedTypeSet.add(typeName)

        // 如果没有泛型参数则可以作为 json schema
        if (!hasGenericType) {
            const schema = jsonSchemaGenerator.getSchemaForSymbol(typeName)
            jsonSchemaDeclares.push({typeName, schema})
        }
    }
}

for (const {fileName} of contextTypeFiles) {
    const sourceFile = program.getSourceFile(fileName)
    for (const statement of sourceFile.statements) {
        if (
            !ts.isTypeAliasDeclaration(statement) &&
            !ts.isInterfaceDeclaration(statement)
        ) {
            throw new Error(`[${fileName}] contains statement not a type alias or interface`)
        }

        const type = typeChecker.getTypeAtLocation(statement)
        const typeName = statement?.symbol?.escapedName
        if (!type || !typeName) {
            throw new Error(`[${fileName}] ${statement} is not a valid type alias or interface`)
        }

        if (existedTypeSet.has(typeName)) {
            throw new Error(`[${fileName}] ${typeName} is already exists`)
        }

        const hasGenericType = hasTypeParameters(statement)

        const content = statement.getFullText(sourceFile)
        typeDeclares.push({type, typeName, content, hasGenericType})
        existedTypeSet.add(typeName)
    }
}

const contextExtraJsonSchema = []

for (const {fileName} of contextJsonSchemaFiles) {
    const typeName = fileName.replace(".ts", "")
    contextExtraJsonSchema.push({typeName})
}

typeDeclares.sort((a, b) => a.typeName.localeCompare(b.typeName))
jsonSchemaDeclares.sort((a, b) => a.typeName.localeCompare(b.typeName))
contextExtraJsonSchema.sort((a, b) => a.typeName.localeCompare(b.typeName))

// 脚本函数类型
const scriptTypeDeclares = []

for (const {fileName} of scriptTypeFiles) {
    const sourceFile = program.getSourceFile(fileName)
    for (const statement of sourceFile.statements) {
        if (
            !ts.isTypeAliasDeclaration(statement) &&
            !ts.isInterfaceDeclaration(statement)
        ) {
            throw new Error(`[${fileName}] contains statement not a type alias or interface`)
        }

        const type = typeChecker.getTypeAtLocation(statement)
        const typeName = statement?.symbol?.escapedName
        if (!type || !typeName) {
            throw new Error(`[${fileName}] ${statement} is not a valid type alias or interface`)
        }
        if (!isFunctionType(type)) {
            throw new Error(`[${fileName}] ${typeName} is not a function type`);
        }

        if (hasTypeParameters(statement)) {
            throw new Error(`[${fileName}] ${typeName} has type parameters`);
        }

        if (existedTypeSet.has(typeName)) {
            throw new Error(`[${fileName}] ${typeName} is already exists`)
        }

        const signatures = type.getCallSignatures()
        if (signatures.length !== 1) {
            throw new Error(`[${fileName}] ${typeName} has multiple call signatures`);
        }

        const signature = signatures[0]
        // 提取参数信息
        const parameters = signature.getParameters().map(param => {
            const paramName = param.getName()
            const paramType = typeChecker.getTypeOfSymbolAtLocation(param, statement)
            let paramTypeStr = "unknown"
            const declarations = param.getDeclarations()
            if (declarations && declarations.length > 0) {
                const paramDeclaration = declarations[0];
                if (ts.isParameter(paramDeclaration)) {
                    const typeNode = paramDeclaration.type;
                    if (typeNode) {
                        paramTypeStr = typeNode.getFullText(sourceFile).trim();
                    }
                }
            }
            return {
                name: paramName,
                type: paramType,
                typeStr: paramTypeStr
            }
        })
        // 提取返回值类型
        const returnType = signature.getReturnType()
        let returnTypeStr = "unknown"
        // 获取返回值的原始类型文本
        const returnTypeNode = signature.getDeclaration().type
        if (returnTypeNode) {
            returnTypeStr = returnTypeNode.getFullText(sourceFile).trim()
        } else {
            // 如果没有显式类型声明，回退到类型检查器的字符串表示
            returnTypeStr = typeChecker.typeToString(returnType)
        }

        existedTypeSet.add(typeName)

        const content = statement.getFullText(sourceFile)
        scriptTypeDeclares.push({type, typeName, content, parameters, returnType, returnTypeStr})
    }
}

scriptTypeDeclares.sort((a, b) => a.typeName.localeCompare(b.typeName))


// 默认脚本

const defaultScripts = []
const jvmLanguageSet = new Set(["JAVA", "KOTLIN"])
const databaseTypeSet = new Set(["MYSQL", "POSTGRESQL", "ORACLE", "SQLSERVER", "H2", "SQLITE"]);

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
    if (hasTypeParameters(declaration)) {
        throw new Error(`[${fileName}] ${variableName} has type parameters`);
    }
    if (variableType.getCallSignatures().length !== 1) {
        throw new Error(`[${fileName}] ${variableName} has more than one call signature`);
    }
    if (!scriptTypeDeclares.some(it => it.typeName === typeLiteral)) {
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
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replace(/\$/g, '\\$')
    })
}

defaultScripts.sort((a, b) => a.name.localeCompare(b.name))



// 设置文件内容

const typeDeclareFiles = typeDeclares.map(it => ({
    fileName: `${typeDeclarePath}/items/${it.typeName}.ts`,
    content: `export default Object.freeze({
    fileName: '${it.typeName}.d.ts',
    content: \`${it.content.trim()}\`,
})
`,
}))

typeDeclareFiles.push({
    fileName: `${typeDeclarePath}/index.ts`,
    content: `${typeDeclares.map(it => `import ${it.typeName}Declare from "./items/${it.typeName}.ts";`).join("\n")}

export type TypeMap = {
${typeDeclares.filter(it => !it.hasGenericType).map(it => `    ${it.typeName}: ${it.typeName}`).join("\n")}
}

export type TypeName = keyof TypeMap

export const typeDeclares = Object.freeze({
${typeDeclares.map(it => `    ${it.typeName}: ${it.typeName}Declare,`).join("\n")}
})
`,
})

const scriptTypeDeclareFiles = scriptTypeDeclares.map(it => ({
    fileName: `${scriptTypeDeclarePath}/items/${it.typeName}.ts`,
    content: `export default Object.freeze({
    fileName: '${it.typeName}.d.ts',
    content: \`${it.content.trim()}\`,
})
`,
}))

scriptTypeDeclareFiles.push({
    fileName: `${scriptTypeDeclarePath}/index.ts`,
    content: `${scriptTypeDeclares.map(it => `import ${it.typeName}Declare from "./items/${it.typeName}.ts";`).join("\n")}

export type ScriptTypeMap = {
${scriptTypeDeclares.map(it => `    ${it.typeName}: ${it.typeName}`).join("\n")}
}

export type ScriptTypeName = keyof ScriptTypeMap

export const scriptTypeDeclares = Object.freeze({
${scriptTypeDeclares.map(it => `    ${it.typeName}: ${it.typeName}Declare,`).join("\n")}
})
`,
})

const defaultScriptFiles = defaultScripts.map(it => {
    return {
        fileName: `${defaultScriptPath}/items/${it.name}.ts`,
        content: `import type {ScriptInfo} from "@/modelEditor/script/ScriptsStore.ts";
import {${it.name}} from "@/type/script/default/${it.fileName}";

const scriptInfo: ScriptInfo<"${it.type}"> = {
    id: "${it.name}",
    name: "${it.name}",
    type: "${it.type}",
    enabled: ${it.enabled},
    databaseType: "${it.databaseType}",
    jvmLanguage: "${it.jvmLanguage}",
    script: {
        code: \`${it.content}\`,
        execute: ${it.name}
    }
}

export default scriptInfo
`,
    }
})

defaultScriptFiles.push({
    fileName: `${defaultScriptPath}/index.ts`,
    content: `${defaultScripts.map(it => `import ${it.name} from "@/type/__generated/defaultScript/items/${it.name}.ts";`).join("\n")}

export const defaultScripts = Object.freeze({
${defaultScripts.map(it => `    ${it.name},`).join("\n")}
})
`,
})

const scriptTemplateFiles = scriptTypeDeclares.map(it => ({
    fileName: `${scriptTemplatePath}/items/${it.typeName}.ts`,
    content: `export default \`(
${it.parameters.map(it => `    ${it.name}: ${it.typeStr},`).join("\n")}
): ${it.returnTypeStr} => {
    // TODO implement ${it.typeName}  
}\`
`,
}))

scriptTemplateFiles.push({
    fileName: `${scriptTemplatePath}/index.ts`,
    content: `${scriptTypeDeclares.map(it => `import ${it.typeName}Template from "@/type/__generated/scriptTemplate/items/${it.typeName}.ts";`).join("\n")}

export const scriptTemplates = Object.freeze({
${scriptTypeDeclares.map(it => `    ${it.typeName}: ${it.typeName}Template,`).join("\n")}
})
`,
})

const jsonSchemaFiles = jsonSchemaDeclares.map(it => ({
    fileName: `${jsonSchemaPath}/items/${it.typeName}.ts`,
    content: `import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ${it.typeName}JsonSchema: JSONSchemaType<${it.typeName}> = ${JSON.stringify(it.schema, undefined, 4)} as any as JSONSchemaType<${it.typeName}>

export const validate${it.typeName} = createSchemaValidator<${it.typeName}>(${it.typeName}JsonSchema)

export default {
    uri: "$innerType/${it.typeName}",
    schema: ${it.typeName}JsonSchema,
    validate: validate${it.typeName},
}
`,
}))

jsonSchemaFiles.push({
    fileName: `${jsonSchemaPath}/index.ts`,
    content: `${jsonSchemaDeclares.map(it => `import ${it.typeName}JsonSchema from "./items/${it.typeName}.ts";`).join("\n")}
${contextExtraJsonSchema.map(it => `import ${it.typeName}JsonSchema from "../../context/jsonSchema/${it.typeName}.ts";`).join("\n")}

export const jsonSchemas = Object.freeze({
${jsonSchemaDeclares.map(it => `    ${it.typeName}: ${it.typeName}JsonSchema,`).join("\n")}
${contextExtraJsonSchema.map(it => `    ${it.typeName}: ${it.typeName}JsonSchema,`).join("\n")}
})

export type JsonSchemaKey = keyof typeof jsonSchemas
`,
})

// 写入文件
const cleanDir = (dirPath) => {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, {recursive: true})
    }
    fs.mkdirSync(dirPath, {recursive: true})
}

cleanDir(typeDeclarePath)
cleanDir(scriptTypeDeclarePath)
cleanDir(defaultScriptPath)
cleanDir(scriptTemplatePath)
cleanDir(jsonSchemaPath)

const writeFiles = (files) => {
    for (const file of files) {
        const dirPath = path.dirname(file.fileName)
        ensureDirExists(dirPath)
        fs.writeFileSync(file.fileName, file.content, "utf-8")
    }
}

writeFiles([
    ...typeDeclareFiles,
    ...scriptTypeDeclareFiles,
    ...defaultScriptFiles,
    ...scriptTemplateFiles,
    ...jsonSchemaFiles,
])

console.log("Type Files generated successfully!");