import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const MidTableJoinInfoJsonSchema: JSONSchemaType<MidTableJoinInfo> = {
    "anyOf": [
        {
            "$ref": "#/definitions/SingleColumnMidTableJoinInfo"
        },
        {
            "$ref": "#/definitions/MultiColumnMidTableJoinInfo"
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
                        },
                        "sourceForeignKeyType": {
                            "$ref": "#/definitions/ForeignKeyType"
                        },
                        "targetForeignKeyType": {
                            "$ref": "#/definitions/ForeignKeyType"
                        }
                    },
                    "required": [
                        "sourceColumnName",
                        "sourceForeignKeyType",
                        "targetColumnName",
                        "targetForeignKeyType",
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
        "ForeignKeyType": {
            "enum": [
                "FAKE",
                "REAL"
            ],
            "type": "string"
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
} as any as JSONSchemaType<MidTableJoinInfo>

export const validateMidTableJoinInfo = createSchemaValidator<MidTableJoinInfo>(MidTableJoinInfoJsonSchema)

export default {
    uri: "$innerType/MidTableJoinInfo",
    schema: MidTableJoinInfoJsonSchema,
    validate: validateMidTableJoinInfo,
}
