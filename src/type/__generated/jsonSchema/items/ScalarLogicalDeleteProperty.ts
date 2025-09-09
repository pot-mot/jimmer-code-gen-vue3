import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ScalarLogicalDeletePropertyJsonSchema: JSONSchemaType<ScalarLogicalDeleteProperty> = {
    "anyOf": [
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "boolean"
                        },
                        "logicalDeleteDefaultValue": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "logicalDeleteDefaultValue",
                        "logicalDeleteType"
                    ]
                }
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "int"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
                    ]
                }
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "long"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
                    ]
                }
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "logicalDeleteType": {
                            "type": "string",
                            "const": "uuid"
                        }
                    },
                    "required": [
                        "logicalDeleteType"
                    ]
                }
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "logicalDelete": {
                            "type": "boolean",
                            "const": true
                        }
                    },
                    "required": [
                        "logicalDelete"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
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
                        "logicalDeleteDeletedValue",
                        "logicalDeleteType",
                        "nullable"
                    ]
                }
            ]
        }
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ScalarLogicalDeleteProperty>

export const validateScalarLogicalDeleteProperty = createSchemaValidator<ScalarLogicalDeleteProperty>(ScalarLogicalDeletePropertyJsonSchema)

export default {
    uri: "$innerType/ScalarLogicalDeleteProperty",
    schema: ScalarLogicalDeletePropertyJsonSchema,
    validate: validateScalarLogicalDeleteProperty,
}
