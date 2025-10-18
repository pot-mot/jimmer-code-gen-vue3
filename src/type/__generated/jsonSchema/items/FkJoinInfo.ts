import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const FkJoinInfoJsonSchema: JSONSchemaType<FkJoinInfo> = {
    "anyOf": [
        {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "const": "SingleColumn"
                },
                "columnName": {
                    "type": "string"
                },
                "foreignKeyType": {
                    "$ref": "#/definitions/ForeignKeyType"
                }
            },
            "required": [
                "columnName",
                "foreignKeyType",
                "type"
            ]
        },
        {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "const": "MultiColumn"
                },
                "embeddableTypeId": {
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
                "foreignKeyType": {
                    "$ref": "#/definitions/ForeignKeyType"
                }
            },
            "required": [
                "columnRefs",
                "embeddableTypeId",
                "foreignKeyType",
                "type"
            ]
        }
    ],
    "definitions": {
        "ForeignKeyType": {
            "enum": [
                "FAKE",
                "REAL"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<FkJoinInfo>

export const validateFkJoinInfo = createSchemaValidator<FkJoinInfo>(FkJoinInfoJsonSchema)

export default {
    uri: "$innerType/FkJoinInfo",
    schema: FkJoinInfoJsonSchema,
    validate: validateFkJoinInfo,
}
