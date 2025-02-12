import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {DeepReadonly} from "vue";
import {GenPropertyEntityConfigInput} from "@/api/__generated/model/static";

// typescript-json-schema src/api/__generated/model/static/GenPropertyEntityConfigInput.ts * --required
const GenPropertyEntityConfigInputSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "AnnotationWithImports": {
            "properties": {
                "annotations": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "imports": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "annotations",
                "imports"
            ],
            "type": "object"
        },
        "GenPropertyEntityConfigInput": {
            "description": "生成属性",
            "properties": {
                "associationType": {
                    "description": "关联类型",
                    "enum": [
                        "MANY_TO_MANY",
                        "MANY_TO_ONE",
                        "ONE_TO_MANY",
                        "ONE_TO_ONE"
                    ],
                    "type": "string"
                },
                "body": {
                    "$ref": "#/definitions/PropertyBody",
                    "description": "属性方法体"
                },
                "comment": {
                    "description": "属性注释",
                    "type": "string"
                },
                "dissociateAnnotation": {
                    "description": "脱钩注解",
                    "type": "string"
                },
                "enumId": {
                    "description": "生成枚举 ID 视图",
                    "type": "number"
                },
                "generatedId": {
                    "description": "是否是生成式 ID",
                    "type": "boolean"
                },
                "generatedIdAnnotation": {
                    "$ref": "#/definitions/AnnotationWithImports",
                    "description": "生成 ID 注解"
                },
                "idProperty": {
                    "description": "是否 ID 属性",
                    "type": "boolean"
                },
                "idView": {
                    "description": "是否为 ID 视图属性",
                    "type": "boolean"
                },
                "idViewTarget": {
                    "description": "ID 视图目标",
                    "type": "string"
                },
                "inDetailView": {
                    "description": "是否在详情视图DTO中",
                    "type": "boolean"
                },
                "inInsertInput": {
                    "description": "是否在新增入参DTO中",
                    "type": "boolean"
                },
                "inListView": {
                    "description": "是否在列表视图DTO中",
                    "type": "boolean"
                },
                "inLongAssociationInput": {
                    "description": "是否在长关联入参DTO中",
                    "type": "boolean"
                },
                "inLongAssociationView": {
                    "description": "是否在长关联视图DTO中",
                    "type": "boolean"
                },
                "inOptionView": {
                    "description": "是否在选项视图DTO中",
                    "type": "boolean"
                },
                "inShortAssociationView": {
                    "description": "是否在短关联视图DTO中",
                    "type": "boolean"
                },
                "inSpecification": {
                    "description": "是否在查询规格DTO中",
                    "type": "boolean"
                },
                "inUpdateInput": {
                    "description": "是否在修改入参DTO中",
                    "type": "boolean"
                },
                "inputNotNull": {
                    "description": "输入非空",
                    "type": "boolean"
                },
                "joinColumnMetas": {
                    "description": "关联列注解",
                    "items": {
                        "$ref": "#/definitions/JoinColumnMeta"
                    },
                    "type": "array"
                },
                "joinTableMeta": {
                    "$ref": "#/definitions/JoinTableMeta",
                    "description": "关联表注解"
                },
                "keyGroup": {
                    "description": "业务键组",
                    "type": "string"
                },
                "keyProperty": {
                    "description": "是否为业务键属性",
                    "type": "boolean"
                },
                "listType": {
                    "description": "是否列表",
                    "type": "boolean"
                },
                "logicalDelete": {
                    "description": "是否为逻辑删除属性",
                    "type": "boolean"
                },
                "logicalDeletedAnnotation": {
                    "$ref": "#/definitions/AnnotationWithImports",
                    "description": "逻辑删除注解"
                },
                "longAssociation": {
                    "description": "是否为长关联",
                    "type": "boolean"
                },
                "mappedBy": {
                    "description": "映射镜像",
                    "type": "string"
                },
                "name": {
                    "description": "属性名",
                    "type": "string"
                },
                "orderKey": {
                    "description": "排序键",
                    "type": "number"
                },
                "otherAnnotation": {
                    "$ref": "#/definitions/AnnotationWithImports",
                    "description": "其他注解"
                },
                "overwriteComment": {
                    "description": "覆盖自动生成注释",
                    "type": "boolean"
                },
                "overwriteName": {
                    "description": "覆盖自动生成属性名",
                    "type": "boolean"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                },
                "specialFormType": {
                    "description": "特殊表单类型",
                    "enum": [
                        "FILE",
                        "FILE_LIST",
                        "IMAGE",
                        "IMAGE_LIST"
                    ],
                    "type": "string"
                },
                "type": {
                    "description": "字面类型",
                    "type": "string"
                },
                "typeNotNull": {
                    "description": "是否非空",
                    "type": "boolean"
                }
            },
            "required": [
                "comment",
                "generatedId",
                "idProperty",
                "idView",
                "inDetailView",
                "inInsertInput",
                "inListView",
                "inLongAssociationInput",
                "inLongAssociationView",
                "inOptionView",
                "inShortAssociationView",
                "inSpecification",
                "inUpdateInput",
                "keyProperty",
                "listType",
                "logicalDelete",
                "longAssociation",
                "name",
                "orderKey",
                "overwriteComment",
                "overwriteName",
                "remark",
                "type",
                "typeNotNull"
            ],
            "type": "object"
        },
        "JoinColumnMeta": {
            "properties": {
                "foreignKeyType": {
                    "enum": [
                        "AUTO",
                        "FAKE",
                        "REAL"
                    ],
                    "type": "string"
                },
                "joinColumnName": {
                    "type": "string"
                },
                "referencedColumnName": {
                    "type": "string"
                }
            },
            "required": [
                "joinColumnName"
            ],
            "type": "object"
        },
        "JoinTableMeta": {
            "properties": {
                "columnNamePairs": {
                    "items": {
                        "$ref": "#/definitions/Pair<string,string>"
                    },
                    "type": "array"
                },
                "foreignKeyType": {
                    "enum": [
                        "AUTO",
                        "FAKE",
                        "REAL"
                    ],
                    "type": "string"
                },
                "tableName": {
                    "type": "string"
                }
            },
            "required": [
                "columnNamePairs",
                "tableName"
            ],
            "type": "object"
        },
        "Pair<string,string>": {
            "properties": {
                "first": {
                    "type": "string"
                },
                "second": {
                    "type": "string"
                }
            },
            "required": [
                "first",
                "second"
            ],
            "type": "object"
        },
        "PropertyBody": {
            "properties": {
                "codeBlock": {
                    "type": "string"
                },
                "imports": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                }
            },
            "required": [
                "codeBlock",
                "imports"
            ],
            "type": "object"
        }
    }
}

export const {validate: validateGenPropertyEntityConfigInput} =
    useShapeValidate<DeepReadonly<GenPropertyEntityConfigInput>>(
        GenPropertyEntityConfigInputSchema,
        "GenPropertyEntityConfigInput",
    )