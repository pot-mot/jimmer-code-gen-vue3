import {useShapeValidate} from "@/utils/shapeValidate.ts";
import {GenColumnDefaultInput} from "@/api/__generated/model/static";

// typescript-json-schema src/api/__generated/model/static/GenColumnDefaultInput.ts * --required
// 调整 defaultValue type ["string", "null"]
export const GenColumnDefaultInputJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "DataSourceType": {
            "enum": [
                "MySQL",
                "PostgreSQL"
            ],
            "type": "string"
        },
        "GenColumnDefaultInput": {
            "properties": {
                "dataSourceType": {
                    "$ref": "#/definitions/DataSourceType",
                    "description": "数据源类型"
                },
                "defaultValue": {
                    "description": "默认值",
                    "type": ["string", "null"]
                },
                "dataSize": {
                    "description": "长度",
                    "type": "number"
                },
                "id": {
                    "description": "ID",
                    "type": "number"
                },
                "numericPrecision": {
                    "description": "精度",
                    "type": "number"
                },
                "orderKey": {
                    "description": "排序键",
                    "type": "number"
                },
                "rawType": {
                    "description": "数据库类型表达式",
                    "type": "string"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                },
                "typeCode": {
                    "description": "JdbcType 码值",
                    "type": "number"
                }
            },
            "required": [
                "dataSourceType",
                "dataSize",
                "numericPrecision",
                "orderKey",
                "rawType",
                "remark",
                "typeCode"
            ],
            "type": "object"
        }
    }
}

export const {validate: validateColumnDefaultInput} =
    useShapeValidate<GenColumnDefaultInput>(
        "GenColumnDefaultInput",
        GenColumnDefaultInputJsonSchema
    )
