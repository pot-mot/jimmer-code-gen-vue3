import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EmbeddableTypePropertyJsonSchema: JSONSchemaType<EmbeddableTypeProperty> = {
    "anyOf": [
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
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
                            "const": "SCALAR"
                        },
                        "rawType": {
                            "type": "string"
                        },
                        "serialized": {
                            "type": "boolean"
                        },
                        "defaultValue": {
                            "type": "string"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "time"
                        },
                        "logicalDeleteDeletedValue": {
                            "enum": [
                                "now",
                                "null"
                            ],
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                            "const": "ENUM"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                            "const": "ENUM"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                            "const": "ENUM"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                            "const": "ENUM"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                            "const": "ENUM"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
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
                            "const": "ENUM"
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
                            "$ref": "#/definitions/Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "enum"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "string"
                        },
                        "logicalDeleteDeletedValue": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType"
                    ]
                }
            ]
        }
    ],
    "definitions": {
        "Omit<Column,\"partOfPrimaryKey\"|\"autoIncrement\">": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
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
} as any as JSONSchemaType<EmbeddableTypeProperty>

export const validateEmbeddableTypeProperty = createSchemaValidator<EmbeddableTypeProperty>(EmbeddableTypePropertyJsonSchema)

export default {
    uri: "$innerType/EmbeddableTypeProperty",
    schema: EmbeddableTypePropertyJsonSchema,
    validate: validateEmbeddableTypeProperty,
}
