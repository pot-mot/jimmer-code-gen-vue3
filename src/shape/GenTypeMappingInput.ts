import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {GenTypeMappingInput} from "@/api/__generated/model/static";

// typescript-json-schema src/api/__generated/model/static/GenTypeMappingInput.ts * --required
export const GenTypeMappingInputJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "DataSourceType": {
            "enum": [
                "H2",
                "MySQL",
                "PostgreSQL"
            ],
            "type": "string"
        },
        "GenLanguage": {
            "description": "生成语言",
            "enum": [
                "JAVA",
                "KOTLIN"
            ],
            "type": "string"
        },
        "GenTypeMappingInput": {
            "properties": {
                "dataSourceType": {
                    "$ref": "#/definitions/DataSourceType",
                    "description": "数据源类型"
                },
                "id": {
                    "type": "number"
                },
                "language": {
                    "$ref": "#/definitions/GenLanguage",
                    "description": "语言"
                },
                "orderKey": {
                    "description": "排序键",
                    "type": "number"
                },
                "propertyType": {
                    "description": "属性类型",
                    "type": "string"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                },
                "typeExpression": {
                    "description": "数据库类型表达式",
                    "type": "string"
                }
            },
            "required": [
                "dataSourceType",
                "language",
                "orderKey",
                "propertyType",
                "remark",
                "typeExpression"
            ],
            "type": "object"
        }
    }
}

export const {validate: validateTypeMappingInput} =
    useShapeValidate<GenTypeMappingInput>(
        "GenTypeMappingInput",
        GenTypeMappingInputJsonSchema
    )
