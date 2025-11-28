import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToOnePropertyJsonSchema: JSONSchemaType<ManyToOneProperty> = {
    "anyOf": [
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
        }
    ],
    "definitions": {
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
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ManyToOneProperty>

export const validateManyToOneProperty = createSchemaValidator<ManyToOneProperty>(ManyToOnePropertyJsonSchema)

export default {
    uri: "$innerType/ManyToOneProperty",
    schema: ManyToOnePropertyJsonSchema,
    validate: validateManyToOneProperty,
}
