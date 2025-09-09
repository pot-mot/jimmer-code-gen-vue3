import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const SqlFormulaPropertyJsonSchema: JSONSchemaType<SqlFormulaProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "FORMULA_SQL"
                },
                "sql": {
                    "type": "string"
                },
                "rawType": {
                    "type": "string"
                },
                "defaultOrderDirection": {
                    "enum": [
                        "ASC",
                        "DESC"
                    ],
                    "type": "string"
                }
            },
            "required": [
                "category",
                "rawType",
                "sql"
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
} as any as JSONSchemaType<SqlFormulaProperty>

export const validateSqlFormulaProperty = createSchemaValidator<SqlFormulaProperty>(SqlFormulaPropertyJsonSchema)

export default {
    uri: "$innerType/SqlFormulaProperty",
    schema: SqlFormulaPropertyJsonSchema,
    validate: validateSqlFormulaProperty,
}
