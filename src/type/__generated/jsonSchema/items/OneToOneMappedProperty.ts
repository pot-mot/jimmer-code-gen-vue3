import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OneToOneMappedPropertyJsonSchema: JSONSchemaType<OneToOneMappedProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "OneToOne_Mapped"
                },
                "typeIsList": {
                    "type": "boolean",
                    "const": false
                },
                "mappedById": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean",
                    "const": true
                }
            },
            "required": [
                "category",
                "mappedById",
                "nullable",
                "typeIsList"
            ]
        },
        {
            "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
        },
        {
            "type": "object",
            "properties": {
                "associationId": {
                    "type": "string"
                },
                "referencedEntityId": {
                    "type": "string"
                },
                "idViewName": {
                    "type": "string"
                },
                "autoSyncIdViewName": {
                    "type": "boolean"
                }
            },
            "required": [
                "associationId",
                "autoSyncIdViewName",
                "idViewName",
                "referencedEntityId"
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
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<OneToOneMappedProperty>

export const validateOneToOneMappedProperty = createSchemaValidator<OneToOneMappedProperty>(OneToOneMappedPropertyJsonSchema)

export default {
    uri: "$innerType/OneToOneMappedProperty",
    schema: OneToOneMappedPropertyJsonSchema,
    validate: validateOneToOneMappedProperty,
}
