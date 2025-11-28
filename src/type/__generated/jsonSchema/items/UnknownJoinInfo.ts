import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const UnknownJoinInfoJsonSchema: JSONSchemaType<UnknownJoinInfo> = {
    "type": "object",
    "properties": {
        "type": {
            "type": "string",
            "const": "Unknown"
        },
        "foreignKeyType": {
            "$ref": "#/definitions/ForeignKeyType"
        }
    },
    "required": [
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
} as any as JSONSchemaType<UnknownJoinInfo>

export const validateUnknownJoinInfo = createSchemaValidator<UnknownJoinInfo>(UnknownJoinInfoJsonSchema)

export default {
    uri: "$innerType/UnknownJoinInfo",
    schema: UnknownJoinInfoJsonSchema,
    validate: validateUnknownJoinInfo,
}
