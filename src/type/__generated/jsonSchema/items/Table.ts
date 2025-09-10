import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TableJsonSchema: JSONSchemaType<Table> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
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
                    "isUnique": {
                        "type": "boolean"
                    },
                    "wherePredicates": {
                        "type": "string"
                    }
                },
                "required": [
                    "columnNames",
                    "isUnique",
                    "name"
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
                    "targetTableName": {
                        "type": "string"
                    },
                    "columnReferences": {
                        "type": "array",
                        "items": [
                            {
                                "type": "object",
                                "properties": {
                                    "sourceColumnName": {
                                        "type": "string"
                                    },
                                    "targetColumnName": {
                                        "type": "string"
                                    }
                                },
                                "required": [
                                    "sourceColumnName",
                                    "targetColumnName"
                                ]
                            }
                        ],
                        "minItems": 1,
                        "maxItems": 1
                    },
                    "onUpdate": {
                        "type": "string"
                    },
                    "onDelete": {
                        "type": "string"
                    }
                },
                "required": [
                    "columnReferences",
                    "name",
                    "targetTableName"
                ]
            }
        }
    },
    "required": [
        "columns",
        "comment",
        "foreignKeys",
        "id",
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
