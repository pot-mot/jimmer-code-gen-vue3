import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToOneAssociationIdOnlyJsonSchema: JSONSchemaType<ManyToOneAssociationIdOnly> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "useNameTemplate": {
            "type": "boolean"
        },
        "comment": {
            "type": "string"
        },
        "useCommentTemplate": {
            "type": "boolean"
        },
        "type": {
            "type": "string",
            "const": "ManyToOne"
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
            "$ref": "#/definitions/OneToManyProperty"
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
        "type",
        "useCommentTemplate",
        "useNameTemplate"
    ],
    "definitions": {
        "OneToManyProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "OneToMany"
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": true
                        },
                        "mappedById": {
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
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
} as any as JSONSchemaType<ManyToOneAssociationIdOnly>

export const validateManyToOneAssociationIdOnly = createSchemaValidator<ManyToOneAssociationIdOnly>(ManyToOneAssociationIdOnlyJsonSchema)

export default {
    uri: "$innerType/ManyToOneAssociationIdOnly",
    schema: ManyToOneAssociationIdOnlyJsonSchema,
    validate: validateManyToOneAssociationIdOnly,
}
