import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ColumnInfoJsonSchema: JSONSchemaType<ColumnInfo> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "type": {
            "type": "string"
        },
        "nullable": {
            "type": "boolean"
        },
        "comment": {
            "type": "string"
        },
        "dataSize": {
            "type": "number"
        },
        "numericPrecision": {
            "type": "number"
        },
        "defaultValue": {
            "type": "string"
        }
    },
    "required": [
        "comment",
        "name",
        "nullable",
        "type"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ColumnInfo>

export const validateColumnInfo = createSchemaValidator<ColumnInfo>(ColumnInfoJsonSchema)

export default {
    uri: "$innerType/ColumnInfo",
    schema: ColumnInfoJsonSchema,
    validate: validateColumnInfo,
}
