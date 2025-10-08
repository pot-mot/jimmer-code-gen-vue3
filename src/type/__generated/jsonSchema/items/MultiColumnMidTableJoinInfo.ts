import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const MultiColumnMidTableJoinInfoJsonSchema: JSONSchemaType<MultiColumnMidTableJoinInfo> = {
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
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<MultiColumnMidTableJoinInfo>

export const validateMultiColumnMidTableJoinInfo = createSchemaValidator<MultiColumnMidTableJoinInfo>(MultiColumnMidTableJoinInfoJsonSchema)

export default {
    uri: "$innerType/MultiColumnMidTableJoinInfo",
    schema: MultiColumnMidTableJoinInfoJsonSchema,
    validate: validateMultiColumnMidTableJoinInfo,
}
