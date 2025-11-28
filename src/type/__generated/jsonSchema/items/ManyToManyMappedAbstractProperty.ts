import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToManyMappedAbstractPropertyJsonSchema: JSONSchemaType<ManyToManyMappedAbstractProperty> = {
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
    ],
    "definitions": {
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
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ManyToManyMappedAbstractProperty>

export const validateManyToManyMappedAbstractProperty = createSchemaValidator<ManyToManyMappedAbstractProperty>(ManyToManyMappedAbstractPropertyJsonSchema)

export default {
    uri: "$innerType/ManyToManyMappedAbstractProperty",
    schema: ManyToManyMappedAbstractPropertyJsonSchema,
    validate: validateManyToManyMappedAbstractProperty,
}
