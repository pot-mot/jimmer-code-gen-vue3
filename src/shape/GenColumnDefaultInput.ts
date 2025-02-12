import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {GenColumnDefaultInput} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";

// typescript-json-schema src/api/__generated/model/static/GenColumnDefaultInput.ts * --required
export const GenColumnDefaultInputJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "GenColumnDefaultInput": {
            "description": "数据源列类型",
            "properties": {
                "dataSize": {
                    "description": "长度",
                    "type": "number"
                },
                "dataSourceType": {
                    "description": "数据源类型",
                    "enum": [
                        "H2",
                        "MySQL",
                        "PostgreSQL"
                    ],
                    "type": "string"
                },
                "defaultValue": {
                    "description": "默认值",
                    "type": "string"
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
    useShapeValidate<DeepReadonly<GenColumnDefaultInput>>(
        GenColumnDefaultInputJsonSchema,
        "GenColumnDefaultInput",
    )
