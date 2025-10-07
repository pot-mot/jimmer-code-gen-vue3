import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OneToOneMappedAbstractPropertyJsonSchema: JSONSchemaType<OneToOneMappedAbstractProperty> = {
    "allOf": [
        {
            "$ref": "#/definitions/Omit<OneToOneMappedProperty,\"category\"|\"referencedEntityId\">"
        },
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "OneToOne_Mapped_Abstract"
                },
                "referencedAbstractEntityId": {
                    "type": "string"
                }
            },
            "required": [
                "category",
                "referencedAbstractEntityId"
            ]
        }
    ],
    "definitions": {
        "Omit<OneToOneMappedProperty,\"category\"|\"referencedEntityId\">": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean",
                    "const": true
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
                "typeIsList": {
                    "type": "boolean",
                    "const": false
                },
                "mappedById": {
                    "type": "string"
                },
                "associationId": {
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
                "comment",
                "extraAnnotations",
                "extraImports",
                "id",
                "idViewName",
                "mappedById",
                "name",
                "nullable",
                "typeIsList"
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<OneToOneMappedAbstractProperty>

export const validateOneToOneMappedAbstractProperty = createSchemaValidator<OneToOneMappedAbstractProperty>(OneToOneMappedAbstractPropertyJsonSchema)

export default {
    uri: "$innerType/OneToOneMappedAbstractProperty",
    schema: OneToOneMappedAbstractPropertyJsonSchema,
    validate: validateOneToOneMappedAbstractProperty,
}
