import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ForeignKeyJsonSchema: JSONSchemaType<ForeignKey> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "referencedTableName": {
            "type": "string"
        },
        "referencedTableSchema": {
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
        "onUpdate": {
            "type": "string"
        },
        "onDelete": {
            "type": "string"
        }
    },
    "required": [
        "columnRefs",
        "name",
        "referencedTableName",
        "referencedTableSchema"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ForeignKey>

export const validateForeignKey = createSchemaValidator<ForeignKey>(ForeignKeyJsonSchema)

export default {
    uri: "$innerType/ForeignKey",
    schema: ForeignKeyJsonSchema,
    validate: validateForeignKey,
}
