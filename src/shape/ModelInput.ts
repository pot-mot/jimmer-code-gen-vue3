import {useShapeValidate} from "@/utils/shapeValidate.ts";
import {GenModelInput} from "@/api/__generated/model/static";
import {validateGraphData} from "@/shape/GraphData.ts";
import {sendMessage} from "@/utils/message.ts";

// typescript-json-schema src/api/__generated/model/static/GenModelInput.ts * --required
export const GenModelInputJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "DataSourceType": {
            "enum": [
                "MySQL",
                "PostgreSQL"
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
                "dataSourceType": {
                    "$ref": "#/definitions/DataSourceType",
                    "description": "数据源类型"
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
                "language": {
                    "$ref": "#/definitions/GenLanguage",
                    "description": "语言"
                },
                "name": {
                    "description": "名称",
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
                "syncConvertEntity": {
                    "description": "同步转换实体",
                    "type": "boolean"
                }
            },
            "required": [
                "dataSourceType",
                "enums",
                "language",
                "name",
                "packagePath",
                "remark",
                "syncConvertEntity"
            ],
            "type": "object"
        },
        "GenModelInput_TargetOf_enums": {
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
                        "$ref": "#/definitions/GenModelInput_TargetOf_enums_TargetOf_items_2"
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
        "GenModelInput_TargetOf_enums_TargetOf_items_2": {
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

const {validate: validateModelInputJsonSchema} =
    useShapeValidate<GenModelInput>(
        "GenModelInput",
        GenModelInputJsonSchema
    )

export const validateModelInputStr = (jsonStr: string) => {
    try {
        const modelInput = JSON.parse(jsonStr)

        const result = validateModelInputJsonSchema(modelInput)
        if (result) {
            return validateGraphData(JSON.parse(modelInput['graphData']))
        }

        return result
    } catch (e) {
        sendMessage("modelInput validate fail", "error", e)
        return false
    }
}
