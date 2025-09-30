import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ColumnPropertyJsonSchema: JSONSchemaType<ColumnProperty> = {
    "type": "object",
    "properties": {
        "columnInfo": {
            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
        },
        "defaultOrderDirection": {
            "enum": [
                "ASC",
                "DESC"
            ],
            "type": "string"
        }
    },
    "required": [
        "columnInfo"
    ],
    "definitions": {
        "Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean"
                },
                "comment": {
                    "type": "string"
                },
                "dataSize": {
                    "type": "number"
                },
                "numericPrecision": {
                    "type": "number"
                },
                "defaultValue": {
                    "type": "string"
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
                "name",
                "nullable",
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
