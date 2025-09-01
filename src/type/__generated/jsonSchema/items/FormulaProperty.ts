import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const FormulaPropertyJsonSchema: JSONSchemaType<FormulaProperty> = {
    "anyOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "Formula"
                },
                "dependencies": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "body": {
                    "type": "string"
                },
                "rawType": {
                    "type": "string"
                }
            },
            "required": [
                "body",
                "category",
                "dependencies",
                "rawType"
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "Formula"
                        },
                        "sql": {
                            "type": "string"
                        },
                        "rawType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "rawType",
                        "sql"
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
                }
            ]
        }
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<FormulaProperty>

export const validateFormulaProperty = createSchemaValidator<FormulaProperty>(FormulaPropertyJsonSchema)

export default {
    uri: "$innerType/FormulaProperty",
    schema: FormulaPropertyJsonSchema,
    validate: validateFormulaProperty,
}
