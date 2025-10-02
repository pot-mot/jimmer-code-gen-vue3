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
