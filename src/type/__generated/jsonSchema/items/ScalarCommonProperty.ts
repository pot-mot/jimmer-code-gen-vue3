import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ScalarCommonPropertyJsonSchema: JSONSchemaType<ScalarCommonProperty> = {
    "anyOf": [
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "SCALAR_COMMON"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        },
                        "typeIsArray": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "category",
                        "rawType",
                        "serialized"
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
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "SCALAR_COMMON"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        },
                        "typeIsArray": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "category",
                        "rawType",
                        "serialized"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "key": {
                            "type": "boolean",
                            "const": true
                        },
                        "keyGroups": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    },
                    "required": [
                        "key",
                        "keyGroups"
                    ]
                }
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "SCALAR_COMMON"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
                        },
                        "typeIsArray": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "category",
                        "rawType",
                        "serialized"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                }
            ]
        }
    ],
    "definitions": {
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
} as any as JSONSchemaType<ScalarCommonProperty>

export const validateScalarCommonProperty = createSchemaValidator<ScalarCommonProperty>(ScalarCommonPropertyJsonSchema)

export default {
    uri: "$innerType/ScalarCommonProperty",
    schema: ScalarCommonPropertyJsonSchema,
    validate: validateScalarCommonProperty,
}
