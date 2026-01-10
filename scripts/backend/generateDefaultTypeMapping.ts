import {initTsTypes} from "../../src/modelEditor/typeMapping/default/TsTypes";
import {initSqlTypes} from "../../src/modelEditor/typeMapping/default/SqlTypes";
import {initJvmTypes} from "../../src/modelEditor/typeMapping/default/JvmTypes";
import {initCrossTypes} from "../../src/modelEditor/typeMapping/default/CrossTypes";
import {FileItem, writeFiles} from "../utils/fileTools";
import {ensureDirExists} from "../utils/checkFileExisted";

const defaultScriptPath = "../jimmer-code-gen-kotlin-refactor/src/main/kotlin/top/potmot/init";
ensureDirExists(defaultScriptPath)

const files: FileItem[] = []

const fileImportSet = new Set<string>([
    "top.potmot.entity.database.DatabaseTypeOrAny",
    "top.potmot.entity.model.JvmLanguageOrAny",
    "top.potmot.entity.typeMapping.dto.CrossTypeInput",
    "top.potmot.entity.typeMapping.dto.JvmTypeInput",
    "top.potmot.entity.typeMapping.dto.SqlTypeInput",
    "top.potmot.entity.typeMapping.dto.TsTypeInput",
    "top.potmot.entity.typeMapping.dto.crossTypeWithOrderKey",
    "top.potmot.entity.typeMapping.dto.jvmTypeWithOrderKey",
    "top.potmot.entity.typeMapping.dto.sqlTypeWithOrderKey",
    "top.potmot.entity.typeMapping.dto.tsTypeWithOrderKey",
    "java.util.UUID",
])

const arrayToListExp = <T>(
    array: T[],
    toString: (it: T) => string,
    indentTab: number
) => {
    if (array.length === 0) {
        return "emptyList()"
    } else {
        const tab = '    '.repeat(indentTab)
        const innerTab = '    '.repeat(indentTab + 1)
        return `listOf(
${innerTab}${array.map(it => toString(it)).join(",\n").split("\n").join(`\n${innerTab}`)}
${tab})`
    }
}

const escapeRegExp = (str: string) => {
    return str.replace(/\\/g, '\\\\');
}

const initJvmTypesStr = initJvmTypes.map(it => {
    return `    JvmTypeInput(
        id = UUID.fromString("${it.id}"),
        jvmSource = JvmLanguageOrAny.${it.jvmSource},
        typeExpression = "${it.typeExpression}",
        serialized = ${it.serialized},
        extraImports = ${arrayToListExp(it.extraImports, it => `"${it}"`, 2)},
        extraAnnotations = ${arrayToListExp(it.extraAnnotations, it => `"${it}"`, 2)},
        sqlMatchRules = ${arrayToListExp(it.sqlMatchRules, rule => `JvmTypeInput.TargetOf_sqlMatchRules(
    id = UUID.fromString("${rule.id}"),
    databaseSource = DatabaseTypeOrAny.${rule.databaseSource},
    matchRegExp = "${escapeRegExp(rule.matchRegExp)}",${
rule.nullableLimit !== undefined ? `\n    nullableLimit = ${rule.nullableLimit},` : ''}
)`, 2)},
        tsMatchRules = ${arrayToListExp(it.tsMatchRules, rule => `JvmTypeInput.TargetOf_tsMatchRules(
    id = UUID.fromString("${rule.id}"),
    matchRegExp = "${escapeRegExp(rule.matchRegExp)}",
)`, 2)},
    ),`
});

const initSqlTypesStr = initSqlTypes.map(it => {
    return `    SqlTypeInput(
        id = UUID.fromString("${it.id}"),
        databaseSource = DatabaseTypeOrAny.${it.databaseSource},
        type = "${it.type}",
        jvmMatchRules = ${arrayToListExp(it.jvmMatchRules, rule => `SqlTypeInput.TargetOf_jvmMatchRules(
    id = UUID.fromString("${rule.id}"),
    jvmSource = JvmLanguageOrAny.${rule.jvmSource},
    matchRegExp = "${escapeRegExp(rule.matchRegExp)}",
)`, 2)},
        tsMatchRules = ${arrayToListExp(it.tsMatchRules, rule => `SqlTypeInput.TargetOf_tsMatchRules(
    id = UUID.fromString("${rule.id}"),
    matchRegExp = "${escapeRegExp(rule.matchRegExp)}",
)`, 2)},
    ),`
});

const initTsTypesStr = initTsTypes.map(it => {
    if (it.extraImports.length > 0) {
        fileImportSet.add("top.potmot.entity.typeMapping.TsImport")
    }
    return `    TsTypeInput(
        id = UUID.fromString("${it.id}"),
        typeExpression = "${it.typeExpression}",
        extraImports = ${arrayToListExp(it.extraImports, importItem => `            TsImport(
    name = "${importItem.name}",
    fromPath = "${importItem.fromPath}",
    typeOnly = ${importItem.typeOnly}
)`, 2)},
        jvmMatchRules = ${arrayToListExp(it.jvmMatchRules, rule => `            TsTypeInput.TargetOf_jvmMatchRules(
    id = UUID.fromString("${rule.id}"),
    jvmSource = JvmLanguageOrAny.${rule.jvmSource},
    matchRegExp = "${escapeRegExp(rule.matchRegExp)}"
)`, 2)},
        sqlMatchRules = ${arrayToListExp(it.sqlMatchRules, rule => `            TsTypeInput.TargetOf_sqlMatchRules(
    id = UUID.fromString("${rule.id}"),
    databaseSource = DatabaseTypeOrAny.${rule.databaseSource},
    matchRegExp = "${escapeRegExp(rule.matchRegExp)}"
)`, 2)},
    ),`
});

const initCrossTypesStr = initCrossTypes.map(it => {
    return `    CrossTypeInput(
        id = UUID.fromString("${it.id}"),
        jvmTypeId = UUID.fromString("${it.jvmTypeId}"),
        sqlTypeId = UUID.fromString("${it.sqlTypeId}"),
        tsTypeId = UUID.fromString("${it.tsTypeId}"),${
        it.nullable !== undefined ? `\n        nullable = ${it.nullable},` : ''}
    ),`
})

files.push({
    fileName: `${defaultScriptPath}/TypeMapping.kt`,
    content: `package top.potmot.init

${Array.from(fileImportSet).sort().map(it => `import ${it}`).join("\n")}

val initJvmTypes = listOf(
${initJvmTypesStr.join("\n")}
).jvmTypeWithOrderKey()

val initSqlTypes = listOf(
${initSqlTypesStr.join("\n")}
).sqlTypeWithOrderKey()

val initTsTypes = listOf(
${initTsTypesStr.join("\n")}
).tsTypeWithOrderKey()

val initCrossTypes = listOf(
${initCrossTypesStr.join("\n")}
).crossTypeWithOrderKey()
`
})

writeFiles(files)
