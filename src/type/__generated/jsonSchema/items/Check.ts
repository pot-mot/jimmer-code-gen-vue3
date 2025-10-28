import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const CheckJsonSchema: JSONSchemaType<Check> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "expression": {
            "type": "string"
        }
    },
    "required": [
        "expression",
        "name"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Check>

export const validateCheck = createSchemaValidator<Check>(CheckJsonSchema)

export default {
    uri: "$innerType/Check",
    schema: CheckJsonSchema,
    validate: validateCheck,
}
