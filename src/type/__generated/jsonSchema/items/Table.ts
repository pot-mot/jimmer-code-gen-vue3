import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TableJsonSchema: JSONSchemaType<Table> = {
    "type": "object",
    "properties": {
        "schema": {
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
                    "name",
                    "nullable",
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
                    "uniqueIndex": {
                        "type": "boolean"
                    },
                    "wherePredicates": {
                        "type": "string"
                    }
                },
                "required": [
                    "columnNames",
                    "name",
                    "uniqueIndex"
                ]
            }
        },
        "foreignKeys": {
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
                    "referencedTableName": {
                        "type": "string"
                    },
                    "referencedTableSchema": {
                        "type": "string"
                    },
                    "columnRefs": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "columnName": {
                                    "type": "string"
                                },
                                "referencedColumnName": {
                                    "type": "string"
                                }
                            },
                            "required": [
                                "columnName",
                                "referencedColumnName"
                            ]
                        }
                    },
                    "onUpdate": {
                        "type": "string"
                    },
                    "onDelete": {
                        "type": "string"
                    }
                },
                "required": [
                    "columnRefs",
                    "comment",
                    "name",
                    "referencedTableName",
                    "referencedTableSchema"
                ]
            }
        }
    },
    "required": [
        "columns",
        "comment",
        "foreignKeys",
        "indexes",
        "name",
        "schema"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Table>

export const validateTable = createSchemaValidator<Table>(TableJsonSchema)

export default {
    uri: "$innerType/Table",
    schema: TableJsonSchema,
    validate: validateTable,
}
