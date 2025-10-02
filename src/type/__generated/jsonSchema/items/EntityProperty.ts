import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EntityPropertyJsonSchema: JSONSchemaType<EntityProperty> = {
    "anyOf": [
        {
            "$ref": "#/definitions/OneToOneMappedProperty"
        },
        {
            "$ref": "#/definitions/OneToManyProperty"
        },
        {
            "$ref": "#/definitions/ManyToManyMappedProperty"
        },
        {
            "$ref": "#/definitions/IdCommonProperty"
        },
        {
            "$ref": "#/definitions/IdEmbeddableProperty"
        },
        {
            "$ref": "#/definitions/VersionProperty"
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
        },
        {
            "$ref": "#/definitions/ScalarEmbeddableProperty"
        },
        {
            "$ref": "#/definitions/OneToOneSourceProperty"
        },
        {
            "$ref": "#/definitions/ManyToOneProperty"
        },
        {
            "$ref": "#/definitions/ManyToManySourceProperty"
        },
        {
            "$ref": "#/definitions/ManyToManyViewProperty"
        },
        {
            "$ref": "#/definitions/GetterFormulaProperty"
        },
        {
            "$ref": "#/definitions/SqlFormulaProperty"
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "TRANSIENT"
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
                        "rawType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "rawType"
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
                            "const": "TRANSIENT"
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
                        "referencedEntityId": {
                            "type": "string"
                        },
                        "resolver": {
                            "type": "string"
                        },
                        "typeIsList": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "referencedEntityId",
                        "resolver",
                        "typeIsList"
                    ]
                }
            ]
        }
    ],
    "definitions": {
        "OneToOneMappedProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "OneToOne_Mapped"
                        },
                        "mappedById": {
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "category",
                        "mappedById",
                        "nullable"
                    ]
                },
                {
                    "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
                },
                {
                    "type": "object",
                    "properties": {
                        "associationId": {
                            "type": "string"
                        },
                        "referencedEntityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "referencedEntityId"
                    ]
                }
            ]
        },
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
        "OneToManyProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "OneToMany"
                        },
                        "mappedById": {
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "category",
                        "mappedById",
                        "nullable",
                        "typeIsList"
                    ]
                },
                {
                    "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
                },
                {
                    "type": "object",
                    "properties": {
                        "associationId": {
                            "type": "string"
                        },
                        "referencedEntityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "referencedEntityId"
                    ]
                }
            ]
        },
        "ManyToManyMappedProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ManyToMany_Mapped"
                        },
                        "mappedById": {
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "category",
                        "mappedById",
                        "nullable",
                        "typeIsList"
                    ]
                },
                {
                    "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
                },
                {
                    "type": "object",
                    "properties": {
                        "associationId": {
                            "type": "string"
                        },
                        "referencedEntityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "referencedEntityId"
                    ]
                }
            ]
        },
        "IdCommonProperty": {
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
        },
        "IdEmbeddableProperty": {
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
            ]
        },
        "VersionProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "VERSION"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
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
        "ScalarEmbeddableProperty": {
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
            ]
        },
        "OneToOneSourceProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "OneToOne_Source"
                        },
                        "joinInfo": {
                            "anyOf": [
                                {
                                    "type": "object",
                                    "properties": {
                                        "type": {
                                            "type": "string",
                                            "const": "SingleColumn"
                                        },
                                        "columnName": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "columnName",
                                        "type"
                                    ]
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "type": {
                                            "type": "string",
                                            "const": "MultiColumn"
                                        },
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
                                        "embeddableTypeId",
                                        "type"
                                    ]
                                },
                                {
                                    "$ref": "#/definitions/SingleColumnMidTableJoinInfo"
                                },
                                {
                                    "$ref": "#/definitions/MultiColumnMidTableJoinInfo"
                                }
                            ]
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "category",
                        "joinInfo",
                        "onDissociateAction"
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
                        "associationId": {
                            "type": "string"
                        },
                        "referencedEntityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "referencedEntityId"
                    ]
                }
            ]
        },
        "SingleColumnMidTableJoinInfo": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "SingleColumnMidTable"
                        },
                        "columnName": {
                            "type": "string"
                        },
                        "midTableSourceColumnName": {
                            "type": "string"
                        },
                        "midTableTargetColumnName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "columnName",
                        "midTableSourceColumnName",
                        "midTableTargetColumnName",
                        "type"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "tableName": {
                            "type": "string"
                        },
                        "readonly": {
                            "type": "boolean"
                        },
                        "preventDeletionBySource": {
                            "type": "boolean"
                        },
                        "preventDeletionByTarget": {
                            "type": "boolean"
                        },
                        "cascadeDeletedBySource": {
                            "type": "boolean"
                        },
                        "cascadeDeletedByTarget": {
                            "type": "boolean"
                        },
                        "deletedWhenEndpointIsLogicallyDeleted": {
                            "type": "boolean"
                        },
                        "filter": {
                            "type": "object",
                            "properties": {
                                "columnName": {
                                    "type": "string"
                                },
                                "type": {
                                    "type": "string"
                                },
                                "value": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "required": [
                                "columnName",
                                "type",
                                "value"
                            ]
                        },
                        "logicalDeleteFilter": {
                            "type": "object",
                            "properties": {
                                "columnName": {
                                    "type": "string"
                                },
                                "type": {
                                    "type": "string"
                                },
                                "nullable": {
                                    "type": "boolean"
                                },
                                "value": {
                                    "type": "string"
                                },
                                "generatorType": {
                                    "type": "string"
                                },
                                "generatorRef": {
                                    "type": "string"
                                },
                                "initializedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "columnName",
                                "generatorRef",
                                "generatorType",
                                "initializedValue",
                                "nullable",
                                "type",
                                "value"
                            ]
                        }
                    },
                    "required": [
                        "tableName"
                    ]
                }
            ]
        },
        "MultiColumnMidTableJoinInfo": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "MultiColumnMidTable"
                        },
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
                        },
                        "midTableSourceColumnNameOverrides": {
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
                        },
                        "midTableTargetColumnNameOverrides": {
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
                        "embeddableTypeId",
                        "midTableSourceColumnNameOverrides",
                        "midTableTargetColumnNameOverrides",
                        "type"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "tableName": {
                            "type": "string"
                        },
                        "readonly": {
                            "type": "boolean"
                        },
                        "preventDeletionBySource": {
                            "type": "boolean"
                        },
                        "preventDeletionByTarget": {
                            "type": "boolean"
                        },
                        "cascadeDeletedBySource": {
                            "type": "boolean"
                        },
                        "cascadeDeletedByTarget": {
                            "type": "boolean"
                        },
                        "deletedWhenEndpointIsLogicallyDeleted": {
                            "type": "boolean"
                        },
                        "filter": {
                            "type": "object",
                            "properties": {
                                "columnName": {
                                    "type": "string"
                                },
                                "type": {
                                    "type": "string"
                                },
                                "value": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                }
                            },
                            "required": [
                                "columnName",
                                "type",
                                "value"
                            ]
                        },
                        "logicalDeleteFilter": {
                            "type": "object",
                            "properties": {
                                "columnName": {
                                    "type": "string"
                                },
                                "type": {
                                    "type": "string"
                                },
                                "nullable": {
                                    "type": "boolean"
                                },
                                "value": {
                                    "type": "string"
                                },
                                "generatorType": {
                                    "type": "string"
                                },
                                "generatorRef": {
                                    "type": "string"
                                },
                                "initializedValue": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "columnName",
                                "generatorRef",
                                "generatorType",
                                "initializedValue",
                                "nullable",
                                "type",
                                "value"
                            ]
                        }
                    },
                    "required": [
                        "tableName"
                    ]
                }
            ]
        },
        "OnDissociationAction": {
            "enum": [
                "CHECK",
                "DELETE",
                "LAX",
                "NONE",
                "SET_NULL"
            ],
            "type": "string"
        },
        "ManyToOneProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ManyToOne"
                        },
                        "joinInfo": {
                            "anyOf": [
                                {
                                    "type": "object",
                                    "properties": {
                                        "type": {
                                            "type": "string",
                                            "const": "SingleColumn"
                                        },
                                        "columnName": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "columnName",
                                        "type"
                                    ]
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "type": {
                                            "type": "string",
                                            "const": "MultiColumn"
                                        },
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
                                        "embeddableTypeId",
                                        "type"
                                    ]
                                },
                                {
                                    "$ref": "#/definitions/SingleColumnMidTableJoinInfo"
                                },
                                {
                                    "$ref": "#/definitions/MultiColumnMidTableJoinInfo"
                                }
                            ]
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "category",
                        "joinInfo",
                        "onDissociateAction"
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
                        "associationId": {
                            "type": "string"
                        },
                        "referencedEntityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "referencedEntityId"
                    ]
                }
            ]
        },
        "ManyToManySourceProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ManyToMany_Source"
                        },
                        "joinInfo": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/SingleColumnMidTableJoinInfo"
                                },
                                {
                                    "$ref": "#/definitions/MultiColumnMidTableJoinInfo"
                                }
                            ]
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "category",
                        "joinInfo",
                        "nullable",
                        "typeIsList"
                    ]
                },
                {
                    "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
                },
                {
                    "type": "object",
                    "properties": {
                        "associationId": {
                            "type": "string"
                        },
                        "referencedEntityId": {
                            "type": "string"
                        },
                        "idViewName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "referencedEntityId"
                    ]
                }
            ]
        },
        "ManyToManyViewProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "ManyToMany_View"
                        },
                        "baseToManyPropertyId": {
                            "type": "string"
                        },
                        "deeperPropertyId": {
                            "type": "string"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "baseToManyPropertyId",
                        "category",
                        "deeperPropertyId",
                        "nullable",
                        "typeIsList"
                    ]
                },
                {
                    "$ref": "#/definitions/Omit<BaseProperty,\"nullable\">"
                }
            ]
        },
        "GetterFormulaProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "FORMULA_GETTER"
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
        },
        "SqlFormulaProperty": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "FORMULA_SQL"
                        },
                        "sql": {
                            "type": "string"
                        },
                        "rawType": {
                            "type": "string"
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
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<EntityProperty>

export const validateEntityProperty = createSchemaValidator<EntityProperty>(EntityPropertyJsonSchema)

export default {
    uri: "$innerType/EntityProperty",
    schema: EntityPropertyJsonSchema,
    validate: validateEntityProperty,
}
