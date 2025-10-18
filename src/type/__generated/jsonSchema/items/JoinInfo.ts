import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JoinInfoJsonSchema: JSONSchemaType<JoinInfo> = {
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
        },
        {
            "$ref": "#/definitions/SingleColumnMidTableJoinInfo"
        },
        {
            "$ref": "#/definitions/MultiColumnMidTableJoinInfo"
        }
    ],
    "definitions": {
        "ForeignKeyType": {
            "enum": [
                "FAKE",
                "REAL"
            ],
            "type": "string"
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
                        "tableComment": {
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
                        "tableComment",
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
                        "tableComment": {
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
                        "tableComment",
                        "tableName"
                    ]
                }
            ]
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<JoinInfo>

export const validateJoinInfo = createSchemaValidator<JoinInfo>(JoinInfoJsonSchema)

export default {
    uri: "$innerType/JoinInfo",
    schema: JoinInfoJsonSchema,
    validate: validateJoinInfo,
}
