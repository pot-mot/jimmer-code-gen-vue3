import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const LabelPositionJsonSchema: JSONSchemaType<LabelPosition> = {
    "anyOf": [
        {
            "type": "object",
            "properties": {
                "from": {
                    "enum": [
                        "source",
                        "target"
                    ],
                    "type": "string"
                },
                "percentage": {
                    "type": "number"
                }
            },
            "required": [
                "from",
                "percentage"
            ]
        },
        {
            "type": "object",
            "properties": {
                "from": {
                    "enum": [
                        "source",
                        "target"
                    ],
                    "type": "string"
                },
                "fixedLength": {
                    "type": "number"
                }
            },
            "required": [
                "fixedLength",
                "from"
            ]
        }
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<LabelPosition>

export const validateLabelPosition = createSchemaValidator<LabelPosition>(LabelPositionJsonSchema)

export default {
    uri: "$innerType/LabelPosition",
    schema: LabelPositionJsonSchema,
    validate: validateLabelPosition,
}
