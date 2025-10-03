import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ColumnRefJsonSchema: JSONSchemaType<ColumnRef> = {
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
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ColumnRef>

export const validateColumnRef = createSchemaValidator<ColumnRef>(ColumnRefJsonSchema)

export default {
    uri: "$innerType/ColumnRef",
    schema: ColumnRefJsonSchema,
    validate: validateColumnRef,
}
