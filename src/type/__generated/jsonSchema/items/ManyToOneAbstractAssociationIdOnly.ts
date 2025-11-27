import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToOneAbstractAssociationIdOnlyJsonSchema: JSONSchemaType<ManyToOneAbstractAssociationIdOnly> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "nameTemplate": {
            "type": "string"
        },
        "commentTemplate": {
            "type": "string"
        },
        "type": {
            "type": "string",
            "const": "ManyToOne_Abstract"
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
        "withMappedProperty": {
            "type": "boolean"
        },
        "mappedProperty": {
            "$ref": "#/definitions/OneToManyAbstractProperty"
        },
        "foreignKeyType": {
            "$ref": "#/definitions/ForeignKeyType"
        }
    },
    "required": [
        "commentTemplate",
        "foreignKeyType",
        "id",
        "mappedProperty",
        "nameTemplate",
        "referencedEntityId",
        "sourceAbstractEntityId",
        "sourcePropertyId",
        "type",
        "withMappedProperty"
    ],
    "definitions": {
        "OneToManyAbstractProperty": {
            "allOf": [
                {
                    "$ref": "#/definitions/Omit<OneToManyProperty,\"name\"|\"comment\"|\"category\"|\"referencedEntityId\"|\"idViewName\"|\"useNameTemplate\"|\"useCommentTemplate\"|\"useIdViewNameTemplate\">"
                },
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "OneToMany_Abstract"
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
        "Omit<OneToManyProperty,\"name\"|\"comment\"|\"category\"|\"referencedEntityId\"|\"idViewName\"|\"useNameTemplate\"|\"useCommentTemplate\"|\"useIdViewNameTemplate\">": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean",
                    "const": false
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
                    "const": true
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
        },
        "ForeignKeyType": {
            "enum": [
                "FAKE",
                "REAL"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ManyToOneAbstractAssociationIdOnly>

export const validateManyToOneAbstractAssociationIdOnly = createSchemaValidator<ManyToOneAbstractAssociationIdOnly>(ManyToOneAbstractAssociationIdOnlyJsonSchema)

export default {
    uri: "$innerType/ManyToOneAbstractAssociationIdOnly",
    schema: ManyToOneAbstractAssociationIdOnlyJsonSchema,
    validate: validateManyToOneAbstractAssociationIdOnly,
}
