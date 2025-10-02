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
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<MultiColumnMidTableJoinInfo>

export const validateMultiColumnMidTableJoinInfo = createSchemaValidator<MultiColumnMidTableJoinInfo>(MultiColumnMidTableJoinInfoJsonSchema)

export default {
    uri: "$innerType/MultiColumnMidTableJoinInfo",
    schema: MultiColumnMidTableJoinInfoJsonSchema,
    validate: validateMultiColumnMidTableJoinInfo,
}
