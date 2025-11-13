import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TsToJvmMatchRuleJsonSchema: JSONSchemaType<TsToJvmMatchRule> = {
    "type": "object",
    "properties": {
        "matchRegExp": {
            "type": "string"
        }
    },
    "required": [
        "matchRegExp"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<TsToJvmMatchRule>

export const validateTsToJvmMatchRule = createSchemaValidator<TsToJvmMatchRule>(TsToJvmMatchRuleJsonSchema)

export default {
    uri: "$innerType/TsToJvmMatchRule",
    schema: TsToJvmMatchRuleJsonSchema,
    validate: validateTsToJvmMatchRule,
}
