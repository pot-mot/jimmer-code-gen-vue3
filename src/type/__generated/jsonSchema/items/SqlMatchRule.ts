import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const SqlMatchRuleJsonSchema: JSONSchemaType<SqlMatchRule> = {
    "type": "object",
    "properties": {
        "databaseSource": {
            "$ref": "#/definitions/DatabaseSource"
        },
        "matchRegExp": {
            "type": "string"
        }
    },
    "required": [
        "databaseSource",
        "matchRegExp"
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
} as any as JSONSchemaType<SqlMatchRule>

export const validateSqlMatchRule = createSchemaValidator<SqlMatchRule>(SqlMatchRuleJsonSchema)

export default {
    uri: "$innerType/SqlMatchRule",
    schema: SqlMatchRuleJsonSchema,
    validate: validateSqlMatchRule,
}
