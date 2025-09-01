import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const SchemaJsonSchema: JSONSchemaType<Schema> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "tables": {
            "type": "array",
            "items": {
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
                    "columns": {
                        "type": "array",
                        "items": {
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
                                "type": {
                                    "type": "string"
                                },
                                "dataSize": {
                                    "type": "integer"
                                },
                                "numericPrecision": {
                                    "type": "integer"
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
                                "id",
                                "name",
                                "nullable",
                                "partOfPrimaryKey",
                                "type"
                            ]
                        }
                    },
                    "indexes": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string"
                                },
                                "name": {
                                    "type": "string"
                                },
                                "columnIds": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                "isUnique": {
                                    "type": "boolean"
                                }
                            },
                            "required": [
                                "columnIds",
                                "id",
                                "isUnique",
                                "name"
                            ]
                        }
                    }
                },
                "required": [
                    "columns",
                    "comment",
                    "id",
                    "indexes",
                    "name"
                ]
            }
        }
    },
    "required": [
        "id",
        "name",
        "tables"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Schema>

export const validateSchema = createSchemaValidator<Schema>(SchemaJsonSchema)

export default {
    uri: "$innerType/Schema",
    schema: SchemaJsonSchema,
    validate: validateSchema,
}
