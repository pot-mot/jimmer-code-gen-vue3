import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JvmToSqlMatchRuleJsonSchema: JSONSchemaType<JvmToSqlMatchRule> = {
    "type": "object",
    "properties": {
        "jvmSource": {
            "$ref": "#/definitions/JvmSource"
        },
        "matchRegExp": {
            "type": "string"
        }
    },
    "required": [
        "jvmSource",
        "matchRegExp"
    ],
    "definitions": {
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
} as any as JSONSchemaType<JvmToSqlMatchRule>

export const validateJvmToSqlMatchRule = createSchemaValidator<JvmToSqlMatchRule>(JvmToSqlMatchRuleJsonSchema)

export default {
    uri: "$innerType/JvmToSqlMatchRule",
    schema: JvmToSqlMatchRuleJsonSchema,
    validate: validateJvmToSqlMatchRule,
}
