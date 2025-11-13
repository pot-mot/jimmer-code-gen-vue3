import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const SqlToTsMappingRuleJsonSchema: JSONSchemaType<SqlToTsMappingRule> = {
    "type": "object",
    "properties": {
        "databaseSource": {
            "$ref": "#/definitions/DatabaseSource"
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
                "typeExpression"
            ]
        }
    },
    "required": [
        "databaseSource",
        "matchRegExp",
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
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<SqlToTsMappingRule>

export const validateSqlToTsMappingRule = createSchemaValidator<SqlToTsMappingRule>(SqlToTsMappingRuleJsonSchema)

export default {
    uri: "$innerType/SqlToTsMappingRule",
    schema: SqlToTsMappingRuleJsonSchema,
    validate: validateSqlToTsMappingRule,
}
