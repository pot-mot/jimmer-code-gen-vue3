import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OneToOneTargetPropertyJsonSchema: JSONSchemaType<OneToOneTargetProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "OneToOne_Target"
                },
                "associationName": {
                    "type": "string"
                },
                "idView": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "name"
                    ]
                },
                "mappedBy": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean",
                    "const": true
                }
            },
            "required": [
                "associationName",
                "category",
                "idView",
                "mappedBy",
                "nullable"
            ]
        },
        {
            "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
        },
        {
            "type": "object",
            "properties": {
                "entityName": {
                    "type": "string"
                }
            },
            "required": [
                "entityName"
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
                "name"
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateOneToOneTargetProperty = createSchemaValidator<OneToOneTargetProperty>(OneToOneTargetPropertyJsonSchema)

export default {
    uri: "$innerType/OneToOneTargetProperty",
    schema: OneToOneTargetPropertyJsonSchema,
    validate: validateOneToOneTargetProperty,
}
