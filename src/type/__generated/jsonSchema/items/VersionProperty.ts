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
                "columnName": {
                    "type": "string"
                }
            },
            "required": [
                "columnName"
            ]
        }
    ],
    "definitions": {
        "Omit<BaseProperty,\"nullable\">": {
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
                }
            },
            "required": [
                "comment",
                "extraAnnotations",
                "extraImports",
                "id",
                "name"
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
