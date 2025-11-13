import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const SqlToTsMatchRuleJsonSchema: JSONSchemaType<SqlToTsMatchRule> = {
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
} as any as JSONSchemaType<SqlToTsMatchRule>

export const validateSqlToTsMatchRule = createSchemaValidator<SqlToTsMatchRule>(SqlToTsMatchRuleJsonSchema)

export default {
    uri: "$innerType/SqlToTsMatchRule",
    schema: SqlToTsMatchRuleJsonSchema,
    validate: validateSqlToTsMatchRule,
}
