import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";

// typescript-json-schema src/api/__generated/model/static/GenAssociationModelInput.ts * --required
export const GenAssociationModelInputJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "AssociationType": {
            "enum": [
                "MANY_TO_MANY",
                "MANY_TO_ONE",
                "ONE_TO_MANY",
                "ONE_TO_ONE"
            ],
            "type": "string"
        },
        "GenAssociationModelInput": {
            "properties": {
                "columnReferences": {
                    "description": "列引用",
                    "items": {
                        "$ref": "#/definitions/GenAssociationModelInput_TargetOf_columnReferences"
                    },
                    "type": "array"
                },
                "deleteAction": {
                    "description": "删除行为",
                    "type": "string"
                },
                "dissociateAction": {
                    "description": "脱钩行为",
                    "enum": [
                        "CHECK",
                        "DELETE",
                        "LAX",
                        "NONE",
                        "SET_NULL"
                    ],
                    "type": "string"
                },
                "fake": {
                    "description": "是否伪外键",
                    "type": "boolean"
                },
                "modelId": {
                    "description": "模型",
                    "type": "number"
                },
                "name": {
                    "description": "名称",
                    "type": "string"
                },
                "sourceTableName": {
                    "description": "主表",
                    "type": "string"
                },
                "targetTableName": {
                    "description": "从表",
                    "type": "string"
                },
                "type": {
                    "$ref": "#/definitions/AssociationType",
                    "description": "类型"
                },
                "updateAction": {
                    "description": "更新行为",
                    "type": "string"
                }
            },
            "required": [
                "columnReferences",
                "deleteAction",
                "fake",
                "name",
                "sourceTableName",
                "targetTableName",
                "type",
                "updateAction"
            ],
            "type": "object"
        },
        "GenAssociationModelInput_TargetOf_columnReferences": {
            "properties": {
                "sourceColumnName": {
                    "description": "主列",
                    "type": "string"
                },
                "targetColumnName": {
                    "description": "从列",
                    "type": "string"
                }
            },
            "required": [
                "sourceColumnName",
                "targetColumnName"
            ],
            "type": "object"
        }
    }
}

export const {validate: validateAssociationModelInput} =
    useShapeValidate<DeepReadonly<GenAssociationModelInput>>(
        "GenAssociationModelInput",
        GenAssociationModelInputJsonSchema
    )
