import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const CrossTypeJsonSchema: JSONSchemaType<CrossType> = {
    "type": "object",
    "properties": {
        "jvmSource": {
            "$ref": "#/definitions/JvmSource"
        },
        "databaseSource": {
            "$ref": "#/definitions/DatabaseSource"
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
                "defaultValue": {
                    "type": "string"
                }
            },
            "required": [
                "type"
            ]
        },
        "jvmType": {
            "type": "object",
            "properties": {
                "typeExpression": {
                    "type": "string"
                },
                "serialized": {
                    "type": "boolean"
                },
                "extraImports": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "extraAnnotations": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "extraAnnotations",
                "extraImports",
                "serialized",
                "typeExpression"
            ]
        },
        "tsType": {
            "type": "object",
            "properties": {
                "typeExpression": {
                    "type": "string"
                },
                "extraImports": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "fromPath": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "fromPath",
                            "name"
                        ]
                    }
                }
            },
            "required": [
                "extraImports",
                "typeExpression"
            ]
        }
    },
    "required": [
        "databaseSource",
        "jvmSource",
        "jvmType",
        "sqlType",
        "tsType"
    ],
    "definitions": {
        "JvmSource": {
            "enum": [
                "ANY",
                "JAVA",
                "KOTLIN"
            ],
            "type": "string"
        },
        "DatabaseSource": {
            "enum": [
                "ANY",
                "H2",
                "MYSQL",
                "ORACLE",
                "POSTGRESQL",
                "SQLITE",
                "SQLSERVER"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<CrossType>

export const validateCrossType = createSchemaValidator<CrossType>(CrossTypeJsonSchema)

export default {
    uri: "$innerType/CrossType",
    schema: CrossTypeJsonSchema,
    validate: validateCrossType,
}
