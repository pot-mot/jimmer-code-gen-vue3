import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ColumnNameOverrideJsonSchema: JSONSchemaType<ColumnNameOverride> = {
    "type": "object",
    "properties": {
        "propertyPath": {
            "type": "string"
        },
        "overrideColumnName": {
            "type": "string"
        }
    },
    "required": [
        "overrideColumnName",
        "propertyPath"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ColumnNameOverride>

export const validateColumnNameOverride = createSchemaValidator<ColumnNameOverride>(ColumnNameOverrideJsonSchema)

export default {
    uri: "$innerType/ColumnNameOverride",
    schema: ColumnNameOverrideJsonSchema,
    validate: validateColumnNameOverride,
}
