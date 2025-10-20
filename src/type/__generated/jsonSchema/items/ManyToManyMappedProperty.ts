import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToManyMappedPropertyJsonSchema: JSONSchemaType<ManyToManyMappedProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "ManyToMany_Mapped"
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
} as any as JSONSchemaType<ManyToManyMappedProperty>

export const validateManyToManyMappedProperty = createSchemaValidator<ManyToManyMappedProperty>(ManyToManyMappedPropertyJsonSchema)

export default {
    uri: "$innerType/ManyToManyMappedProperty",
    schema: ManyToManyMappedPropertyJsonSchema,
    validate: validateManyToManyMappedProperty,
}
