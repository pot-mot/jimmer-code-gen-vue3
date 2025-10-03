import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const MultiColumnJoinInfoJsonSchema: JSONSchemaType<MultiColumnJoinInfo> = {
    "type": "object",
    "properties": {
        "type": {
            "type": "string",
            "const": "MultiColumn"
        },
        "embeddableTypeId": {
            "type": "string"
        },
        "columnRefs": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "columnName": {
                        "type": "string"
                    },
                    "referencedColumnName": {
                        "type": "string"
                    }
                },
                "required": [
                    "columnName",
                    "referencedColumnName"
                ]
            }
        }
    },
    "required": [
        "columnRefs",
        "embeddableTypeId",
        "type"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<MultiColumnJoinInfo>

export const validateMultiColumnJoinInfo = createSchemaValidator<MultiColumnJoinInfo>(MultiColumnJoinInfoJsonSchema)

export default {
    uri: "$innerType/MultiColumnJoinInfo",
    schema: MultiColumnJoinInfoJsonSchema,
    validate: validateMultiColumnJoinInfo,
}
