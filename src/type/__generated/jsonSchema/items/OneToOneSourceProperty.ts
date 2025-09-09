import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OneToOneSourcePropertyJsonSchema: JSONSchemaType<OneToOneSourceProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "ASSOCIATION_OneToOne_Source"
                },
                "onDissociateAction": {
                    "$ref": "#/definitions/OnDissociationAction"
                }
            },
            "required": [
                "category",
                "onDissociateAction"
            ]
        },
        {
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
                },
                "nullable": {
                    "type": "boolean"
                }
            },
            "required": [
                "comment",
                "extraAnnotations",
                "extraImports",
                "id",
                "name",
                "nullable"
            ]
        },
        {
            "type": "object",
            "properties": {
                "associationId": {
                    "type": "string"
                },
                "referenceEntityId": {
                    "type": "string"
                },
                "idViewName": {
                    "type": "string"
                }
            },
            "required": [
                "associationId",
                "idViewName",
                "referenceEntityId"
            ]
        }
    ],
    "definitions": {
        "OnDissociationAction": {
            "enum": [
                "CHECK",
                "DELETE",
                "LAX",
                "NONE",
                "SET_NULL"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<OneToOneSourceProperty>

export const validateOneToOneSourceProperty = createSchemaValidator<OneToOneSourceProperty>(OneToOneSourcePropertyJsonSchema)

export default {
    uri: "$innerType/OneToOneSourceProperty",
    schema: OneToOneSourcePropertyJsonSchema,
    validate: validateOneToOneSourceProperty,
}
