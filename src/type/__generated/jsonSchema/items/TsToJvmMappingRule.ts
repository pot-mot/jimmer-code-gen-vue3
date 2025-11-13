import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TsToJvmMappingRuleJsonSchema: JSONSchemaType<TsToJvmMappingRule> = {
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
        "jvmSource",
        "matchRegExp",
        "result"
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
} as any as JSONSchemaType<TsToJvmMappingRule>

export const validateTsToJvmMappingRule = createSchemaValidator<TsToJvmMappingRule>(TsToJvmMappingRuleJsonSchema)

export default {
    uri: "$innerType/TsToJvmMappingRule",
    schema: TsToJvmMappingRuleJsonSchema,
    validate: validateTsToJvmMappingRule,
}
