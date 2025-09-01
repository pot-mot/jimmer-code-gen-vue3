import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const BasePropertyJsonSchema: JSONSchemaType<BaseProperty> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "comment": {
            "type": "string"
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
        },
        "nullable": {
            "type": "boolean"
        }
    },
    "required": [
        "comment",
        "extraAnnotations",
        "extraImports",
        "id",
        "name",
        "nullable"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<BaseProperty>

export const validateBaseProperty = createSchemaValidator<BaseProperty>(BasePropertyJsonSchema)

export default {
    uri: "$innerType/BaseProperty",
    schema: BasePropertyJsonSchema,
    validate: validateBaseProperty,
}
