import {useShapeValidate} from "@/utils/shapeValidate.ts";
import {GenColumnDefaultInput} from "@/api/__generated/model/static";

// typescript-json-schema src/api/__generated/model/static/GenColumnDefaultInput.ts * --required
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
                "displaySize": {
                    "description": "列展示长度",
                    "type": "number"
                },
                "id": {
                    "description": "ID",
                    "type": "number"
                },
                "numericPrecision": {
                    "description": "列精度",
                    "type": "number"
                },
                "orderKey": {
                    "description": "自定排序",
                    "type": "number"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                },
                "type": {
                    "description": "数据库类型表达式",
                    "type": "string"
                },
                "typeCode": {
                    "description": "JdbcType 码值",
                    "type": "number"
                }
            },
            "required": [
                "dataSourceType",
                "displaySize",
                "numericPrecision",
                "orderKey",
                "remark",
                "type",
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
