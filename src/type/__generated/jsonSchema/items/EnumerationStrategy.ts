import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EnumerationStrategyJsonSchema: JSONSchemaType<EnumerationStrategy> = {
    "enum": [
        "DEFAULT",
        "NAME",
        "ORDINAL"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateEnumerationStrategy = createSchemaValidator<EnumerationStrategy>(EnumerationStrategyJsonSchema)

export default {
    uri: "$innerType/EnumerationStrategy",
    schema: EnumerationStrategyJsonSchema,
    validate: validateEnumerationStrategy,
}
