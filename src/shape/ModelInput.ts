import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {EntityModelBusinessView, GenModelInput} from "@/api/__generated/model/static";
import {validateModelEditorData} from "@/shape/ModelEditorData.ts";
import {GenEnumModelInputJsonSchema} from "@/shape/GenEnumModelInput.ts";
import {DeepReadonly} from "vue";
import {validateEntityModelBusinessView} from "@/shape/EntityModelBusinessView.ts";

// typescript-json-schema src/api/__generated/model/static/GenModelInput.ts * --required
// 添加 ...GenEnumModelInputJsonSchema.definitions,
export const GenModelInputJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        ...GenEnumModelInputJsonSchema.definitions,

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
                "enums": {
                    "description": "枚举",
                    "items": {
                        "$ref": "#/definitions/GenModelInput_TargetOf_enums"
                    },
                    "type": "array"
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
                    "description": "逻辑删除注解",
                    "type": "string"
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
                "enums",
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
                "tablePath"
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
