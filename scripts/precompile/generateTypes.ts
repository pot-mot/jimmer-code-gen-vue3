import ts from "typescript";
import * as tjs from "typescript-json-schema";
import {ensureDirExists} from "../utils/checkFileExisted";
import {cleanDir, getTsFiles, writeFiles} from "../utils/fileTools";
import {buildProjectTsProgram, modelPath} from "../utils/buildProjectTsProgram";
import {getTypeInfo, hasTypeParameters, isFunctionType} from "../utils/typeTools";

const typeDeclarePath = "src/type/__generated/typeDeclare";
ensureDirExists(typeDeclarePath)
const jsonSchemaPath = "src/type/__generated/jsonSchema";
ensureDirExists(jsonSchemaPath)
const contextJsonSchemaPath = "src/type/context/jsonSchema";
ensureDirExists(contextJsonSchemaPath)
const scriptTypeDeclarePath = "src/type/__generated/scriptTypeDeclare";
ensureDirExists(scriptTypeDeclarePath)
const scriptTemplatePath = "src/type/__generated/scriptTemplate";
ensureDirExists(scriptTemplatePath)

const {
    program,
    modelTypeFiles,
    contextTypeFiles,
    scriptTypeFiles,
} = buildProjectTsProgram()
const typeChecker = program.getTypeChecker()

const contextJsonSchemaFiles = getTsFiles(contextJsonSchemaPath)

const jsonSchemaProgram = tjs.getProgramFromFiles(
    modelTypeFiles.map(it => `${modelPath}/${it.fileName}`),
    {
        strictNullChecks: true,
    }
)

const jsonSchemaGenerator = tjs.buildGenerator(
    jsonSchemaProgram,
    {
        required: true,
        strictNullChecks: true,
    }
)

const existedTypeSet = new Set()

// 类型
type TypeDeclareItem = {
    type: ts.Type,
    typeName: string,
    content: string,
    hasGenericType: boolean
}
const typeDeclares: TypeDeclareItem[] = []
type JsonSchemaItem = {
    typeName: string,
    schema: tjs.Definition
}
const jsonSchemaDeclares: JsonSchemaItem[] = []

for (const {fileName} of modelTypeFiles) {
    const sourceFile = program.getSourceFile(fileName)
    for (const statement of sourceFile.statements) {
        const {declaration, type, typeName} = getTypeInfo(statement, typeChecker, fileName)

        if (existedTypeSet.has(typeName)) {
            throw new Error(`[${fileName}] ${typeName} is already exists`)
        }

        const hasGenericType = hasTypeParameters(declaration)

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
        const {declaration, type, typeName} = getTypeInfo(statement, typeChecker, fileName)

        if (existedTypeSet.has(typeName)) {
            throw new Error(`[${fileName}] ${typeName} is already exists`)
        }

        const hasGenericType = hasTypeParameters(declaration)

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
type ScriptTypeDeclareItem = {
    type: ts.Type,
    typeName: string,
    content: string,
    parameters: {
        name: string,
        type: ts.Type,
        typeStr: string
    }[],
    returnType: ts.Type,
    returnTypeStr: string
}
const scriptTypeDeclares: ScriptTypeDeclareItem[] = []

for (const {fileName} of scriptTypeFiles) {
    const sourceFile = program.getSourceFile(fileName)
    for (const statement of sourceFile.statements) {
        const {declaration, type, typeName} = getTypeInfo(statement, typeChecker, fileName)

        if (!isFunctionType(type)) {
            throw new Error(`[${fileName}] ${typeName} is not a function type`);
        }

        if (hasTypeParameters(declaration)) {
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
cleanDir(typeDeclarePath)
cleanDir(scriptTypeDeclarePath)
cleanDir(scriptTemplatePath)
cleanDir(jsonSchemaPath)

writeFiles([
    ...typeDeclareFiles,
    ...scriptTypeDeclareFiles,
    ...scriptTemplateFiles,
    ...jsonSchemaFiles,
])

console.log("Type Files generated successfully!");