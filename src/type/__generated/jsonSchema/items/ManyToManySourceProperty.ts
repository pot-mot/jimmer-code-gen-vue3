import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToManySourcePropertyJsonSchema: JSONSchemaType<ManyToManySourceProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "ASSOCIATION_ManyToMany_Source"
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
                "referenceEntityId": {
                    "type": "string"
                },
                "idViewName": {
                    "type": "string"
                }
            },
            "required": [
                "associationId",
                "idViewName",
                "referenceEntityId"
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
} as any as JSONSchemaType<ManyToManySourceProperty>

export const validateManyToManySourceProperty = createSchemaValidator<ManyToManySourceProperty>(ManyToManySourcePropertyJsonSchema)

export default {
    uri: "$innerType/ManyToManySourceProperty",
    schema: ManyToManySourcePropertyJsonSchema,
    validate: validateManyToManySourceProperty,
}
