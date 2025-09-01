import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OptionalOrderPropertyJsonSchema: JSONSchemaType<OptionalOrderProperty> = {
    "anyOf": [
        {
            "type": "object",
            "properties": {
                "orderedProperty": {
                    "type": "boolean",
                    "const": false
                }
            },
            "required": [
                "orderedProperty"
            ]
        },
        {
            "type": "object",
            "properties": {
                "orderedProperty": {
                    "type": "boolean",
                    "const": true
                },
                "orderDirection": {
                    "enum": [
                        "ASC",
                        "DESC"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "orderDirection",
                "orderedProperty"
            ]
        }
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<OptionalOrderProperty>

export const validateOptionalOrderProperty = createSchemaValidator<OptionalOrderProperty>(OptionalOrderPropertyJsonSchema)

export default {
    uri: "$innerType/OptionalOrderProperty",
    schema: OptionalOrderPropertyJsonSchema,
    validate: validateOptionalOrderProperty,
}
