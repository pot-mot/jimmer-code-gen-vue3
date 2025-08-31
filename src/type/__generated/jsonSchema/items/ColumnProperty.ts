import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ColumnPropertyJsonSchema: JSONSchemaType<ColumnProperty> = {
    "type": "object",
    "properties": {
        "columnInfo": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "comment": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "dataSize": {
                    "type": "number"
                },
                "numericPrecision": {
                    "type": "number"
                },
                "nullable": {
                    "type": "boolean"
                },
                "defaultValue": {
                    "type": "string"
                },
                "partOfPrimaryKey": {
                    "type": "boolean"
                },
                "autoIncrement": {
                    "type": "boolean"
                },
                "otherConstraints": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "comment",
                "defaultValue",
                "name",
                "nullable",
                "partOfPrimaryKey",
                "type"
            ]
        }
    },
    "required": [
        "columnInfo"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateColumnProperty = createSchemaValidator<ColumnProperty>(ColumnPropertyJsonSchema)

export default {
    uri: "$innerType/ColumnProperty",
    schema: ColumnPropertyJsonSchema,
    validate: validateColumnProperty,
}
