import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const IdEmbeddablePropertyJsonSchema: JSONSchemaType<IdEmbeddableProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "ID_EMBEDDABLE"
                },
                "nullable": {
                    "type": "boolean",
                    "const": false
                },
                "generatedValue": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "CustomerIdGenerator"
                        },
                        "generatorName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "generatorName",
                        "type"
                    ]
                }
            },
            "required": [
                "category",
                "nullable"
            ]
        },
        {
            "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
        },
        {
            "type": "object",
            "properties": {
                "embeddableTypeId": {
                    "type": "string"
                },
                "propOverrides": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "propertyPath": {
                                "type": "string"
                            },
                            "overrideColumnName": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "overrideColumnName",
                            "propertyPath"
                        ]
                    }
                }
            },
            "required": [
                "embeddableTypeId",
                "propOverrides"
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
} as any as JSONSchemaType<IdEmbeddableProperty>

export const validateIdEmbeddableProperty = createSchemaValidator<IdEmbeddableProperty>(IdEmbeddablePropertyJsonSchema)

export default {
    uri: "$innerType/IdEmbeddableProperty",
    schema: IdEmbeddablePropertyJsonSchema,
    validate: validateIdEmbeddableProperty,
}
