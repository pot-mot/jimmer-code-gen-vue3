import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {
    GenModelInput_TargetOf_enums,
    GenModelInput_TargetOf_enums_TargetOf_items
} from "@/api/__generated/model/static";

// typescript-json-schema src/api/__generated/model/static/GenModelInput_TargetOf_enums.ts * --required
// 调整 enumType "type": ["string", "null"] "enum": ["NAME", "ORDINAL", null]
export const GenEnumModelInputJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "GenModelInput_TargetOf_enums": {
            "description": "生成枚举",
            "properties": {
                "comment": {
                    "description": "枚举注释",
                    "type": "string"
                },
                "enumType": {
                    "description": "枚举类型",
                    "enum": [
                        "NAME",
                        "ORDINAL",
                        null
                    ],
                    "type": ["string", "null"]
                },
                "items": {
                    "description": "生成枚举元素",
                    "items": {
                        "$ref": "#/definitions/GenModelInput_TargetOf_enums_TargetOf_items"
                    },
                    "type": "array"
                },
                "modelId": {
                    "description": "模型",
                    "type": "number"
                },
                "name": {
                    "description": "枚举名",
                    "type": "string"
                },
                "packagePath": {
                    "description": "包路径",
                    "type": "string"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                }
            },
            "required": [
                "comment",
                "items",
                "name",
                "packagePath",
                "remark"
            ],
            "type": "object"
        },
        "GenModelInput_TargetOf_enums_TargetOf_items": {
            "description": "生成枚举元素",
            "properties": {
                "comment": {
                    "description": "元素注释",
                    "type": "string"
                },
                "defaultItem": {
                    "description": "是否是默认值",
                    "type": "boolean"
                },
                "mappedValue": {
                    "description": "映射值",
                    "type": "string"
                },
                "name": {
                    "description": "元素名",
                    "type": "string"
                },
                "orderKey": {
                    "description": "排序键",
                    "type": "number"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                }
            },
            "required": [
                "comment",
                "defaultItem",
                "mappedValue",
                "name",
                "orderKey",
                "remark"
            ],
            "type": "object"
        }
    }
}

export const {validate: validateEnum} =
    useShapeValidate<GenModelInput_TargetOf_enums>(
        "GenModelInput_TargetOf_enums",
        GenEnumModelInputJsonSchema
    )

export const {validate: validateEnumItem} =
    useShapeValidate<GenModelInput_TargetOf_enums_TargetOf_items>(
        "GenModelInput_TargetOf_enums_TargetOf_items_2",
        GenEnumModelInputJsonSchema
    )
