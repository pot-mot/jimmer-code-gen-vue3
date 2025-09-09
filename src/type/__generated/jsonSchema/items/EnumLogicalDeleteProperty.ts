import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EnumLogicalDeletePropertyJsonSchema: JSONSchemaType<EnumLogicalDeleteProperty> = {
    "type": "object",
    "properties": {
        "logicalDelete": {
            "type": "boolean",
            "const": true
        },
        "logicalDeleteType": {
            "type": "string",
            "const": "enum"
        },
        "logicalDeleteDefaultValue": {
            "type": "string"
        },
        "logicalDeleteDeletedValue": {
            "type": "string"
        }
    },
    "required": [
        "logicalDelete",
        "logicalDeleteDefaultValue",
        "logicalDeleteDeletedValue",
        "logicalDeleteType"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<EnumLogicalDeleteProperty>

export const validateEnumLogicalDeleteProperty = createSchemaValidator<EnumLogicalDeleteProperty>(EnumLogicalDeletePropertyJsonSchema)

export default {
    uri: "$innerType/EnumLogicalDeleteProperty",
    schema: EnumLogicalDeletePropertyJsonSchema,
    validate: validateEnumLogicalDeleteProperty,
}
