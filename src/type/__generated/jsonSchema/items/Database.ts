import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const DatabaseJsonSchema: JSONSchemaType<Database> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "url": {
            "type": "string"
        },
        "username": {
            "type": "string"
        },
        "password": {
            "type": "string"
        },
        "schemas": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "tables": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
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
                                            "name": {
                                                "type": "string"
                                            },
                                            "comment": {
                                                "type": "string"
                                            },
                                            "type": {
                                                "type": "string"
                                            },
                                            "isNullable": {
                                                "type": "boolean"
                                            },
                                            "defaultValue": {
                                                "type": "string"
                                            },
                                            "partOfPrimaryKey": {
                                                "type": "boolean"
                                            }
                                        },
                                        "required": [
                                            "comment",
                                            "defaultValue",
                                            "isNullable",
                                            "name",
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
                                            "name": {
                                                "type": "string"
                                            },
                                            "columnNames": {
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
                                            "columnNames",
                                            "isUnique",
                                            "name"
                                        ]
                                    }
                                }
                            },
                            "required": [
                                "columns",
                                "comment",
                                "indexes",
                                "name"
                            ]
                        }
                    }
                },
                "required": [
                    "name",
                    "tables"
                ]
            }
        }
    },
    "required": [
        "name",
        "password",
        "schemas",
        "url",
        "username"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateDatabase = createSchemaValidator<Database>(DatabaseJsonSchema)

export default {
    uri: "$innerType/Database",
    schema: DatabaseJsonSchema,
    validate: validateDatabase,
}
