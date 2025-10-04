import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OneToOneAbstractAssociationIdOnlyJsonSchema: JSONSchemaType<OneToOneAbstractAssociationIdOnly> = {
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
        "type": {
            "type": "string",
            "const": "OneToOne_Abstract"
        },
        "sourceAbstractEntityId": {
            "type": "string"
        },
        "referencedEntityId": {
            "type": "string"
        },
        "sourcePropertyId": {
            "type": "string"
        },
        "mappedProperty": {
            "$ref": "#/definitions/OneToOneMappedAbstractProperty"
        },
        "foreignKeyType": {
            "$ref": "#/definitions/ForeignKeyType"
        }
    },
    "required": [
        "comment",
        "foreignKeyType",
        "id",
        "mappedProperty",
        "name",
        "referencedEntityId",
        "sourceAbstractEntityId",
        "sourcePropertyId",
        "type"
    ],
    "definitions": {
        "OneToOneMappedAbstractProperty": {
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
            ]
        },
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
                "mappedById": {
                    "type": "string"
                },
                "associationId": {
                    "type": "string"
                },
                "idViewName": {
                    "type": "string"
                }
            },
            "required": [
                "associationId",
                "comment",
                "extraAnnotations",
                "extraImports",
                "id",
                "idViewName",
                "mappedById",
                "name",
                "nullable"
            ]
        },
        "ForeignKeyType": {
            "enum": [
                "AUTO",
                "FAKE",
                "REAL"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<OneToOneAbstractAssociationIdOnly>

export const validateOneToOneAbstractAssociationIdOnly = createSchemaValidator<OneToOneAbstractAssociationIdOnly>(OneToOneAbstractAssociationIdOnlyJsonSchema)

export default {
    uri: "$innerType/OneToOneAbstractAssociationIdOnly",
    schema: OneToOneAbstractAssociationIdOnlyJsonSchema,
    validate: validateOneToOneAbstractAssociationIdOnly,
}
