import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const MidTableInfoJsonSchema: JSONSchemaType<MidTableInfo> = {
    "type": "object",
    "properties": {
        "tableName": {
            "type": "string"
        },
        "tableComment": {
            "type": "string"
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
        "tableComment",
        "tableName"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<MidTableInfo>

export const validateMidTableInfo = createSchemaValidator<MidTableInfo>(MidTableInfoJsonSchema)

export default {
    uri: "$innerType/MidTableInfo",
    schema: MidTableInfoJsonSchema,
    validate: validateMidTableInfo,
}
