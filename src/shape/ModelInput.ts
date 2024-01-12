import {useShapeValidate} from "@/utils/shapeValidate.ts";
import {GenModelInput} from "@/api/__generated/model/static";
import {validateGraphData} from "@/shape/GraphData.ts";
import {GenEnumModelInputJsonSchema} from "@/shape/GenEnumModelInput.ts";

// typescript-json-schema src/api/__generated/model/static/GenModelInput.ts * --required
export const GenModelInputJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        ...GenEnumModelInputJsonSchema.definitions,

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
                    "type": ["string", "null"]
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
    }
}

const {validate: validateModelInputJson} =
    useShapeValidate<GenModelInput>(
        "GenModelInput",
        GenModelInputJsonSchema
    )

export const validateModelInput = (data: any, throwErrors: boolean = false) => {
    const result = validateModelInputJson(data, throwErrors)

    if (result) {
        if ("graphData" in data) {
            return validateGraphData(JSON.parse(data["graphData"]), throwErrors)
        } else {
            return result
        }
    }

    return result
}

export const validateModelInputStr = (jsonStr: string, throwErrors: boolean = false) => {
    const modelInput = JSON.parse(jsonStr)
    return validateModelInput(modelInput, throwErrors)
}
