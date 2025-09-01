import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const OptionalLogicalDeletePropertyJsonSchema: JSONSchemaType<OptionalLogicalDeleteProperty> = {
    "anyOf": [
        {
            "type": "object",
            "properties": {
                "logicalDelete": {
                    "type": "boolean",
                    "const": true
                },
                "logicalDeleteType": {
                    "type": "string",
                    "const": "boolean"
                },
                "logicalDeleteDefaultValue": {
                    "enum": [
                        "false",
                        "true"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "logicalDelete",
                "logicalDeleteDefaultValue",
                "logicalDeleteType"
            ]
        },
        {
            "type": "object",
            "properties": {
                "logicalDelete": {
                    "type": "boolean",
                    "const": true
                },
                "logicalDeleteType": {
                    "type": "string",
                    "const": "int"
                }
            },
            "required": [
                "logicalDelete",
                "logicalDeleteType"
            ]
        },
        {
            "type": "object",
            "properties": {
                "logicalDelete": {
                    "type": "boolean",
                    "const": true
                },
                "logicalDeleteType": {
                    "type": "string",
                    "const": "long"
                }
            },
            "required": [
                "logicalDelete",
                "logicalDeleteType"
            ]
        },
        {
            "type": "object",
            "properties": {
                "logicalDelete": {
                    "type": "boolean",
                    "const": true
                },
                "logicalDeleteType": {
                    "type": "string",
                    "const": "uuid"
                }
            },
            "required": [
                "logicalDelete",
                "logicalDeleteType"
            ]
        },
        {
            "type": "object",
            "properties": {
                "logicalDelete": {
                    "type": "boolean",
                    "const": true
                },
                "logicalDeleteType": {
                    "type": "string",
                    "const": "time"
                },
                "logicalDeleteDeletedValue": {
                    "enum": [
                        "now",
                        "null"
                    ],
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean",
                    "const": true
                }
            },
            "required": [
                "logicalDelete",
                "logicalDeleteDeletedValue",
                "logicalDeleteType",
                "nullable"
            ]
        },
        {
            "type": "object",
            "properties": {
                "logicalDelete": {
                    "type": "boolean",
                    "const": true
                },
                "logicalDeleteType": {
                    "type": "string",
                    "const": "enum"
                },
                "logicalDeleteDefaultValue": {
                    "type": "string"
                },
                "logicalDeleteDeletedValue": {
                    "type": "string"
                }
            },
            "required": [
                "logicalDelete",
                "logicalDeleteDefaultValue",
                "logicalDeleteDeletedValue",
                "logicalDeleteType"
            ]
        },
        {
            "type": "object",
            "properties": {
                "logicalDelete": {
                    "type": "boolean",
                    "const": false
                }
            },
            "required": [
                "logicalDelete"
            ]
        }
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<OptionalLogicalDeleteProperty>

export const validateOptionalLogicalDeleteProperty = createSchemaValidator<OptionalLogicalDeleteProperty>(OptionalLogicalDeletePropertyJsonSchema)

export default {
    uri: "$innerType/OptionalLogicalDeleteProperty",
    schema: OptionalLogicalDeletePropertyJsonSchema,
    validate: validateOptionalLogicalDeleteProperty,
}
