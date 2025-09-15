import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const SqlToBackEndTypeMappingJsonSchema: JSONSchemaType<SqlToBackEndTypeMapping> = {
    "type": "object",
    "properties": {
        "source": {
            "$ref": "#/definitions/BackEndMappingSource"
        },
        "typeRegExp": {
            "type": "string"
        },
        "javaTypeResult": {
            "type": "object",
            "properties": {
                "rawType": {
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
                "rawType"
            ]
        }
    },
    "required": [
        "javaTypeResult",
        "source",
        "typeRegExp"
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
