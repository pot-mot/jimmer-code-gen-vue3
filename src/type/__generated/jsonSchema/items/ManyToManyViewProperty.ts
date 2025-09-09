import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToManyViewPropertyJsonSchema: JSONSchemaType<ManyToManyViewProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "ASSOCIATION_ManyToMany_View"
                },
                "baseToManyPropertyId": {
                    "type": "string"
                },
                "deeperPropertyId": {
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
                "baseToManyPropertyId",
                "category",
                "deeperPropertyId",
                "nullable",
                "typeIsList"
            ]
        },
        {
            "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
        }
    ],
    "definitions": {
        "Omit<BaseProperty,\"nullable\">": {
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
} as any as JSONSchemaType<ManyToManyViewProperty>

export const validateManyToManyViewProperty = createSchemaValidator<ManyToManyViewProperty>(ManyToManyViewPropertyJsonSchema)

export default {
    uri: "$innerType/ManyToManyViewProperty",
    schema: ManyToManyViewPropertyJsonSchema,
    validate: validateManyToManyViewProperty,
}
