import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {EntityModelBusinessView, GenModelInput} from "@/api/__generated/model/static";
import {validateModelEditorData} from "@/shape/ModelEditorData.ts";
import {DeepReadonly} from "vue";
import {validateEntityModelBusinessView} from "@/shape/EntityModelBusinessView.ts";

// typescript-json-schema src/api/__generated/model/static/GenModelInput.ts * --required
export const GenModelInputJsonSchema = {
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
        "DataSourceType": {
            "enum": [
                "H2",
                "MySQL",
                "PostgreSQL"
            ],
            "type": "string"
        },
        "DatabaseNamingStrategyType": {
            "enum": [
                "LOWER_CASE",
                "RAW",
                "UPPER_CASE"
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
        "GenModelInput": {
            "description": "生成模型",
            "properties": {
                "author": {
                    "description": "作者",
                    "type": "string"
                },
                "columnAnnotation": {
                    "description": "生成 Column 注解",
                    "type": "boolean"
                },
                "columnCommentPrefixes": {
                    "description": "转换属性时移除的列注释前缀",
                    "type": "string"
                },
                "columnCommentSuffixes": {
                    "description": "转换属性时移除的列注释后缀",
                    "type": "string"
                },
                "columnNamePrefixes": {
                    "description": "转换属性时移除的列名前缀",
                    "type": "string"
                },
                "columnNameSuffixes": {
                    "description": "转换属性时移除的列名后缀",
                    "type": "string"
                },
                "dataSourceType": {
                    "$ref": "#/definitions/DataSourceType",
                    "description": "数据源类型"
                },
                "databaseNamingStrategy": {
                    "$ref": "#/definitions/DatabaseNamingStrategyType",
                    "description": "数据库命名策略"
                },
                "dateTimeFormatInView": {
                    "description": "在前端视图中进行日期格式化",
                    "type": "boolean"
                },
                "defaultIdType": {
                    "description": "默认 ID 类型",
                    "type": "number"
                },
                "enums": {
                    "description": "枚举",
                    "items": {
                        "$ref": "#/definitions/GenModelInput_TargetOf_enums"
                    },
                    "type": "array"
                },
                "generatedIdAnnotation": {
                    "$ref": "#/definitions/AnnotationWithImports",
                    "description": "生成 ID 注解"
                },
                "graphData": {
                    "description": "Graph 数据",
                    "type": "string"
                },
                "id": {
                    "description": "ID",
                    "type": "number"
                },
                "idViewProperty": {
                    "description": "生成 IdView 属性",
                    "type": "boolean"
                },
                "joinColumnAnnotation": {
                    "description": "生成 JoinColumn 注解",
                    "type": "boolean"
                },
                "joinTableAnnotation": {
                    "description": "生成 JoinTable 注解",
                    "type": "boolean"
                },
                "language": {
                    "$ref": "#/definitions/GenLanguage",
                    "description": "语言"
                },
                "logicalDeletedAnnotation": {
                    "$ref": "#/definitions/AnnotationWithImports",
                    "description": "逻辑删除注解"
                },
                "name": {
                    "description": "名称",
                    "type": "string"
                },
                "packagePath": {
                    "description": "包路径",
                    "type": "string"
                },
                "realFk": {
                    "description": "启用真实外键",
                    "type": "boolean"
                },
                "remark": {
                    "description": "备注",
                    "type": "string"
                },
                "tableAnnotation": {
                    "description": "生成 Table 注解",
                    "type": "boolean"
                },
                "tableCommentPrefixes": {
                    "description": "转换实体时移除的表注释前缀",
                    "type": "string"
                },
                "tableCommentSuffixes": {
                    "description": "转换实体时移除的表注释后缀",
                    "type": "string"
                },
                "tableNamePrefixes": {
                    "description": "转换实体时移除的表名前缀",
                    "type": "string"
                },
                "tableNameSuffixes": {
                    "description": "转换实体时移除的表名后缀",
                    "type": "string"
                },
                "tablePath": {
                    "description": "表路径",
                    "type": "string"
                },
                "viewType": {
                    "const": "VUE3_ELEMENT_PLUS",
                    "description": "视图类型",
                    "type": "string"
                }
            },
            "required": [
                "author",
                "columnAnnotation",
                "columnCommentPrefixes",
                "columnCommentSuffixes",
                "columnNamePrefixes",
                "columnNameSuffixes",
                "dataSourceType",
                "databaseNamingStrategy",
                "dateTimeFormatInView",
                "defaultIdType",
                "enums",
                "generatedIdAnnotation",
                "graphData",
                "idViewProperty",
                "joinColumnAnnotation",
                "joinTableAnnotation",
                "language",
                "logicalDeletedAnnotation",
                "name",
                "packagePath",
                "realFk",
                "remark",
                "tableAnnotation",
                "tableCommentPrefixes",
                "tableCommentSuffixes",
                "tableNamePrefixes",
                "tableNameSuffixes",
                "tablePath",
                "viewType"
            ],
            "type": "object"
        },
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

const {validate: validateModelInputJson} =
    useShapeValidate<DeepReadonly<GenModelInput>>(
        "GenModelInput",
        GenModelInputJsonSchema
    )

export const validateModelInput = (data: any, onErrors: (e: any) => void) => {
    const modelInputValidResult = validateModelInputJson(data, onErrors)
    if (!modelInputValidResult) return false

    const modelEditorDataValidResult = validateModelEditorData(JSON.parse(data["graphData"]), onErrors)
    if (!modelEditorDataValidResult) return false

    return true
}

export type ModelInputWithEntities = GenModelInput & {
    entities?: Array<EntityModelBusinessView>
}

export const validateModelInputWithEntities = (data: any, onErrors: (e: any) => void) => {
    const modelInputValid = validateModelInput(data, onErrors)
    if (!modelInputValid) return false

    if (!("entities" in data)) {
        return true
    }

    for (const entity of data["entities"]) {
        const entityValid = validateEntityModelBusinessView(entity, onErrors)
        if (!entityValid) return false
    }

    return true
}
