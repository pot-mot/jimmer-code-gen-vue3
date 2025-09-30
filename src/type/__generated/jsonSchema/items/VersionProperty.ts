import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const VersionPropertyJsonSchema: JSONSchemaType<VersionProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "VERSION"
                },
                "nullable": {
                    "type": "boolean",
                    "const": false
                }
            },
            "required": [
                "category",
                "nullable"
            ]
        },
        {
            "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
        },
        {
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
            ]
        }
    ],
    "definitions": {
        "Omit<BaseProperty,\"nullable\">": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "id": {
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
                }
            },
            "required": [
                "comment",
                "extraAnnotations",
                "extraImports",
                "id",
                "name"
            ]
        },
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
} as any as JSONSchemaType<VersionProperty>

export const validateVersionProperty = createSchemaValidator<VersionProperty>(VersionPropertyJsonSchema)

export default {
    uri: "$innerType/VersionProperty",
    schema: VersionPropertyJsonSchema,
    validate: validateVersionProperty,
}
