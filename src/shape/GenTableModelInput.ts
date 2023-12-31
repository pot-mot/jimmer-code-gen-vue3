import {useShapeValidate} from "@/utils/shapeValidate.ts";
import {GenTableModelInput} from "@/api/__generated/model/static";


// typescript-json-schema src/api/__generated/model/static/GenTableModelInput.ts * --required
// 手动修正了 columns defaultValue nullable
export const GenTableModelInputJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "GenTableModelInput": {
            "properties": {
                "columns": {
                    "items": {
                        "$ref": "#/definitions/GenTableModelInput_TargetOf_columns"
                    },
                    "type": "array"
                },
                "comment": {
                    "type": "string"
                },
                "indexes": {
                    "items": {
                        "$ref": "#/definitions/GenTableModelInput_TargetOf_indexes"
                    },
                    "type": "array"
                },
                "modelId": {
                    "type": "number"
                },
                "name": {
                    "type": "string"
                },
                "orderKey": {
                    "type": "number"
                },
                "remark": {
                    "type": "string"
                },
                "schema": {
                    "$ref": "#/definitions/GenTableModelInput_TargetOf_schema"
                },
                "type": {
                    "$ref": "#/definitions/TableType"
                }
            },
            "required": [
                "columns",
                "comment",
                "indexes",
                "name",
                "orderKey",
                "remark",
                "type"
            ],
            "type": "object"
        },
        "GenTableModelInput_TargetOf_columns": {
            "properties": {
                "autoIncrement": {
                    "type": "boolean"
                },
                "businessKey": {
                    "type": "boolean"
                },
                "comment": {
                    "type": "string"
                },
                "defaultValue": {
                    "type": ["string", "null"]
                },
                "displaySize": {
                    "type": "number"
                },
                "enum": {
                    "$ref": "#/definitions/GenTableModelInput_TargetOf_columns_TargetOf_enum_2"
                },
                "logicalDelete": {
                    "type": "boolean"
                },
                "name": {
                    "type": "string"
                },
                "numericPrecision": {
                    "type": "number"
                },
                "orderKey": {
                    "type": "number"
                },
                "overwriteByType": {
                    "type": "boolean"
                },
                "partOfPk": {
                    "type": "boolean"
                },
                "remark": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "typeCode": {
                    "type": "number"
                },
                "typeNotNull": {
                    "type": "boolean"
                }
            },
            "required": [
                "autoIncrement",
                "businessKey",
                "comment",
                "displaySize",
                "logicalDelete",
                "name",
                "numericPrecision",
                "orderKey",
                "overwriteByType",
                "partOfPk",
                "remark",
                "type",
                "typeCode",
                "typeNotNull"
            ],
            "type": "object"
        },
        "GenTableModelInput_TargetOf_columns_TargetOf_enum_2": {
            "properties": {
                "name": {
                    "type": "string"
                }
            },
            "required": [
                "name"
            ],
            "type": "object"
        },
        "GenTableModelInput_TargetOf_indexes": {
            "properties": {
                "columns": {
                    "items": {
                        "$ref": "#/definitions/GenTableModelInput_TargetOf_indexes_TargetOf_columns_2"
                    },
                    "type": "array"
                },
                "name": {
                    "type": "string"
                },
                "uniqueIndex": {
                    "type": "boolean"
                }
            },
            "required": [
                "columns",
                "name",
                "uniqueIndex"
            ],
            "type": "object"
        },
        "GenTableModelInput_TargetOf_indexes_TargetOf_columns_2": {
            "properties": {
                "name": {
                    "type": "string"
                }
            },
            "required": [
                "name"
            ],
            "type": "object"
        },
        "GenTableModelInput_TargetOf_schema": {
            "properties": {
                "name": {
                    "type": "string"
                }
            },
            "required": [
                "name"
            ],
            "type": "object"
        },
        "TableType": {
            "enum": [
                "ALIAS",
                "GLOBAL_TEMPORARY",
                "LOCAL_TEMPORARY",
                "SYSTEM_TABLE",
                "TABLE",
                "UNKNOWN",
                "VIEW"
            ],
            "type": "string"
        }
    }
}

export const {validate: validateTableModelInput} =
    useShapeValidate<GenTableModelInput>(
        "GenTableModelInput",
        GenTableModelInputJsonSchema
    )
