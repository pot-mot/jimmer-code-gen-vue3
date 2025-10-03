import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const IndexJsonSchema: JSONSchemaType<Index> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "columnNames": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "unique": {
            "type": "boolean"
        },
        "wherePredicates": {
            "type": "string"
        }
    },
    "required": [
        "columnNames",
        "name",
        "unique"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Index>

export const validateIndex = createSchemaValidator<Index>(IndexJsonSchema)

export default {
    uri: "$innerType/Index",
    schema: IndexJsonSchema,
    validate: validateIndex,
}
