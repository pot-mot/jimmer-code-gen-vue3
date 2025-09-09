import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const GetterFormulaPropertyJsonSchema: JSONSchemaType<GetterFormulaProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "FORMULA_GETTER"
                },
                "dependencies": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "body": {
                    "type": "string"
                },
                "rawType": {
                    "type": "string"
                }
            },
            "required": [
                "body",
                "category",
                "dependencies",
                "rawType"
            ]
        },
        {
            "type": "object",
            "properties": {
                "id": {
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
                "nullable": {
                    "type": "boolean"
                }
            },
            "required": [
                "comment",
                "extraAnnotations",
                "extraImports",
                "id",
                "name",
                "nullable"
            ]
        }
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<GetterFormulaProperty>

export const validateGetterFormulaProperty = createSchemaValidator<GetterFormulaProperty>(GetterFormulaPropertyJsonSchema)

export default {
    uri: "$innerType/GetterFormulaProperty",
    schema: GetterFormulaPropertyJsonSchema,
    validate: validateGetterFormulaProperty,
}
