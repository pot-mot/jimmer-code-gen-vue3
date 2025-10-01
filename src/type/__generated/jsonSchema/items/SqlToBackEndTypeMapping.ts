import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const SqlToBackEndTypeMappingJsonSchema: JSONSchemaType<SqlToBackEndTypeMapping> = {
    "type": "object",
    "properties": {
        "source": {
            "$ref": "#/definitions/BackEndMappingSource"
        },
        "matchRegExp": {
            "type": "string"
        },
        "result": {
            "type": "object",
            "properties": {
                "fullTypeExpression": {
                    "type": "string"
                },
                "extraImports": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "extraImports",
                "fullTypeExpression"
            ]
        }
    },
    "required": [
        "matchRegExp",
        "result",
        "source"
    ],
    "definitions": {
        "BackEndMappingSource": {
            "enum": [
                "BOTH",
                "JAVA",
                "KOTLIN"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<SqlToBackEndTypeMapping>

export const validateSqlToBackEndTypeMapping = createSchemaValidator<SqlToBackEndTypeMapping>(SqlToBackEndTypeMappingJsonSchema)

export default {
    uri: "$innerType/SqlToBackEndTypeMapping",
    schema: SqlToBackEndTypeMappingJsonSchema,
    validate: validateSqlToBackEndTypeMapping,
}
