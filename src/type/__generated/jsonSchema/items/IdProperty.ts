import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const IdPropertyJsonSchema: JSONSchemaType<IdProperty> = {
    "anyOf": [
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ID"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
                        },
                        "GeneratedValue": {
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
                        "GeneratedValue",
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
                            "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                        "typeIsArray": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "typeIsArray"
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
                            "const": "ID"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
                        },
                        "GeneratedValue": {
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
                        "GeneratedValue",
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
                            "$ref": "#/definitions/Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                        "typeIsArray": {
                            "type": "boolean",
                            "const": true
                        },
                        "databaseType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "typeIsArray"
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
                            "const": "ID"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
                        },
                        "GeneratedValue": {
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
                        "GeneratedValue",
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
                        "embeddableTypeId": {
                            "type": "string"
                        },
                        "propOverrides": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "propertyId": {
                                        "type": "string"
                                    },
                                    "overrideColumnName": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "overrideColumnName",
                                    "propertyId"
                                ]
                            }
                        }
                    },
                    "required": [
                        "embeddableTypeId",
                        "propOverrides"
                    ]
                }
            ]
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
        },
        "Omit<Column,\"id\"|\"partOfPrimaryKey\"|\"autoIncrement\">": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "comment": {
                    "type": "string"
                },
                "dataSize": {
                    "type": "integer"
                },
                "numericPrecision": {
                    "type": "integer"
                },
                "nullable": {
                    "type": "boolean"
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
} as any as JSONSchemaType<IdProperty>

export const validateIdProperty = createSchemaValidator<IdProperty>(IdPropertyJsonSchema)

export default {
    uri: "$innerType/IdProperty",
    schema: IdPropertyJsonSchema,
    validate: validateIdProperty,
}
