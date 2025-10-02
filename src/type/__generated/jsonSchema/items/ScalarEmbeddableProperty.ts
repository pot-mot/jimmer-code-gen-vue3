import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ScalarEmbeddablePropertyJsonSchema: JSONSchemaType<ScalarEmbeddableProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "SCALAR_EMBEDDABLE"
                }
            },
            "required": [
                "category"
            ]
        },
        {
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
                },
                "nullable": {
                    "type": "boolean"
                }
            },
            "required": [
                "comment",
                "extraAnnotations",
                "extraImports",
                "id",
                "name",
                "nullable"
            ]
        },
        {
            "type": "object",
            "properties": {
                "embeddableTypeId": {
                    "type": "string"
                },
                "columnNameOverrides": {
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
                "columnNameOverrides",
                "embeddableTypeId"
            ]
        }
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ScalarEmbeddableProperty>

export const validateScalarEmbeddableProperty = createSchemaValidator<ScalarEmbeddableProperty>(ScalarEmbeddablePropertyJsonSchema)

export default {
    uri: "$innerType/ScalarEmbeddableProperty",
    schema: ScalarEmbeddablePropertyJsonSchema,
    validate: validateScalarEmbeddableProperty,
}
