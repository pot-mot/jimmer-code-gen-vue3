import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const SqlToJvmMappingRuleJsonSchema: JSONSchemaType<SqlToJvmMappingRule> = {
    "type": "object",
    "properties": {
        "databaseSource": {
            "$ref": "#/definitions/DatabaseSource"
        },
        "jvmSource": {
            "$ref": "#/definitions/JvmSource"
        },
        "nullableLimit": {
            "type": "boolean"
        },
        "matchRegExp": {
            "type": "string"
        },
        "result": {
            "type": "object",
            "properties": {
                "typeExpression": {
                    "type": "string"
                },
                "serialized": {
                    "type": "boolean"
                },
                "extraImports": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "extraAnnotations": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "extraAnnotations",
                "extraImports",
                "serialized",
                "typeExpression"
            ]
        }
    },
    "required": [
        "databaseSource",
        "jvmSource",
        "matchRegExp",
        "nullableLimit",
        "result"
    ],
    "definitions": {
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
        },
        "JvmSource": {
            "enum": [
                "ANY",
                "JAVA",
                "KOTLIN"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<SqlToJvmMappingRule>

export const validateSqlToJvmMappingRule = createSchemaValidator<SqlToJvmMappingRule>(SqlToJvmMappingRuleJsonSchema)

export default {
    uri: "$innerType/SqlToJvmMappingRule",
    schema: SqlToJvmMappingRuleJsonSchema,
    validate: validateSqlToJvmMappingRule,
}
