import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TypeSelectPairJsonSchema: JSONSchemaType<TypeSelectPair> = {
    "type": "object",
    "properties": {
        "source": {
            "$ref": "#/definitions/BackEndMappingSource"
        },
        "sqlType": {
            "type": "object",
            "properties": {
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
                }
            },
            "required": [
                "nullable",
                "type"
            ]
        },
        "backEndType": {
            "type": "object",
            "properties": {
                "rawType": {
                    "type": "string"
                },
                "extraImports": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "extraImports",
                "rawType"
            ]
        }
    },
    "required": [
        "backEndType",
        "source",
        "sqlType"
    ],
    "definitions": {
        "BackEndMappingSource": {
            "enum": [
                "BOTH",
                "JAVA",
                "KOTLIN"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<TypeSelectPair>

export const validateTypeSelectPair = createSchemaValidator<TypeSelectPair>(TypeSelectPairJsonSchema)

export default {
    uri: "$innerType/TypeSelectPair",
    schema: TypeSelectPairJsonSchema,
    validate: validateTypeSelectPair,
}
