import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ColumnJsonSchema: JSONSchemaType<Column> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "comment": {
            "type": "string"
        },
        "type": {
            "type": "string"
        },
        "isNullable": {
            "type": "boolean"
        },
        "defaultValue": {
            "type": "string"
        },
        "partOfPrimaryKey": {
            "type": "boolean"
        }
    },
    "required": [
        "comment",
        "defaultValue",
        "isNullable",
        "name",
        "partOfPrimaryKey",
        "type"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateColumn = createSchemaValidator<Column>(ColumnJsonSchema)

export default {
    uri: "$innerType/Column",
    schema: ColumnJsonSchema,
    validate: validateColumn,
}
