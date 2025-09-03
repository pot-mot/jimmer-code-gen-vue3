import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ColumnPropertyJsonSchema: JSONSchemaType<ColumnProperty> = {
    "anyOf": [
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                        }
                    },
                    "required": [
                        "columnInfo"
                    ]
                },
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
                }
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
                        }
                    },
                    "required": [
                        "columnInfo"
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
            ]
        }
    ],
    "definitions": {
        "Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">": {
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
