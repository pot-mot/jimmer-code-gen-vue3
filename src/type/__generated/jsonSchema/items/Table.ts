import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TableJsonSchema: JSONSchemaType<Table> = {
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
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Table>

export const validateTable = createSchemaValidator<Table>(TableJsonSchema)

export default {
    uri: "$innerType/Table",
    schema: TableJsonSchema,
    validate: validateTable,
}
