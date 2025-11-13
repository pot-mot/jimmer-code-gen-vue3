import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TsToSqlMatchRuleJsonSchema: JSONSchemaType<TsToSqlMatchRule> = {
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
} as any as JSONSchemaType<TsToSqlMatchRule>

export const validateTsToSqlMatchRule = createSchemaValidator<TsToSqlMatchRule>(TsToSqlMatchRuleJsonSchema)

export default {
    uri: "$innerType/TsToSqlMatchRule",
    schema: TsToSqlMatchRuleJsonSchema,
    validate: validateTsToSqlMatchRule,
}
