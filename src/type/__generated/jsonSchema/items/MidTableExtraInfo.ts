import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const MidTableExtraInfoJsonSchema: JSONSchemaType<MidTableExtraInfo> = {
    "type": "object",
    "properties": {
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
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<MidTableExtraInfo>

export const validateMidTableExtraInfo = createSchemaValidator<MidTableExtraInfo>(MidTableExtraInfoJsonSchema)

export default {
    uri: "$innerType/MidTableExtraInfo",
    schema: MidTableExtraInfoJsonSchema,
    validate: validateMidTableExtraInfo,
}
