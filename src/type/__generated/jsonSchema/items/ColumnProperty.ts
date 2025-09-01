import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ColumnPropertyJsonSchema: JSONSchemaType<ColumnProperty> = {
    "type": "object",
    "properties": {
        "columnInfo": {
            "$ref": "#/definitions/Omit<Column,\"id\">"
        }
    },
    "required": [
        "columnInfo"
    ],
    "definitions": {
        "Omit<Column,\"id\">": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean"
                },
                "comment": {
                    "type": "string"
                },
                "dataSize": {
                    "type": "integer"
                },
                "numericPrecision": {
                    "type": "integer"
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
                "name",
                "nullable",
                "partOfPrimaryKey",
                "type"
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ColumnProperty>

export const validateColumnProperty = createSchemaValidator<ColumnProperty>(ColumnPropertyJsonSchema)

export default {
    uri: "$innerType/ColumnProperty",
    schema: ColumnPropertyJsonSchema,
    validate: validateColumnProperty,
}
