import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const SqlToJvmMappingRuleJsonSchema: JSONSchemaType<SqlToJvmMappingRule> = {
    "type": "object",
    "properties": {
        "source": {
            "$ref": "#/definitions/JvmTypeSource"
        },
        "matchRegExp": {
            "type": "string"
        },
        "result": {
            "type": "object",
            "properties": {
                "fullTypeExpression": {
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
                "fullTypeExpression",
                "serialized"
            ]
        }
    },
    "required": [
        "matchRegExp",
        "result",
        "source"
    ],
    "definitions": {
        "JvmTypeSource": {
            "enum": [
                "BOTH",
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
