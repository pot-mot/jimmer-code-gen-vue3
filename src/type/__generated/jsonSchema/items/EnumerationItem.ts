import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EnumerationItemJsonSchema: JSONSchemaType<EnumerationItem> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "ordinal": {
            "type": "number"
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
        }
    },
    "required": [
        "comment",
        "extraAnnotations",
        "extraImports",
        "name",
        "ordinal"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateEnumerationItem = createSchemaValidator<EnumerationItem>(EnumerationItemJsonSchema)

export default {
    uri: "$innerType/EnumerationItem",
    schema: EnumerationItemJsonSchema,
    validate: validateEnumerationItem,
}
