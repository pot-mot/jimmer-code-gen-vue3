import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JvmToTsMatchRuleJsonSchema: JSONSchemaType<JvmToTsMatchRule> = {
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
} as any as JSONSchemaType<JvmToTsMatchRule>

export const validateJvmToTsMatchRule = createSchemaValidator<JvmToTsMatchRule>(JvmToTsMatchRuleJsonSchema)

export default {
    uri: "$innerType/JvmToTsMatchRule",
    schema: JvmToTsMatchRuleJsonSchema,
    validate: validateJvmToTsMatchRule,
}
