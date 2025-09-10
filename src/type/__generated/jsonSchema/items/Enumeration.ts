import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EnumerationJsonSchema: JSONSchemaType<Enumeration> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "groupId": {
            "type": "string"
        },
        "subPackagePath": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "comment": {
            "type": "string"
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
        },
        "strategy": {
            "$ref": "#/definitions/EnumerationStrategy"
        },
        "items": {
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
                    "ordinal": {
                        "type": "number"
                    },
                    "comment": {
                        "type": "string"
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
                    "comment",
                    "extraAnnotations",
                    "extraImports",
                    "id",
                    "name",
                    "ordinal"
                ]
            }
        }
    },
    "required": [
        "comment",
        "extraAnnotations",
        "extraImports",
        "groupId",
        "id",
        "items",
        "name",
        "strategy",
        "subPackagePath"
    ],
    "definitions": {
        "EnumerationStrategy": {
            "enum": [
                "DEFAULT",
                "NAME",
                "ORDINAL"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Enumeration>

export const validateEnumeration = createSchemaValidator<Enumeration>(EnumerationJsonSchema)

export default {
    uri: "$innerType/Enumeration",
    schema: EnumerationJsonSchema,
    validate: validateEnumeration,
}
