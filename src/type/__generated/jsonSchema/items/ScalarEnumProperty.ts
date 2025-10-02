import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ScalarEnumPropertyJsonSchema: JSONSchemaType<ScalarEnumProperty> = {
    "anyOf": [
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "SCALAR_ENUM"
                        },
                        "enumId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumId"
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
                        "defaultOrderDirection": {
                            "enum": [
                                "ASC",
                                "DESC"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
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
                            "const": "SCALAR_ENUM"
                        },
                        "enumId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumId"
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
                        "defaultOrderDirection": {
                            "enum": [
                                "ASC",
                                "DESC"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
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
                            "const": "SCALAR_ENUM"
                        },
                        "enumId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category",
                        "enumId"
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
                        "defaultOrderDirection": {
                            "enum": [
                                "ASC",
                                "DESC"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
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
} as any as JSONSchemaType<ScalarEnumProperty>

export const validateScalarEnumProperty = createSchemaValidator<ScalarEnumProperty>(ScalarEnumPropertyJsonSchema)

export default {
    uri: "$innerType/ScalarEnumProperty",
    schema: ScalarEnumPropertyJsonSchema,
    validate: validateScalarEnumProperty,
}
