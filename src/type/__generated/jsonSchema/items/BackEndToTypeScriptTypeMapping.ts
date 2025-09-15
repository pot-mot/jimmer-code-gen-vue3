import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const BackEndToTypeScriptTypeMappingJsonSchema: JSONSchemaType<BackEndToTypeScriptTypeMapping> = {
    "type": "object",
    "properties": {
        "source": {
            "$ref": "#/definitions/BackEndMappingSource"
        },
        "typeRegExp": {
            "type": "string"
        },
        "tsTypeResult": {
            "type": "object",
            "properties": {
                "rawType": {
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
                "rawType"
            ]
        }
    },
    "required": [
        "source",
        "tsTypeResult",
        "typeRegExp"
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
} as any as JSONSchemaType<BackEndToTypeScriptTypeMapping>

export const validateBackEndToTypeScriptTypeMapping = createSchemaValidator<BackEndToTypeScriptTypeMapping>(BackEndToTypeScriptTypeMappingJsonSchema)

export default {
    uri: "$innerType/BackEndToTypeScriptTypeMapping",
    schema: BackEndToTypeScriptTypeMappingJsonSchema,
    validate: validateBackEndToTypeScriptTypeMapping,
}
