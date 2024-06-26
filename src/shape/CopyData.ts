import {GenTableModelInputJsonSchema} from "@/shape/GenTableModelInput.ts";
import {GenAssociationModelInputJsonSchema} from "@/shape/GenAssociationModelInput.ts";
import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {
    GenAssociationModelInput,
    GenModelInput_TargetOf_enums,
    GenTableModelInput
} from "@/api/__generated/model/static";
import {GenEnumModelInputJsonSchema} from "@/shape/GenEnumModelInput.ts";
import {TableLoadOptions} from "@/components/pages/ModelEditor/graph/load/loadData.ts";

const CopyDataShapeJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        ...GenTableModelInputJsonSchema.definitions,
        ...GenAssociationModelInputJsonSchema.definitions,
        ...GenEnumModelInputJsonSchema.definitions,

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
                }
            }
        }
    }
} as const

export interface CopyData {
    tables: GenTableModelInput[],
    optionsList?: TableLoadOptions[],
    associations: GenAssociationModelInput[],
    enums: GenModelInput_TargetOf_enums[]
}
export const {validate: validateCopyData} =
    useShapeValidate<CopyData>(
        "CopyData",
        CopyDataShapeJsonSchema
    )
