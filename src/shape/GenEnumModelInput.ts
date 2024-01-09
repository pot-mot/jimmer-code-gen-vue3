import {useShapeValidate} from "@/utils/shapeValidate.ts";
import {
    GenModelView_TargetOf_enums,
    GenModelView_TargetOf_enums_TargetOf_items_2
} from "@/api/__generated/model/static";

// typescript-json-schema src/api/__generated/model/static/GenModelView_TargetOf_enums.ts * --required
export const GenEnumModelInputJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "GenModelView_TargetOf_enums": {
            "properties": {
                "comment": {
                    "description": "枚举注释",
                    "type": "string"
                },
                "enumType": {
                    "description": "枚举类型",
                    "type": ["string", "null"],
                    "enum": [
                        "NAME",
                        "ORDINAL",
                        null
                    ]
                },
                "items": {
                    "description": "生成枚举元素",
                    "items": {
                        "$ref": "#/definitions/GenModelView_TargetOf_enums_TargetOf_items_2"
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
                "orderKey": {
                    "description": "自定排序",
                    "type": "number"
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
                "orderKey",
                "packagePath",
                "remark"
            ],
            "type": "object"
        },
        "GenModelView_TargetOf_enums_TargetOf_items_2": {
            "properties": {
                "comment": {
                    "description": "元素注释",
                    "type": "string"
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
                    "description": "自定排序",
                    "type": "number"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                }
            },
            "required": [
                "comment",
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
    useShapeValidate<GenModelView_TargetOf_enums>(
        "GenModelView_TargetOf_enums",
        GenEnumModelInputJsonSchema
    )

export const {validate: validateEnumItem} =
    useShapeValidate<GenModelView_TargetOf_enums_TargetOf_items_2>(
        "GenModelView_TargetOf_enums_TargetOf_items_2",
        GenEnumModelInputJsonSchema
    )
