import {GenTableModelInputJsonSchema} from "@/shape/GenTableModelInput.ts";
import {GenAssociationModelInputJsonSchema} from "@/shape/GenAssociationModelInput.ts";
import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {
    GenAssociationModelInput,
    GenModelInput_TargetOf_enums, GenModelInput_TargetOf_subGroups,
    GenTableModelInput
} from "@/api/__generated/model/static";
import {GenEnumModelInputJsonSchema} from "@/shape/GenEnumModelInput.ts";
import type {DeepReadonly} from "vue";
import {TableLoadOptions} from "@/components/pages/ModelEditor/load/loadTableNode.ts";
import {GenModelInputJsonSchema} from "@/shape/ModelInput.ts";

export interface CopyData {
    tables: GenTableModelInput[],
    optionsList?: TableLoadOptions[],
    associations: GenAssociationModelInput[],
    enums: GenModelInput_TargetOf_enums[],
    subGroups: GenModelInput_TargetOf_subGroups[],
}

const CopyDataShapeJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        ...GenTableModelInputJsonSchema.definitions,
        ...GenAssociationModelInputJsonSchema.definitions,
        ...GenEnumModelInputJsonSchema.definitions,
        "GenModelInput_TargetOf_subGroups": GenModelInputJsonSchema.definitions.GenModelInput_TargetOf_subGroups,

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
            "required": ["tables", "associations", "enums"],
            "properties": {
                "tables": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/GenTableModelInput"
                    },
                },

                "optionsList": {
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
