import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const SingleColumnJoinInfoJsonSchema: JSONSchemaType<SingleColumnJoinInfo> = {
    "type": "object",
    "properties": {
        "type": {
            "type": "string",
            "const": "SingleColumn"
        },
        "columnName": {
            "type": "string"
        },
        "foreignKeyType": {
            "$ref": "#/definitions/ForeignKeyType"
        }
    },
    "required": [
        "columnName",
        "foreignKeyType",
        "type"
    ],
    "definitions": {
        "ForeignKeyType": {
            "enum": [
                "FAKE",
                "REAL"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<SingleColumnJoinInfo>

export const validateSingleColumnJoinInfo = createSchemaValidator<SingleColumnJoinInfo>(SingleColumnJoinInfoJsonSchema)

export default {
    uri: "$innerType/SingleColumnJoinInfo",
    schema: SingleColumnJoinInfoJsonSchema,
    validate: validateSingleColumnJoinInfo,
}
