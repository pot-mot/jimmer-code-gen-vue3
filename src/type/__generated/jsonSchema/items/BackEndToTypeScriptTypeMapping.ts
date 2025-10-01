import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const BackEndToTypeScriptTypeMappingJsonSchema: JSONSchemaType<BackEndToTypeScriptTypeMapping> = {
    "type": "object",
    "properties": {
        "source": {
            "$ref": "#/definitions/BackEndMappingSource"
        },
        "matchRegExp": {
            "type": "string"
        },
        "result": {
            "type": "object",
            "properties": {
                "fullTypeExpression": {
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
                "fullTypeExpression"
            ]
        }
    },
    "required": [
        "matchRegExp",
        "result",
        "source"
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
