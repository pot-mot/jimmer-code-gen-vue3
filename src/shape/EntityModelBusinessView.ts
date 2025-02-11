import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {DeepReadonly} from "vue";
import {EntityModelBusinessView} from "@/api/__generated/model/static";

// typescript-json-schema src/api/__generated/model/static/EntityModelBusinessView.ts * --required
export const EntityModelBusinessViewSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "EntityModelBusinessView": {
            "properties": {
                "otherProperties": {
                    "items": {
                        "$ref": "#/definitions/GenPropertyModelView"
                    },
                    "type": "array"
                },
                "tableConvertedEntity": {
                    "$ref": "#/definitions/GenEntityModelView"
                }
            },
            "required": [
                "otherProperties",
                "tableConvertedEntity"
            ],
            "type": "object"
        },
        "GenEntityModelView": {
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
                    "description": "是否具有页面",
                    "type": "boolean"
                },
                "name": {
                    "description": "类名称",
                    "type": "string"
                },
                "otherAnnotation": {
                    "$ref": "#/definitions/OtherAnnotation",
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
                "properties": {
                    "description": "属性",
                    "items": {
                        "$ref": "#/definitions/GenEntityModelView_TargetOf_properties"
                    },
                    "type": "array"
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
                "name",
                "overwriteComment",
                "overwriteName",
                "properties",
                "remark",
                "tableName"
            ],
            "type": "object"
        },
        "GenEntityModelView_TargetOf_properties": {
            "description": "生成属性",
            "properties": {
                "associationType": {
                    "description": "关联类型",
                    "enum": [
                        "MANY_TO_MANY",
                        "MANY_TO_ONE",
                        "ONE_TO_MANY",
                        "ONE_TO_ONE",
                        null
                    ],
                    "type": ["string", "null"]
                },
                "columnName": {
                    "description": "名称",
                    "type": "string"
                },
                "comment": {
                    "description": "属性注释",
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
                "joinColumnMetas": {
                    "description": "关联列注解",
                    "items": {
                        "$ref": "#/definitions/JoinColumnMeta"
                    },
                    "type": ["array", "null"]
                },
                "joinTableMeta": {
                    "$ref": "#/definitions/JoinTableMeta",
                    "description": "关联表注解"
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
                    "$ref": "#/definitions/OtherAnnotation",
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
                "inDetailView",
                "inInsertInput",
                "inListView",
                "inLongAssociationInput",
                "inLongAssociationView",
                "inOptionView",
                "inShortAssociationView",
                "inSpecification",
                "inUpdateInput",
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
        "GenPropertyModelView": {
            "description": "生成属性",
            "properties": {
                "associationType": {
                    "description": "关联类型",
                    "enum": [
                        "MANY_TO_MANY",
                        "MANY_TO_ONE",
                        "ONE_TO_MANY",
                        "ONE_TO_ONE",
                        null
                    ],
                    "type": ["string", "null"]
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
                    "type": ["string", "null"]
                },
                "enum": {
                    "$ref": "#/definitions/GenPropertyModelView_TargetOf_enum",
                    "description": "生成枚举"
                },
                "idGenerationAnnotation": {
                    "description": "ID 生成类型",
                    "type": ["string", "null"]
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
                    "description": "ID 视图注解",
                    "type": ["string", "null"]
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
                    "type": ["boolean", "null"]
                },
                "joinColumnMetas": {
                    "description": "关联列注解",
                    "items": {
                        "$ref": "#/definitions/JoinColumnMeta"
                    },
                    "type": ["array", "null"]
                },
                "joinTableMeta": {
                    "$ref": "#/definitions/JoinTableMeta",
                    "description": "关联表注解"
                },
                "keyGroup": {
                    "description": "业务键组",
                    "type": ["object", "null"]
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
                "longAssociation": {
                    "description": "是否为长关联",
                    "type": "boolean"
                },
                "mappedBy": {
                    "description": "映射镜像",
                    "type": ["object", "null"]
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
                    "$ref": "#/definitions/OtherAnnotation",
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
        "GenPropertyModelView_TargetOf_enum": {
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
            "type": ["object", "null"]
        },
        "JoinColumnMeta": {
            "properties": {
                "foreignKeyType": {
                    "enum": [
                        "AUTO",
                        "FAKE",
                        "REAL"
                    ],
                    "type": ["string", "null"]
                },
                "joinColumnName": {
                    "type": "string"
                },
                "referencedColumnName": {
                    "type": ["string", "null"]
                }
            },
            "required": [
                "joinColumnName"
            ],
            "type": ["object", "null"]
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
                    "type": ["string", "null"]
                },
                "tableName": {
                    "type": "string"
                }
            },
            "required": [
                "columnNamePairs",
                "tableName"
            ],
            "type": ["object", "null"]
        },
        "OtherAnnotation": {
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
            "type": ["object", "null"]
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
            "type": ["object", "null"]
        }
    }
}

export const {validate: validateEntityModelBusinessView} =
    useShapeValidate<DeepReadonly<EntityModelBusinessView>>(
        "EntityModelBusinessView",
        EntityModelBusinessViewSchema
    )
