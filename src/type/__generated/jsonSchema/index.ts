import MyTypeJsonSchema from "./MyType.ts"

export const jsonSchemas = Object.freeze({
    MyType: MyTypeJsonSchema
})

export type JsonSchemaKey = keyof typeof jsonSchemas
