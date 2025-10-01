import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TypeScriptTypeJsonSchema: JSONSchemaType<TypeScriptType> = {
    "type": "object",
    "properties": {
        "fullTypeExpression": {
            "type": "string"
        },
        "extraImports": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "fromPath": {
                        "type": "string"
                    }
                },
                "required": [
                    "fromPath",
                    "name"
                ]
            }
        }
    },
    "required": [
        "extraImports",
        "fullTypeExpression"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<TypeScriptType>

export const validateTypeScriptType = createSchemaValidator<TypeScriptType>(TypeScriptTypeJsonSchema)

export default {
    uri: "$innerType/TypeScriptType",
    schema: TypeScriptTypeJsonSchema,
    validate: validateTypeScriptType,
}
