import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JvmToTsMappingRuleJsonSchema: JSONSchemaType<JvmToTsMappingRule> = {
    "type": "object",
    "properties": {
        "jvmSource": {
            "$ref": "#/definitions/JvmSource"
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
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<JvmToTsMappingRule>

export const validateJvmToTsMappingRule = createSchemaValidator<JvmToTsMappingRule>(JvmToTsMappingRuleJsonSchema)

export default {
    uri: "$innerType/JvmToTsMappingRule",
    schema: JvmToTsMappingRuleJsonSchema,
    validate: validateJvmToTsMappingRule,
}
