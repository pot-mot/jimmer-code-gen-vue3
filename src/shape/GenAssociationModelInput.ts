import {useShapeValidate} from "@/utils/shapeValidate.ts";
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
        "DissociateAction": {
            "enum": [
                "CHECK",
                "DELETE",
                "LAX",
                "NONE",
                "SET_NULL"
            ],
            "type": "string"
        },
        "GenAssociationModelInput": {
            "properties": {
                "associationType": {
                    "$ref": "#/definitions/AssociationType"
                },
                "columnReferences": {
                    "items": {
                        "$ref": "#/definitions/GenAssociationModelInput_TargetOf_columnReferences"
                    },
                    "type": "array"
                },
                "dissociateAction": {
                    "$ref": "#/definitions/DissociateAction"
                },
                "fake": {
                    "type": "boolean"
                },
                "modelId": {
                    "type": "number"
                },
                "name": {
                    "type": "string"
                },
                "sourceTable": {
                    "$ref": "#/definitions/GenAssociationModelInput_TargetOf_sourceTable"
                },
                "targetTable": {
                    "$ref": "#/definitions/GenAssociationModelInput_TargetOf_targetTable"
                }
            },
            "required": [
                "associationType",
                "columnReferences",
                "fake",
                "name",
                "sourceTable",
                "targetTable"
            ],
            "type": "object"
        },
        "GenAssociationModelInput_TargetOf_columnReferences": {
            "properties": {
                "sourceColumn": {
                    "$ref": "#/definitions/GenAssociationModelInput_TargetOf_columnReferences_TargetOf_sourceColumn_2"
                },
                "targetColumn": {
                    "$ref": "#/definitions/GenAssociationModelInput_TargetOf_columnReferences_TargetOf_targetColumn_2"
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
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "typeCode": {
                    "type": "number"
                }
            },
            "required": [
                "comment",
                "name",
                "type",
                "typeCode"
            ],
            "type": "object"
        },
        "GenAssociationModelInput_TargetOf_columnReferences_TargetOf_targetColumn_2": {
            "properties": {
                "comment": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "typeCode": {
                    "type": "number"
                }
            },
            "required": [
                "comment",
                "name",
                "type",
                "typeCode"
            ],
            "type": "object"
        },
        "GenAssociationModelInput_TargetOf_sourceTable": {
            "properties": {
                "comment": {
                    "type": "string"
                },
                "modelId": {
                    "type": "number"
                },
                "name": {
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
                    "type": "string"
                },
                "modelId": {
                    "type": "number"
                },
                "name": {
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
