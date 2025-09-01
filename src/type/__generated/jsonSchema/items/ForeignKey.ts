import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ForeignKeyJsonSchema: JSONSchemaType<ForeignKey> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "sourceTableId": {
            "type": "string"
        },
        "targetTableId": {
            "type": "string"
        },
        "columnReferences": {
            "type": "array",
            "items": [
                {
                    "type": "object",
                    "properties": {
                        "sourceColumnId": {
                            "type": "string"
                        },
                        "targetColumnId": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "sourceColumnId",
                        "targetColumnId"
                    ]
                }
            ],
            "minItems": 1,
            "maxItems": 1
        }
    },
    "required": [
        "columnReferences",
        "id",
        "name",
        "sourceTableId",
        "targetTableId"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ForeignKey>

export const validateForeignKey = createSchemaValidator<ForeignKey>(ForeignKeyJsonSchema)

export default {
    uri: "$innerType/ForeignKey",
    schema: ForeignKeyJsonSchema,
    validate: validateForeignKey,
}
