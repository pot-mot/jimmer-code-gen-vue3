import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const IdCommonPropertyJsonSchema: JSONSchemaType<IdCommonProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "ID_COMMON"
                },
                "nullable": {
                    "type": "boolean",
                    "const": false
                },
                "rawType": {
                    "type": "string"
                },
                "generatedValue": {
                    "anyOf": [
                        {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "const": "IDENTITY"
                                }
                            },
                            "required": [
                                "type"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "const": "SEQUENCE"
                                },
                                "sequenceName": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "sequenceName",
                                "type"
                            ]
                        },
                        {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "const": "UUID"
                                }
                            },
                            "required": [
                                "type"
                            ]
                        },
                        {
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
                    ]
                }
            },
            "required": [
                "category",
                "nullable",
                "rawType"
            ]
        },
        {
            "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
        },
        {
            "type": "object",
            "properties": {
                "columnInfo": {
                    "$ref": "#/definitions/ColumnInfo"
                },
                "autoSyncColumnName": {
                    "type": "boolean"
                },
                "defaultOrderDirection": {
                    "enum": [
                        "ASC",
                        "DESC"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "autoSyncColumnName",
                "columnInfo"
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
        },
        "ColumnInfo": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean"
                },
                "comment": {
                    "type": "string"
                },
                "dataSize": {
                    "type": "number"
                },
                "numericPrecision": {
                    "type": "number"
                },
                "defaultValue": {
                    "type": "string"
                },
                "otherConstraints": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "comment",
                "name",
                "nullable",
                "type"
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<IdCommonProperty>

export const validateIdCommonProperty = createSchemaValidator<IdCommonProperty>(IdCommonPropertyJsonSchema)

export default {
    uri: "$innerType/IdCommonProperty",
    schema: IdCommonPropertyJsonSchema,
    validate: validateIdCommonProperty,
}
