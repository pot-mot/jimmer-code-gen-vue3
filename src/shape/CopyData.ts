import {GenTableModelInputJsonSchema} from "@/shape/GenTableModelInput.ts";
import {GenAssociationModelInputJsonSchema} from "@/shape/GenAssociationModelInput.ts";
import {useShapeValidate} from "@/shape/shapeValidate.ts";
import type {DeepReadonly} from "vue";
import {GenModelInputJsonSchema} from "@/shape/ModelInput.ts";
import {CopyData} from "@/components/pages/ModelEditor/clipBoard/modelClipBoard.ts";

const CopyDataShapeJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        ...GenTableModelInputJsonSchema.definitions,
        ...GenAssociationModelInputJsonSchema.definitions,
        ...GenModelInputJsonSchema.definitions,

        "TableLoadOptions": {
            "properties": {
                "x": {
                    "type": "number"
                },
                "y": {
                    "type": "number"
                },
            },
            "type": "object"
        },

        "CopyData": {
            "type": "object",
            "required": [],
            "properties": {
                "tables": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/GenTableModelInput"
                    },
                },

                "baseTableOptions": {
                    "$ref": "#/definitions/TableLoadOptions",
                },

                "eachTableOptions": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/TableLoadOptions",
                    }
                },

                "associations": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/GenAssociationModelInput"
                    },
                },

                "enums": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/GenModelInput_TargetOf_enums"
                    }
                },

                "subGroups": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/GenModelInput_TargetOf_subGroups"
                    }
                }
            }
        }
    }
} as const

export const {validate: validateCopyData} =
    useShapeValidate<DeepReadonly<CopyData>>(
        CopyDataShapeJsonSchema,
        "CopyData",
    )
