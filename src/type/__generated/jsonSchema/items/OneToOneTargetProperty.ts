import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OneToOneTargetPropertyJsonSchema: JSONSchemaType<OneToOneTargetProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "ASSOCIATION_OneToOne_Target"
                },
                "associationId": {
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
                "associationId",
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
                "entityId": {
                    "type": "string"
                }
            },
            "required": [
                "entityId"
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
} as any as JSONSchemaType<OneToOneTargetProperty>

export const validateOneToOneTargetProperty = createSchemaValidator<OneToOneTargetProperty>(OneToOneTargetPropertyJsonSchema)

export default {
    uri: "$innerType/OneToOneTargetProperty",
    schema: OneToOneTargetPropertyJsonSchema,
    validate: validateOneToOneTargetProperty,
}
