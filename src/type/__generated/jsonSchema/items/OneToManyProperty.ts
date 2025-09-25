import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OneToManyPropertyJsonSchema: JSONSchemaType<OneToManyProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "OneToMany"
                },
                "mappedById": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean",
                    "const": false
                },
                "typeIsList": {
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
                }
            },
            "required": [
                "associationId",
                "idViewName",
                "referencedEntityId"
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
} as any as JSONSchemaType<OneToManyProperty>

export const validateOneToManyProperty = createSchemaValidator<OneToManyProperty>(OneToManyPropertyJsonSchema)

export default {
    uri: "$innerType/OneToManyProperty",
    schema: OneToManyPropertyJsonSchema,
    validate: validateOneToManyProperty,
}
