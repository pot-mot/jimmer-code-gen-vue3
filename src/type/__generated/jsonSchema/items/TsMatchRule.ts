import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TsMatchRuleJsonSchema: JSONSchemaType<TsMatchRule> = {
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
} as any as JSONSchemaType<TsMatchRule>

export const validateTsMatchRule = createSchemaValidator<TsMatchRule>(TsMatchRuleJsonSchema)

export default {
    uri: "$innerType/TsMatchRule",
    schema: TsMatchRuleJsonSchema,
    validate: validateTsMatchRule,
}
