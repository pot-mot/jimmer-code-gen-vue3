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

const typeDeclarePath = "src/type/__generated/typeDeclare";
ensureDirExists(typeDeclarePath)
const scriptTypeDeclarePath = "src/type/__generated/scriptTypeDeclare";
ensureDirExists(scriptTypeDeclarePath)
const jsonSchemaPath = "src/type/__generated/jsonSchema";
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
const contextTypeFiles = getDeclareTsFiles(contextPath)
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
for (const {fileName, content} of contextTypeFiles) {
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

typeDeclares.sort((a, b) => a.typeName.localeCompare(b.typeName))
jsonSchemaDeclares.sort((a, b) => a.typeName.localeCompare(b.typeName))

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
        existedTypeSet.add(typeName)

        const content = statement.getFullText(sourceFile)
        scriptTypeDeclares.push({type, typeName, content})
    }
}

scriptTypeDeclares.sort((a, b) => a.typeName.localeCompare(b.typeName))


// 转换文件

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

export const jsonSchemas = Object.freeze({
${jsonSchemaDeclares.map(it => `    ${it.typeName}: ${it.typeName}JsonSchema,`).join("\n")}
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