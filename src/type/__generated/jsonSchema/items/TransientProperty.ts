import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TransientPropertyJsonSchema: JSONSchemaType<TransientProperty> = {
    "anyOf": [
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "TRANSIENT"
                        },
                        "resolver": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "comment": {
                            "type": "string"
                        },
                        "extraImports": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "extraAnnotations": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "nullable": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "comment",
                        "extraAnnotations",
                        "extraImports",
                        "id",
                        "name",
                        "nullable"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "entityId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "entityId"
                    ]
                }
            ]
        },
        {
            "allOf": [
                {
                    "type": "object",
                    "properties": {
                        "category": {
                            "type": "string",
                            "const": "TRANSIENT"
                        },
                        "resolver": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "category"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "comment": {
                            "type": "string"
                        },
                        "extraImports": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "extraAnnotations": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "nullable": {
                            "type": "boolean"
                        }
                    },
                    "required": [
                        "comment",
                        "extraAnnotations",
                        "extraImports",
                        "id",
                        "name",
                        "nullable"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "rawType": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "rawType"
                    ]
                }
            ]
        }
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<TransientProperty>

export const validateTransientProperty = createSchemaValidator<TransientProperty>(TransientPropertyJsonSchema)

export default {
    uri: "$innerType/TransientProperty",
    schema: TransientPropertyJsonSchema,
    validate: validateTransientProperty,
}
