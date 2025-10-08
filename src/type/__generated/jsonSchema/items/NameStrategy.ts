import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const NameStrategyJsonSchema: JSONSchemaType<NameStrategy> = {
    "enum": [
        "LOWER_CAMEL",
        "LOWER_KEBAB",
        "LOWER_SNAKE",
        "UPPER_CAMEL",
        "UPPER_KEBAB",
        "UPPER_SNAKE"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<NameStrategy>

export const validateNameStrategy = createSchemaValidator<NameStrategy>(NameStrategyJsonSchema)

export default {
    uri: "$innerType/NameStrategy",
    schema: NameStrategyJsonSchema,
    validate: validateNameStrategy,
}
