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
        "nameTemplate": {
            "type": "string"
        },
        "useNameTemplate": {
            "type": "boolean"
        },
        "comment": {
            "type": "string"
        },
        "commentTemplate": {
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
        "withMappedProperty": {
            "type": "boolean"
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
        "commentTemplate",
        "foreignKeyType",
        "id",
        "mappedProperty",
        "name",
        "nameTemplate",
        "referencedEntityId",
        "sourceEntityId",
        "sourcePropertyId",
        "type",
        "useCommentTemplate",
        "useNameTemplate",
        "withMappedProperty"
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
                        },
                        "nameTemplate": {
                            "type": "string"
                        },
                        "useNameTemplate": {
                            "type": "boolean"
                        },
                        "commentTemplate": {
                            "type": "string"
                        },
                        "useCommentTemplate": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "category",
                        "commentTemplate",
                        "mappedById",
                        "nameTemplate",
                        "nullable",
                        "typeIsList",
                        "useCommentTemplate",
                        "useNameTemplate"
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
                        "idViewNameTemplate": {
                            "type": "string"
                        },
                        "useIdViewNameTemplate": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "idViewNameTemplate",
                        "referencedEntityId",
                        "useIdViewNameTemplate"
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
