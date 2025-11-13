import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JvmMatchRuleJsonSchema: JSONSchemaType<JvmMatchRule> = {
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
} as any as JSONSchemaType<JvmMatchRule>

export const validateJvmMatchRule = createSchemaValidator<JvmMatchRule>(JvmMatchRuleJsonSchema)

export default {
    uri: "$innerType/JvmMatchRule",
    schema: JvmMatchRuleJsonSchema,
    validate: validateJvmMatchRule,
}
