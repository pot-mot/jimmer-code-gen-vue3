import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OptionalKeyPropertyJsonSchema: JSONSchemaType<OptionalKeyProperty> = {
    "anyOf": [
        {
            "type": "object",
            "properties": {
                "key": {
                    "type": "boolean",
                    "const": true
                },
                "keyGroups": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "key",
                "keyGroups"
            ]
        },
        {
            "type": "object",
            "properties": {
                "key": {
                    "type": "boolean",
                    "const": false
                }
            },
            "required": [
                "key"
            ]
        }
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateOptionalKeyProperty = createSchemaValidator<OptionalKeyProperty>(OptionalKeyPropertyJsonSchema)

export default {
    uri: "$innerType/OptionalKeyProperty",
    schema: OptionalKeyPropertyJsonSchema,
    validate: validateOptionalKeyProperty,
}
