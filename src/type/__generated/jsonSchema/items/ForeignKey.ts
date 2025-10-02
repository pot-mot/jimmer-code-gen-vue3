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
        "columnReferences": {
            "type": "array",
            "items": [
                {
                    "type": "object",
                    "properties": {
                        "sourceColumnName": {
                            "type": "string"
                        },
                        "referencedColumnName": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "referencedColumnName",
                        "sourceColumnName"
                    ]
                }
            ],
            "minItems": 1,
            "maxItems": 1
        },
        "onUpdate": {
            "type": "string"
        },
        "onDelete": {
            "type": "string"
        }
    },
    "required": [
        "columnReferences",
        "name",
        "referencedTableName"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ForeignKey>

export const validateForeignKey = createSchemaValidator<ForeignKey>(ForeignKeyJsonSchema)

export default {
    uri: "$innerType/ForeignKey",
    schema: ForeignKeyJsonSchema,
    validate: validateForeignKey,
}
