import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const LogicalDeletePropertyJsonSchema: JSONSchemaType<LogicalDeleteProperty> = {
    "type": "object",
    "properties": {
        "logicalDelete": {
            "type": "boolean",
            "const": true
        }
    },
    "required": [
        "logicalDelete"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<LogicalDeleteProperty>

export const validateLogicalDeleteProperty = createSchemaValidator<LogicalDeleteProperty>(LogicalDeletePropertyJsonSchema)

export default {
    uri: "$innerType/LogicalDeleteProperty",
    schema: LogicalDeletePropertyJsonSchema,
    validate: validateLogicalDeleteProperty,
}
