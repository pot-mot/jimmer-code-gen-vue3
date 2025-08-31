import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TableJsonSchema: JSONSchemaType<Table> = {
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
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateTable = createSchemaValidator<Table>(TableJsonSchema)

export default {
    uri: "$innerType/Table",
    schema: TableJsonSchema,
    validate: validateTable,
}
