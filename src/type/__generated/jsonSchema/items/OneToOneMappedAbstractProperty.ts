import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OneToOneMappedAbstractPropertyJsonSchema: JSONSchemaType<OneToOneMappedAbstractProperty> = {
    "allOf": [
        {
            "$ref": "#/definitions/Omit<OneToOneMappedProperty,\"name\"|\"comment\"|\"category\"|\"referencedEntityId\"|\"idViewName\"|\"useNameTemplate\"|\"useCommentTemplate\"|\"useIdViewNameTemplate\">"
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
        "Omit<OneToOneMappedProperty,\"name\"|\"comment\"|\"category\"|\"referencedEntityId\"|\"idViewName\"|\"useNameTemplate\"|\"useCommentTemplate\"|\"useIdViewNameTemplate\">": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean",
                    "const": true
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
                "nameTemplate": {
                    "type": "string"
                },
                "commentTemplate": {
                    "type": "string"
                },
                "associationId": {
                    "type": "string"
                },
                "idViewNameTemplate": {
                    "type": "string"
                }
            },
            "required": [
                "associationId",
                "commentTemplate",
                "extraAnnotations",
                "extraImports",
                "id",
                "idViewNameTemplate",
                "mappedById",
                "nameTemplate",
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
