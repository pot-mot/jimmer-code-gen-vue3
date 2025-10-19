import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JvmToSqlMappingRuleJsonSchema: JSONSchemaType<JvmToSqlMappingRule> = {
    "type": "object",
    "properties": {
        "jvmSource": {
            "$ref": "#/definitions/JvmSource"
        },
        "databaseSource": {
            "$ref": "#/definitions/DatabaseSource"
        },
        "matchRegExp": {
            "type": "string"
        },
        "result": {
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
                "defaultValue": {
                    "type": "string"
                }
            },
            "required": [
                "type"
            ]
        }
    },
    "required": [
        "databaseSource",
        "jvmSource",
        "matchRegExp",
        "result"
    ],
    "definitions": {
        "JvmSource": {
            "enum": [
                "BOTH",
                "JAVA",
                "KOTLIN"
            ],
            "type": "string"
        },
        "DatabaseSource": {
            "enum": [
                "ANY",
                "H2",
                "MYSQL",
                "ORACLE",
                "POSTGRESQL",
                "SQLITE",
                "SQLSERVER"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<JvmToSqlMappingRule>

export const validateJvmToSqlMappingRule = createSchemaValidator<JvmToSqlMappingRule>(JvmToSqlMappingRuleJsonSchema)

export default {
    uri: "$innerType/JvmToSqlMappingRule",
    schema: JvmToSqlMappingRuleJsonSchema,
    validate: validateJvmToSqlMappingRule,
}
