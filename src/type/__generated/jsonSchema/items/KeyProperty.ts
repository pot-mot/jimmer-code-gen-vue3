import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const KeyPropertyJsonSchema: JSONSchemaType<KeyProperty> = {
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
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<KeyProperty>

export const validateKeyProperty = createSchemaValidator<KeyProperty>(KeyPropertyJsonSchema)

export default {
    uri: "$innerType/KeyProperty",
    schema: KeyPropertyJsonSchema,
    validate: validateKeyProperty,
}
