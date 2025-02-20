import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {DeepReadonly} from "vue";
import {EntityExportView} from "@/api/__generated/model/static";

// typescript-json-schema src/api/__generated/model/static/EntityExportView.ts * --required
const EntityExportViewSchema = {
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
        "EntityExportView": {
            "properties": {
                "entity": {
                    "$ref": "#/definitions/GenEntityExportView",
                    "description": "表直接转换得到的实体"
                },
                "properties": {
                    "description": "其余非转换属性",
                    "items": {
                        "$ref": "#/definitions/GenPropertyExportView"
                    },
                    "type": "array"
                }
            },
            "required": [
                "entity",
                "properties"
            ],
            "type": "object"
        },
        "GenEntityExportView": {
            "description": "生成实体",
            "properties": {
                "canAdd": {
                    "description": "是否可以创建",
                    "type": "boolean"
                },
                "canDelete": {
                    "description": "是否可以删除",
                    "type": "boolean"
                },
                "canEdit": {
                    "description": "是否可以修改",
                    "type": "boolean"
                },
                "canQuery": {
                    "description": "是否可以查询",
                    "type": "boolean"
                },
                "comment": {
                    "description": "类注释",
                    "type": "string"
                },
                "hasPage": {
                    "description": "是否具有管理端页面",
                    "type": "boolean"
                },
                "id": {
                    "description": "ID",
                    "type": "number"
                },
                "name": {
                    "description": "类名称",
                    "type": "string"
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
                    "description": "覆盖自动生成类名称",
                    "type": "boolean"
                },
                "pageCanAdd": {
                    "description": "管理端页面中可新增",
                    "type": "boolean"
                },
                "pageCanDelete": {
                    "description": "管理端页面中可删除",
                    "type": "boolean"
                },
                "pageCanEdit": {
                    "description": "管理端页面中可编辑",
                    "type": "boolean"
                },
                "pageCanQuery": {
                    "description": "管理端页面中可查询",
                    "type": "boolean"
                },
                "pageCanViewDetail": {
                    "description": "管理端页面中可查看详情",
                    "type": "boolean"
                },
                "properties": {
                    "description": "属性",
                    "items": {
                        "$ref": "#/definitions/GenEntityExportView_TargetOf_properties"
                    },
                    "type": "array"
                },
                "queryByPage": {
                    "description": "应用分页查询",
                    "type": "boolean"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                },
                "tableName": {
                    "description": "名称",
                    "type": "string"
                }
            },
            "required": [
                "canAdd",
                "canDelete",
                "canEdit",
                "canQuery",
                "comment",
                "hasPage",
                "id",
                "name",
                "overwriteComment",
                "overwriteName",
                "pageCanAdd",
                "pageCanDelete",
                "pageCanEdit",
                "pageCanQuery",
                "pageCanViewDetail",
                "properties",
                "queryByPage",
                "remark",
                "tableName"
            ],
            "type": "object"
        },
        "GenEntityExportView_TargetOf_properties": {
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
                "columnName": {
                    "description": "名称",
                    "type": "string"
                },
                "comment": {
                    "description": "属性注释",
                    "type": "string"
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
                },
                "typeTable": {
                    "$ref": "#/definitions/GenEntityExportView_TargetOf_properties_TargetOf_typeTable",
                    "description": "类型对应表"
                }
            },
            "required": [
                "comment",
                "generatedId",
                "idProperty",
                "inDetailView",
                "inInsertInput",
                "inListView",
                "inLongAssociationInput",
                "inLongAssociationView",
                "inOptionView",
                "inShortAssociationView",
                "inSpecification",
                "inUpdateInput",
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
        "GenEntityExportView_TargetOf_properties_TargetOf_typeTable": {
            "description": "生成表",
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
        },
        "GenPropertyExportView": {
            "description": "生成属性",
            "properties": {
                "body": {
                    "$ref": "#/definitions/PropertyBody",
                    "description": "属性方法体"
                },
                "comment": {
                    "description": "属性注释",
                    "type": "string"
                },
                "enum": {
                    "$ref": "#/definitions/GenPropertyExportView_TargetOf_enum",
                    "description": "生成枚举"
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
                "listType": {
                    "description": "是否列表",
                    "type": "boolean"
                },
                "longAssociation": {
                    "description": "是否为长关联",
                    "type": "boolean"
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
                "typeEntity": {
                    "$ref": "#/definitions/GenPropertyExportView_TargetOf_typeEntity",
                    "description": "对应实体"
                },
                "typeNotNull": {
                    "description": "是否非空",
                    "type": "boolean"
                }
            },
            "required": [
                "comment",
                "inDetailView",
                "inInsertInput",
                "inListView",
                "inLongAssociationInput",
                "inLongAssociationView",
                "inOptionView",
                "inShortAssociationView",
                "inSpecification",
                "inUpdateInput",
                "listType",
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
        "GenPropertyExportView_TargetOf_enum": {
            "description": "生成枚举",
            "properties": {
                "name": {
                    "description": "枚举名",
                    "type": "string"
                }
            },
            "required": [
                "name"
            ],
            "type": "object"
        },
        "GenPropertyExportView_TargetOf_typeEntity": {
            "description": "生成实体",
            "properties": {
                "name": {
                    "description": "类名称",
                    "type": "string"
                }
            },
            "required": [
                "name"
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

export const {validate: validateEntityExportView} =
    useShapeValidate<DeepReadonly<EntityExportView>>(
        EntityExportViewSchema,
        "EntityExportView",
    )
