import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const BackEndToSqlTypeMappingJsonSchema: JSONSchemaType<BackEndToSqlTypeMapping> = {
    "type": "object",
    "properties": {
        "source": {
            "$ref": "#/definitions/BackEndMappingSource"
        },
        "typeRegExp": {
            "type": "string"
        },
        "sqlTypeResult": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string"
                },
                "dataSize": {
                    "type": "number"
                },
                "numericPrecision": {
                    "type": "number"
                },
                "nullable": {
                    "type": "boolean"
                },
                "defaultValue": {
                    "type": "string"
                }
            },
            "required": [
                "nullable",
                "type"
            ]
        }
    },
    "required": [
        "source",
        "sqlTypeResult",
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
} as any as JSONSchemaType<BackEndToSqlTypeMapping>

export const validateBackEndToSqlTypeMapping = createSchemaValidator<BackEndToSqlTypeMapping>(BackEndToSqlTypeMappingJsonSchema)

export default {
    uri: "$innerType/BackEndToSqlTypeMapping",
    schema: BackEndToSqlTypeMappingJsonSchema,
    validate: validateBackEndToSqlTypeMapping,
}
