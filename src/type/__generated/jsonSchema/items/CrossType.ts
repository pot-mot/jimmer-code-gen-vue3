import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const CrossTypeJsonSchema: JSONSchemaType<CrossType> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "source": {
            "$ref": "#/definitions/BackEndMappingSource"
        },
        "sqlType": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string"
                },
                "dataSize": {
                    "type": "number"
                },
                "numericPrecision": {
                    "type": "number"
                },
                "nullable": {
                    "type": "boolean"
                },
                "defaultValue": {
                    "type": "string"
                }
            },
            "required": [
                "nullable",
                "type"
            ]
        },
        "backEndType": {
            "type": "object",
            "properties": {
                "fullTypeExpression": {
                    "type": "string"
                },
                "extraImports": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "extraImports",
                "fullTypeExpression"
            ]
        },
        "typeScriptType": {
            "type": "object",
            "properties": {
                "fullTypeExpression": {
                    "type": "string"
                },
                "extraImports": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "fromPath": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "fromPath",
                            "name"
                        ]
                    }
                }
            },
            "required": [
                "extraImports",
                "fullTypeExpression"
            ]
        }
    },
    "required": [
        "backEndType",
        "id",
        "source",
        "sqlType",
        "typeScriptType"
    ],
    "definitions": {
        "BackEndMappingSource": {
            "enum": [
                "BOTH",
                "JAVA",
                "KOTLIN"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<CrossType>

export const validateCrossType = createSchemaValidator<CrossType>(CrossTypeJsonSchema)

export default {
    uri: "$innerType/CrossType",
    schema: CrossTypeJsonSchema,
    validate: validateCrossType,
}
