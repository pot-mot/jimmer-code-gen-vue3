import {GenTableModelInputJsonSchema} from "@/shape/GenTableModelInput.ts";
import {GenAssociationModelInputJsonSchema} from "@/shape/GenAssociationModelInput.ts";
import {useShapeValidate} from "@/utils/shapeValidate.ts";
import {
    GenAssociationModelInput,
    GenModelInput_TargetOf_enums,
    GenTableModelInput
} from "@/api/__generated/model/static";
import {GenEnumModelInputJsonSchema} from "@/shape/GenEnumModelInput.ts";

const CopyDataShapeJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        ...GenTableModelInputJsonSchema.definitions,
        ...GenAssociationModelInputJsonSchema.definitions,
        ...GenEnumModelInputJsonSchema.definitions,

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

                "associations": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/GenAssociationModelInput"
                    },
                },

                "enums": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/GenModelView_TargetOf_enums"
                    }
                }
            }
        }
    }
} as const

export interface CopyData {
    tables: GenTableModelInput[],
    associations: GenAssociationModelInput[],
    enums: GenModelInput_TargetOf_enums[]
}
export const {validate: validateCopyData} =
    useShapeValidate<CopyData>(
        "CopyData",
        CopyDataShapeJsonSchema
    )
