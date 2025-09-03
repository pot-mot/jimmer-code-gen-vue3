import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JoinColumnJsonSchema: JSONSchemaType<JoinColumn> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "referencedColumnName": {
            "type": "string"
        },
        "foreignKeyType": {
            "$ref": "#/definitions/ForeignKeyType"
        }
    },
    "required": [
        "foreignKeyType",
        "name",
        "referencedColumnName"
    ],
    "definitions": {
        "ForeignKeyType": {
            "enum": [
                "AUTO",
                "FAKE",
                "REAL"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<JoinColumn>

export const validateJoinColumn = createSchemaValidator<JoinColumn>(JoinColumnJsonSchema)

export default {
    uri: "$innerType/JoinColumn",
    schema: JoinColumnJsonSchema,
    validate: validateJoinColumn,
}
