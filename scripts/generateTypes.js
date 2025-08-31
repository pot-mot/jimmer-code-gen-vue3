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

const modelPath = "../src/type/model";
ensureDirExists(modelPath)
const scriptPath = "../src/type/script";
ensureDirExists(scriptPath)

const typeDeclarePath = "../src/type/__generated/typeDeclare";
ensureDirExists(typeDeclarePath)
const scriptTypeDeclarePath = "../src/type/__generated/scriptTypeDeclare";
ensureDirExists(scriptTypeDeclarePath)
const jsonSchemaPath = "../src/type/__generated/jsonSchema";
ensureDirExists(jsonSchemaPath)

const getDeclareTsFiles = (path) => {
    const files = fs.readdirSync(path);
    return files
        .filter(it => it.endsWith(".d.ts"))
        .map(it => ({
            fileName: it,
            content: fs.readFileSync(path + "/" + it, "utf-8").replace("\r\n", "\n"),
        }))
}

const modelTypeFiles = getDeclareTsFiles(modelPath)
const scriptTypeFiles = getDeclareTsFiles(scriptPath)

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
for (const {fileName, content} of scriptTypeFiles) {
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
    }
)


const isObjectType = (type) => {
    const flags = type.getFlags()
    return !!(flags & ts.TypeFlags.Object)
}


const existedTypeSet = new Set()


const typeDeclares = []
for (const {fileName} of modelTypeFiles) {
    const sourceFile = program.getSourceFile(fileName)
    for (const statement of sourceFile.statements) {
        if (
            !ts.isTypeAliasDeclaration(statement) &&
            !ts.isInterfaceDeclaration(statement)
        ) {
            throw new Error(`Script [${fileName}] is not a type alias or interface`)
        }

        const type = typeChecker.getTypeAtLocation(statement)
        const typeName = statement?.symbol?.escapedName
        if (!type || !typeName) {
            console.warn(`[${fileName}] ${statement} is not a valid type alias or interface`)
            continue
        }

        if (existedTypeSet.has(typeName)) {
            throw new Error(`[${fileName}] ${typeName} is already exists`)
        }
        existedTypeSet.add(typeName)

        const content = statement.getFullText(sourceFile)
        const schema = jsonSchemaGenerator.getSchemaForSymbol(typeName)
        typeDeclares.push({type, typeName, content, schema})
    }
}

const scriptTypeDeclares = []
for (const {fileName} of scriptTypeFiles) {
    const sourceFile = program.getSourceFile(fileName)
    for (const statement of sourceFile.statements) {
        if (
            !ts.isTypeAliasDeclaration(statement) &&
            !ts.isInterfaceDeclaration(statement)
        ) {
            throw new Error(`Script [${fileName}] is not a type alias or interface`)
        }

        const type = typeChecker.getTypeAtLocation(statement)
        const typeName = statement?.symbol?.escapedName
        if (!type || !typeName) {
            console.warn(`[${fileName}] ${statement} is not a valid type alias or interface`)
            continue
        }

        if (!isObjectType(type)) {
            throw new Error(`[${fileName}] ${typeName} is not an object type`)
        }

        if (existedTypeSet.has(typeName)) {
            throw new Error(`[${fileName}] ${typeName} is already exists`)
        }
        existedTypeSet.add(typeName)

        const scriptTypeNameProperty = type.getProperty("scriptTypeName")
        if (!scriptTypeNameProperty) {
            throw new Error(`[${fileName}] ${typeName} does not have scriptTypeName property`)
        }
        const scriptTypeNameType = typeChecker.getTypeOfSymbolAtLocation(scriptTypeNameProperty, statement)
        if (!scriptTypeNameType.isStringLiteral()) {
            throw new Error(`[${fileName}] ${typeName} scriptTypeName property is not a string literal`)
        }
        const scriptTypeNamePropertyValue = scriptTypeNameType.value
        if (scriptTypeNamePropertyValue !== typeName) {
            throw new Error(`[${fileName}] ${typeName} scriptTypeName property value is not equal to typeName`)
        }

        const content = statement.getFullText(sourceFile)
        scriptTypeDeclares.push({type, typeName, content})
    }
}


// 转换文件

const typeDeclareFiles = typeDeclares.map(it => ({
    fileName: `${typeDeclarePath}/items/${it.typeName}.ts`,
    content: `export default {
    fileName: '${it.typeName}.d.ts',
    content: \`${it.content.trim()}\`,
}
`,
}))

typeDeclareFiles.push({
    fileName: `${typeDeclarePath}/index.ts`,
    content: `${typeDeclares.map(it => `import ${it.typeName}Declare from "./items/${it.typeName}.ts";`).join("\n")}

export const typeDeclares = Object.freeze({
${typeDeclares.map(it => `    ${it.typeName}: ${it.typeName}Declare,`).join("\n")}
})
`,
})

const scriptTypeDeclareFiles = scriptTypeDeclares.map(it => ({
    fileName: `${scriptTypeDeclarePath}/items/${it.typeName}.ts`,
    content: `export default {
    fileName: '${it.typeName}.d.ts',
    content: \`${it.content.trim()}\`,
}
`,
}))

scriptTypeDeclareFiles.push({
    fileName: `${scriptTypeDeclarePath}/index.ts`,
    content: `${scriptTypeDeclares.map(it => `import ${it.typeName}Declare from "./items/${it.typeName}.ts";`).join("\n")}

export const scriptTypeDeclares = Object.freeze({
${scriptTypeDeclares.map(it => `    ${it.typeName}: ${it.typeName}Declare,`).join("\n")}
})

export type ScriptTypeName = keyof typeof scriptTypeDeclares
`,
})

const jsonSchemaFiles = typeDeclares.map(it => ({
    fileName: `${jsonSchemaPath}/items/${it.typeName}.ts`,
    content: `import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ${it.typeName}JsonSchema: JSONSchemaType<${it.typeName}> = ${JSON.stringify(it.schema, undefined, 4)}

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
    content: `${typeDeclares.map(it => `import ${it.typeName}JsonSchema from "./items/${it.typeName}.ts";`).join("\n")}

export const jsonSchemas = Object.freeze({
${typeDeclares.map(it => `    ${it.typeName}: ${it.typeName}JsonSchema,`).join("\n")}
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
    ...jsonSchemaFiles,
])

console.log("Type Files generated successfully!");