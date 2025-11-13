import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TsToSqlMappingRuleJsonSchema: JSONSchemaType<TsToSqlMappingRule> = {
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
} as any as JSONSchemaType<TsToSqlMappingRule>

export const validateTsToSqlMappingRule = createSchemaValidator<TsToSqlMappingRule>(TsToSqlMappingRuleJsonSchema)

export default {
    uri: "$innerType/TsToSqlMappingRule",
    schema: TsToSqlMappingRuleJsonSchema,
    validate: validateTsToSqlMappingRule,
}
