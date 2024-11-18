import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns,
    GenTableModelInput_TargetOf_indexes
} from "@/api/__generated/model/static";


// typescript-json-schema src/api/__generated/model/static/GenTableModelInput.ts * --required
// 手动修正了 columns defaultValue ["string", "null"]
export const GenTableModelInputJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "GenTableModelInput": {
            "properties": {
                "columns": {
                    "description": "列",
                    "items": {
                        "$ref": "#/definitions/GenTableModelInput_TargetOf_columns"
                    },
                    "type": "array"
                },
                "comment": {
                    "description": "注释",
                    "type": "string"
                },
                "indexes": {
                    "description": "唯一索引",
                    "items": {
                        "$ref": "#/definitions/GenTableModelInput_TargetOf_indexes"
                    },
                    "type": "array"
                },
                "modelId": {
                    "description": "模型",
                    "type": "number"
                },
                "name": {
                    "description": "名称",
                    "type": "string"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                },
                "superTables": {
                    "description": "上级表",
                    "items": {
                        "$ref": "#/definitions/GenTableModelInput_TargetOf_superTables"
                    },
                    "type": "array"
                },
                "type": {
                    "$ref": "#/definitions/TableType",
                    "description": "种类"
                }
            },
            "required": [
                "columns",
                "comment",
                "indexes",
                "name",
                "remark",
                "type"
            ],
            "type": "object"
        },
        "GenTableModelInput_TargetOf_columns": {
            "properties": {
                "autoIncrement": {
                    "description": "是否自增",
                    "type": "boolean"
                },
                "businessKey": {
                    "description": "是否为业务键",
                    "type": "boolean"
                },
                "comment": {
                    "description": "注释",
                    "type": "string"
                },
                "dataSize": {
                    "description": "长度",
                    "type": "number"
                },
                "defaultValue": {
                    "description": "默认值",
                    "type": ["string", "null"]
                },
                "enum": {
                    "$ref": "#/definitions/GenTableModelInput_TargetOf_columns_TargetOf_enum",
                    "description": "生成枚举"
                },
                "logicalDelete": {
                    "description": "是否为逻辑删除",
                    "type": "boolean"
                },
                "name": {
                    "description": "名称",
                    "type": "string"
                },
                "numericPrecision": {
                    "description": "精度",
                    "type": "number"
                },
                "orderKey": {
                    "description": "排序键",
                    "type": "number"
                },
                "overwriteByRaw": {
                    "description": "覆盖为字面类型",
                    "type": "boolean"
                },
                "partOfPk": {
                    "description": "是否为主键的部分",
                    "type": "boolean"
                },
                "rawType": {
                    "description": "字面类型",
                    "type": "string"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                },
                "typeCode": {
                    "description": "JdbcType 码值",
                    "type": "number"
                },
                "typeNotNull": {
                    "description": "是否非空",
                    "type": "boolean"
                }
            },
            "required": [
                "autoIncrement",
                "businessKey",
                "comment",
                "dataSize",
                "logicalDelete",
                "name",
                "numericPrecision",
                "orderKey",
                "overwriteByRaw",
                "partOfPk",
                "rawType",
                "remark",
                "typeCode",
                "typeNotNull"
            ],
            "type": "object"
        },
        "GenTableModelInput_TargetOf_columns_TargetOf_enum": {
            "properties": {
                "name": {
                    "description": "枚举名",
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
                    "description": "列",
                    "items": {
                        "$ref": "#/definitions/GenTableModelInput_TargetOf_indexes_TargetOf_columns"
                    },
                    "type": "array"
                },
                "name": {
                    "description": "名称",
                    "type": "string"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                },
                "uniqueIndex": {
                    "description": "唯一索引",
                    "type": "boolean"
                }
            },
            "required": [
                "columns",
                "name",
                "remark",
                "uniqueIndex"
            ],
            "type": "object"
        },
        "GenTableModelInput_TargetOf_indexes_TargetOf_columns": {
            "properties": {
                "name": {
                    "description": "名称",
                    "type": "string"
                }
            },
            "required": [
                "name"
            ],
            "type": "object"
        },
        "GenTableModelInput_TargetOf_superTables": {
            "properties": {
                "name": {
                    "description": "名称",
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
                "Companion",
                "GLOBAL_TEMPORARY",
                "LOCAL_TEMPORARY",
                "SUPER_TABLE",
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

export const {validate: validateColumn} =
    useShapeValidate<GenTableModelInput_TargetOf_columns>(
        "GenTableModelInput_TargetOf_columns",
        GenTableModelInputJsonSchema
    )

export const {validate: validateIndex} =
    useShapeValidate<GenTableModelInput_TargetOf_indexes>(
        "GenTableModelInput_TargetOf_indexes",
        GenTableModelInputJsonSchema
    )
