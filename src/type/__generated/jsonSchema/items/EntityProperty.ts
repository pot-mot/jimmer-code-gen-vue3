import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EntityPropertyJsonSchema: JSONSchemaType<EntityProperty> = {
    "anyOf": [
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
        },
        {
            "$ref": "#/definitions/ScalarEmbeddableProperty"
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "OneToOne_Source"
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": false
                        },
                        "autoGenerateJoinInfo": {
                            "type": "boolean"
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "autoGenerateJoinInfo",
                        "category",
                        "onDissociateAction",
                        "typeIsList"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinInfo": {
                            "$ref": "#/definitions/FkJoinInfo"
                        },
                        "nullable": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "joinInfo",
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
                        },
                        "idViewNameTemplate": {
                            "type": "string"
                        },
                        "useIdViewNameTemplate": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "idViewNameTemplate",
                        "referencedEntityId",
                        "useIdViewNameTemplate"
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
                            "const": "OneToOne_Source"
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": false
                        },
                        "autoGenerateJoinInfo": {
                            "type": "boolean"
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "autoGenerateJoinInfo",
                        "category",
                        "onDissociateAction",
                        "typeIsList"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinInfo": {
                            "$ref": "#/definitions/FkJoinInfo"
                        },
                        "nullable": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "joinInfo",
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
                        },
                        "idViewNameTemplate": {
                            "type": "string"
                        },
                        "useIdViewNameTemplate": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "idViewNameTemplate",
                        "referencedEntityId",
                        "useIdViewNameTemplate"
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
                            "const": "OneToOne_Source"
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": false
                        },
                        "autoGenerateJoinInfo": {
                            "type": "boolean"
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "autoGenerateJoinInfo",
                        "category",
                        "onDissociateAction",
                        "typeIsList"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinInfo": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "const": "MidTable"
                                },
                                "sourceJoinInfo": {
                                    "$ref": "#/definitions/FkJoinInfo"
                                },
                                "targetJoinInfo": {
                                    "$ref": "#/definitions/FkJoinInfo"
                                },
                                "midTableExtraInfo": {
                                    "type": "object",
                                    "properties": {
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
                                    }
                                }
                            },
                            "required": [
                                "midTableExtraInfo",
                                "sourceJoinInfo",
                                "targetJoinInfo",
                                "type"
                            ]
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "joinInfo",
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
                        },
                        "idViewNameTemplate": {
                            "type": "string"
                        },
                        "useIdViewNameTemplate": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "idViewNameTemplate",
                        "referencedEntityId",
                        "useIdViewNameTemplate"
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
                            "const": "OneToOne_Source"
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": false
                        },
                        "autoGenerateJoinInfo": {
                            "type": "boolean"
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "autoGenerateJoinInfo",
                        "category",
                        "onDissociateAction",
                        "typeIsList"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinInfo": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "const": "MidTable"
                                },
                                "sourceJoinInfo": {
                                    "$ref": "#/definitions/FkJoinInfo"
                                },
                                "targetJoinInfo": {
                                    "$ref": "#/definitions/FkJoinInfo"
                                },
                                "midTableExtraInfo": {
                                    "type": "object",
                                    "properties": {
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
                                    }
                                }
                            },
                            "required": [
                                "midTableExtraInfo",
                                "sourceJoinInfo",
                                "targetJoinInfo",
                                "type"
                            ]
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "joinInfo",
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
                        },
                        "idViewNameTemplate": {
                            "type": "string"
                        },
                        "useIdViewNameTemplate": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "idViewNameTemplate",
                        "referencedEntityId",
                        "useIdViewNameTemplate"
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
                            "const": "ManyToOne"
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": false
                        },
                        "autoGenerateJoinInfo": {
                            "type": "boolean"
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "autoGenerateJoinInfo",
                        "category",
                        "onDissociateAction",
                        "typeIsList"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinInfo": {
                            "$ref": "#/definitions/FkJoinInfo"
                        },
                        "nullable": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "joinInfo",
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
                        },
                        "idViewNameTemplate": {
                            "type": "string"
                        },
                        "useIdViewNameTemplate": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "idViewNameTemplate",
                        "referencedEntityId",
                        "useIdViewNameTemplate"
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
                            "const": "ManyToOne"
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": false
                        },
                        "autoGenerateJoinInfo": {
                            "type": "boolean"
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "autoGenerateJoinInfo",
                        "category",
                        "onDissociateAction",
                        "typeIsList"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinInfo": {
                            "$ref": "#/definitions/FkJoinInfo"
                        },
                        "nullable": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "joinInfo",
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
                        },
                        "idViewNameTemplate": {
                            "type": "string"
                        },
                        "useIdViewNameTemplate": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "idViewNameTemplate",
                        "referencedEntityId",
                        "useIdViewNameTemplate"
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
                            "const": "ManyToOne"
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": false
                        },
                        "autoGenerateJoinInfo": {
                            "type": "boolean"
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "autoGenerateJoinInfo",
                        "category",
                        "onDissociateAction",
                        "typeIsList"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinInfo": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "const": "MidTable"
                                },
                                "sourceJoinInfo": {
                                    "$ref": "#/definitions/FkJoinInfo"
                                },
                                "targetJoinInfo": {
                                    "$ref": "#/definitions/FkJoinInfo"
                                },
                                "midTableExtraInfo": {
                                    "type": "object",
                                    "properties": {
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
                                    }
                                }
                            },
                            "required": [
                                "midTableExtraInfo",
                                "sourceJoinInfo",
                                "targetJoinInfo",
                                "type"
                            ]
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "joinInfo",
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
                        },
                        "idViewNameTemplate": {
                            "type": "string"
                        },
                        "useIdViewNameTemplate": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "idViewNameTemplate",
                        "referencedEntityId",
                        "useIdViewNameTemplate"
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
                            "const": "ManyToOne"
                        },
                        "typeIsList": {
                            "type": "boolean",
                            "const": false
                        },
                        "autoGenerateJoinInfo": {
                            "type": "boolean"
                        },
                        "onDissociateAction": {
                            "$ref": "#/definitions/OnDissociationAction"
                        }
                    },
                    "required": [
                        "autoGenerateJoinInfo",
                        "category",
                        "onDissociateAction",
                        "typeIsList"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "joinInfo": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "const": "MidTable"
                                },
                                "sourceJoinInfo": {
                                    "$ref": "#/definitions/FkJoinInfo"
                                },
                                "targetJoinInfo": {
                                    "$ref": "#/definitions/FkJoinInfo"
                                },
                                "midTableExtraInfo": {
                                    "type": "object",
                                    "properties": {
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
                                    }
                                }
                            },
                            "required": [
                                "midTableExtraInfo",
                                "sourceJoinInfo",
                                "targetJoinInfo",
                                "type"
                            ]
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "joinInfo",
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
                        },
                        "idViewNameTemplate": {
                            "type": "string"
                        },
                        "useIdViewNameTemplate": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "idViewNameTemplate",
                        "referencedEntityId",
                        "useIdViewNameTemplate"
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
                        "rawType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "rawType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "resolver": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "resolver"
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
                        "rawType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "rawType"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "resolverRef": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "resolverRef"
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
                        "typeIsList": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "referencedEntityId",
                        "typeIsList"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "resolver": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "resolver"
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
                        "typeIsList": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "referencedEntityId",
                        "typeIsList"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "resolverRef": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "resolverRef"
                    ]
                }
            ]
        }
    ],
    "definitions": {
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
                        },
                        "rawType": {
                            "type": "string"
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
        "FkJoinInfo": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "Unknown"
                        },
                        "foreignKeyType": {
                            "$ref": "#/definitions/ForeignKeyType"
                        }
                    },
                    "required": [
                        "foreignKeyType",
                        "type"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "SingleColumn"
                        },
                        "columnName": {
                            "type": "string"
                        },
                        "foreignKeyType": {
                            "$ref": "#/definitions/ForeignKeyType"
                        }
                    },
                    "required": [
                        "columnName",
                        "foreignKeyType",
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
                        "columnRefs": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "columnName": {
                                        "type": "string"
                                    },
                                    "referencedColumnName": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "columnName",
                                    "referencedColumnName"
                                ]
                            }
                        },
                        "foreignKeyType": {
                            "$ref": "#/definitions/ForeignKeyType"
                        }
                    },
                    "required": [
                        "columnRefs",
                        "embeddableTypeId",
                        "foreignKeyType",
                        "type"
                    ]
                }
            ]
        },
        "ForeignKeyType": {
            "enum": [
                "FAKE",
                "REAL"
            ],
            "type": "string"
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
                        "typeIsList": {
                            "type": "boolean",
                            "const": true
                        },
                        "joinInfo": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "const": "MidTable"
                                },
                                "sourceJoinInfo": {
                                    "$ref": "#/definitions/FkJoinInfo"
                                },
                                "targetJoinInfo": {
                                    "$ref": "#/definitions/FkJoinInfo"
                                },
                                "midTableExtraInfo": {
                                    "type": "object",
                                    "properties": {
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
                                    }
                                }
                            },
                            "required": [
                                "midTableExtraInfo",
                                "sourceJoinInfo",
                                "targetJoinInfo",
                                "type"
                            ]
                        },
                        "autoGenerateJoinInfo": {
                            "type": "boolean"
                        },
                        "nullable": {
                            "type": "boolean",
                            "const": false
                        }
                    },
                    "required": [
                        "autoGenerateJoinInfo",
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
                        },
                        "idViewNameTemplate": {
                            "type": "string"
                        },
                        "useIdViewNameTemplate": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "associationId",
                        "idViewName",
                        "idViewNameTemplate",
                        "referencedEntityId",
                        "useIdViewNameTemplate"
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
                        "typeIsList": {
                            "type": "boolean",
                            "const": true
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
