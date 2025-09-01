import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ColumnJsonSchema: JSONSchemaType<Column> = {
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
        "type": {
            "type": "string"
        },
        "dataSize": {
            "type": "integer"
        },
        "numericPrecision": {
            "type": "integer"
        },
        "nullable": {
            "type": "boolean"
        },
        "defaultValue": {
            "type": "string"
        },
        "partOfPrimaryKey": {
            "type": "boolean"
        },
        "autoIncrement": {
            "type": "boolean"
        },
        "otherConstraints": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "required": [
        "comment",
        "defaultValue",
        "id",
        "name",
        "nullable",
        "partOfPrimaryKey",
        "type"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Column>

export const validateColumn = createSchemaValidator<Column>(ColumnJsonSchema)

export default {
    uri: "$innerType/Column",
    schema: ColumnJsonSchema,
    validate: validateColumn,
}
