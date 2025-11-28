import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToManyAbstractAssociationIdOnlyJsonSchema: JSONSchemaType<ManyToManyAbstractAssociationIdOnly> = {
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
            "const": "ManyToMany_Abstract"
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
            "$ref": "#/definitions/ManyToManyMappedAbstractProperty"
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
        "ManyToManyMappedAbstractProperty": {
            "allOf": [
                {
                    "$ref": "#/definitions/Omit<ManyToManyMappedProperty,\"name\"|\"comment\"|\"category\"|\"referencedEntityId\"|\"idViewName\"|\"useNameTemplate\"|\"useCommentTemplate\"|\"useIdViewNameTemplate\">"
                },
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ManyToMany_Mapped_Abstract"
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
        "Omit<ManyToManyMappedProperty,\"name\"|\"comment\"|\"category\"|\"referencedEntityId\"|\"idViewName\"|\"useNameTemplate\"|\"useCommentTemplate\"|\"useIdViewNameTemplate\">": {
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
} as any as JSONSchemaType<ManyToManyAbstractAssociationIdOnly>

export const validateManyToManyAbstractAssociationIdOnly = createSchemaValidator<ManyToManyAbstractAssociationIdOnly>(ManyToManyAbstractAssociationIdOnlyJsonSchema)

export default {
    uri: "$innerType/ManyToManyAbstractAssociationIdOnly",
    schema: ManyToManyAbstractAssociationIdOnlyJsonSchema,
    validate: validateManyToManyAbstractAssociationIdOnly,
}
