import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EnumPropertyJsonSchema: JSONSchemaType<EnumProperty> = {
    "anyOf": [
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
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "key": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "key"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "enum": [
                                "false",
                                "true"
                            ],
                            "type": "string"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
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
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
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
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
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
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        },
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
                        "logicalDelete",
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
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
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
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
                        "logicalDelete": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "logicalDelete"
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
                        }
                    },
                    "required": [
                        "logicalDelete",
                        "logicalDeleteType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "columnInfo": {
                            "$ref": "#/definitions/Omit<Column,\"id\">"
                        }
                    },
                    "required": [
                        "columnInfo"
                    ]
                }
            ]
        }
    ],
    "definitions": {
        "Omit<Column,\"id\">": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean"
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
                "defaultValue": {
                    "type": "string"
                },
                "partOfPrimaryKey": {
                    "type": "boolean"
                },
                "autoIncrement": {
                    "type": "boolean"
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
                "defaultValue",
                "name",
                "nullable",
                "partOfPrimaryKey",
                "type"
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<EnumProperty>

export const validateEnumProperty = createSchemaValidator<EnumProperty>(EnumPropertyJsonSchema)

export default {
    uri: "$innerType/EnumProperty",
    schema: EnumPropertyJsonSchema,
    validate: validateEnumProperty,
}
