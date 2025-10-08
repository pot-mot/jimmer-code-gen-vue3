import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OneToOneSourcePropertyJsonSchema: JSONSchemaType<OneToOneSourceProperty> = {
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
                                }
                            },
                            "required": [
                                "columnRefs",
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
                "autoSyncJoinInfoName": {
                    "type": "boolean"
                },
                "onDissociateAction": {
                    "$ref": "#/definitions/OnDissociationAction"
                }
            },
            "required": [
                "autoSyncJoinInfoName",
                "category",
                "joinInfo",
                "onDissociateAction",
                "typeIsList"
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
                },
                "autoSyncIdViewName": {
                    "type": "boolean"
                }
            },
            "required": [
                "associationId",
                "autoSyncIdViewName",
                "idViewName",
                "referencedEntityId"
            ]
        }
    ],
    "definitions": {
        "SingleColumnMidTableJoinInfo": {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "const": "SingleColumnMidTable"
                        },
                        "sourceColumnName": {
                            "type": "string"
                        },
                        "targetColumnName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "sourceColumnName",
                        "targetColumnName",
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
                        "sourceJoinInfo": {
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
                                        }
                                    },
                                    "required": [
                                        "columnRefs",
                                        "embeddableTypeId",
                                        "type"
                                    ]
                                }
                            ]
                        },
                        "targetJoinInfo": {
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
                                        }
                                    },
                                    "required": [
                                        "columnRefs",
                                        "embeddableTypeId",
                                        "type"
                                    ]
                                }
                            ]
                        }
                    },
                    "required": [
                        "sourceJoinInfo",
                        "targetJoinInfo",
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
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<OneToOneSourceProperty>

export const validateOneToOneSourceProperty = createSchemaValidator<OneToOneSourceProperty>(OneToOneSourcePropertyJsonSchema)

export default {
    uri: "$innerType/OneToOneSourceProperty",
    schema: OneToOneSourcePropertyJsonSchema,
    validate: validateOneToOneSourceProperty,
}
