import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JoinTableJsonSchema: JSONSchemaType<JoinTable> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "joinColumns": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "referencedColumnName": {
                        "type": "string"
                    },
                    "foreignKeyType": {
                        "$ref": "#/definitions/ForeignKeyType"
                    }
                },
                "required": [
                    "foreignKeyType",
                    "name",
                    "referencedColumnName"
                ]
            }
        },
        "readonly": {
            "type": "boolean"
        },
        "preventDeletionBySource": {
            "type": "boolean"
        },
        "preventDeletionByTarget": {
            "type": "boolean"
        },
        "cascadeDeletedBySource": {
            "type": "boolean"
        },
        "cascadeDeletedByTarget": {
            "type": "boolean"
        },
        "deletedWhenEndpointIsLogicallyDeleted": {
            "type": "boolean"
        },
        "filter": {
            "type": "object",
            "properties": {
                "columnName": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "value": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "columnName",
                "type",
                "value"
            ]
        },
        "logicalDeleteFilter": {
            "type": "object",
            "properties": {
                "columnName": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "nullable": {
                    "type": "boolean"
                },
                "value": {
                    "type": "string"
                },
                "generatorType": {
                    "type": "string"
                },
                "generatorRef": {
                    "type": "string"
                },
                "initializedValue": {
                    "type": "string"
                }
            },
            "required": [
                "columnName",
                "generatorRef",
                "generatorType",
                "initializedValue",
                "nullable",
                "type",
                "value"
            ]
        }
    },
    "required": [
        "joinColumns",
        "name"
    ],
    "definitions": {
        "ForeignKeyType": {
            "enum": [
                "AUTO",
                "FAKE",
                "REAL"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<JoinTable>

export const validateJoinTable = createSchemaValidator<JoinTable>(JoinTableJsonSchema)

export default {
    uri: "$innerType/JoinTable",
    schema: JoinTableJsonSchema,
    validate: validateJoinTable,
}
