import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";

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
                "sourceTable": {
                    "$ref": "#/definitions/GenAssociationModelInput_TargetOf_sourceTable",
                    "description": "主表"
                },
                "targetTable": {
                    "$ref": "#/definitions/GenAssociationModelInput_TargetOf_targetTable",
                    "description": "从表"
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
                "sourceTable",
                "targetTable",
                "type",
                "updateAction"
            ],
            "type": "object"
        },
        "GenAssociationModelInput_TargetOf_columnReferences": {
            "properties": {
                "sourceColumn": {
                    "$ref": "#/definitions/GenAssociationModelInput_TargetOf_columnReferences_TargetOf_sourceColumn_2",
                    "description": "主列"
                },
                "targetColumn": {
                    "$ref": "#/definitions/GenAssociationModelInput_TargetOf_columnReferences_TargetOf_targetColumn_2",
                    "description": "从列"
                }
            },
            "required": [
                "sourceColumn",
                "targetColumn"
            ],
            "type": "object"
        },
        "GenAssociationModelInput_TargetOf_columnReferences_TargetOf_sourceColumn_2": {
            "properties": {
                "comment": {
                    "description": "注释",
                    "type": "string"
                },
                "name": {
                    "description": "名称",
                    "type": "string"
                },
                "rawType": {
                    "description": "字面类型",
                    "type": "string"
                },
                "typeCode": {
                    "description": "JdbcType 码值",
                    "type": "number"
                }
            },
            "required": [
                "comment",
                "name",
                "rawType",
                "typeCode"
            ],
            "type": "object"
        },
        "GenAssociationModelInput_TargetOf_columnReferences_TargetOf_targetColumn_2": {
            "properties": {
                "comment": {
                    "description": "注释",
                    "type": "string"
                },
                "name": {
                    "description": "名称",
                    "type": "string"
                },
                "rawType": {
                    "description": "字面类型",
                    "type": "string"
                },
                "typeCode": {
                    "description": "JdbcType 码值",
                    "type": "number"
                }
            },
            "required": [
                "comment",
                "name",
                "rawType",
                "typeCode"
            ],
            "type": "object"
        },
        "GenAssociationModelInput_TargetOf_sourceTable": {
            "properties": {
                "comment": {
                    "description": "注释",
                    "type": "string"
                },
                "modelId": {
                    "description": "模型",
                    "type": "number"
                },
                "name": {
                    "description": "名称",
                    "type": "string"
                }
            },
            "required": [
                "comment",
                "name"
            ],
            "type": "object"
        },
        "GenAssociationModelInput_TargetOf_targetTable": {
            "properties": {
                "comment": {
                    "description": "注释",
                    "type": "string"
                },
                "modelId": {
                    "description": "模型",
                    "type": "number"
                },
                "name": {
                    "description": "名称",
                    "type": "string"
                }
            },
            "required": [
                "comment",
                "name"
            ],
            "type": "object"
        }
    }
}

export const {validate: validateAssociationModelInput} =
    useShapeValidate<GenAssociationModelInput>(
        "GenAssociationModelInput",
        GenAssociationModelInputJsonSchema
    )
