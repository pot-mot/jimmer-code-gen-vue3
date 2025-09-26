import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OneToManyAbstractPropertyJsonSchema: JSONSchemaType<OneToManyAbstractProperty> = {
    "allOf": [
        {
            "$ref": "#/definitions/Omit<OneToManyProperty,\"category\"|\"referencedEntityId\">"
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
    ],
    "definitions": {
        "Omit<OneToManyProperty,\"category\"|\"referencedEntityId\">": {
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
                    "const": false
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
                },
                "typeIsList": {
                    "type": "boolean",
                    "const": true
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
                "nullable",
                "typeIsList"
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<OneToManyAbstractProperty>

export const validateOneToManyAbstractProperty = createSchemaValidator<OneToManyAbstractProperty>(OneToManyAbstractPropertyJsonSchema)

export default {
    uri: "$innerType/OneToManyAbstractProperty",
    schema: OneToManyAbstractPropertyJsonSchema,
    validate: validateOneToManyAbstractProperty,
}
