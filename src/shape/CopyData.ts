import {GenTableModelInputJsonSchema} from "@/shape/GenTableModelInput.ts";
import {GenAssociationModelInputJsonSchema} from "@/shape/GenAssociationModelInput.ts";
import {useShapeValidate} from "@/utils/shapeValidate.ts";
import {GenAssociationModelInput, GenTableModelInput} from "@/api/__generated/model/static";

const CopyDataShapeJsonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        ...GenTableModelInputJsonSchema.definitions,
        ...GenAssociationModelInputJsonSchema.definitions,

        "CopyData": {
            "type": "object",
            "required": ["tables", "associations"],
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
            }
        }
    }
} as const

export const {validate: validateCopyData} =
    useShapeValidate<{tables: GenTableModelInput[], associations: GenAssociationModelInput[]}>(
        "CopyData",
        CopyDataShapeJsonSchema
    )
