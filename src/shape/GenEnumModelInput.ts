import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {
    GenModelInput_TargetOf_enums,
    GenModelInput_TargetOf_enums_TargetOf_items
} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";

// typescript-json-schema src/api/__generated/model/static/GenModelInput_TargetOf_enums.ts * --required
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
                        "ORDINAL"
                    ],
                    "type": "string"
                },
                "items": {
                    "description": "生成枚举元素",
                    "items": {
                        "$ref": "#/definitions/GenModelInput_TargetOf_enums_TargetOf_items"
                    },
                    "type": "array"
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
                },
                "subGroup": {
                    "$ref": "#/definitions/GenModelInput_TargetOf_enums_TargetOf_subGroup",
                    "description": "子组"
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
        },
        "GenModelInput_TargetOf_enums_TargetOf_subGroup": {
            "description": "生成模型子组",
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
        }
    }
}

export const {validate: validateEnum} =
    useShapeValidate<DeepReadonly<GenModelInput_TargetOf_enums>>(
        GenEnumModelInputJsonSchema,
        "GenModelInput_TargetOf_enums",
    )

export const {validate: validateEnumItem} =
    useShapeValidate<DeepReadonly<GenModelInput_TargetOf_enums_TargetOf_items>>(
        GenEnumModelInputJsonSchema,
        "GenModelInput_TargetOf_enums_TargetOf_items",
    )
