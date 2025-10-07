import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OneToOneAssociationIdOnlyJsonSchema: JSONSchemaType<OneToOneAssociationIdOnly> = {
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
            "const": "OneToOne"
        },
        "sourceEntityId": {
            "type": "string"
        },
        "referencedEntityId": {
            "type": "string"
        },
        "sourcePropertyId": {
            "type": "string"
        },
        "mappedProperty": {
            "$ref": "#/definitions/OneToOneMappedProperty"
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
        "sourceEntityId",
        "sourcePropertyId",
        "type"
    ],
    "definitions": {
        "OneToOneMappedProperty": {
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
            ]
        },
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
} as any as JSONSchemaType<OneToOneAssociationIdOnly>

export const validateOneToOneAssociationIdOnly = createSchemaValidator<OneToOneAssociationIdOnly>(OneToOneAssociationIdOnlyJsonSchema)

export default {
    uri: "$innerType/OneToOneAssociationIdOnly",
    schema: OneToOneAssociationIdOnlyJsonSchema,
    validate: validateOneToOneAssociationIdOnly,
}
