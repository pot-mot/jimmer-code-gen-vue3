import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JvmTypeJsonSchema: JSONSchemaType<JvmType> = {
    "type": "object",
    "properties": {
        "typeExpression": {
            "type": "string"
        },
        "serialized": {
            "type": "boolean"
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
        }
    },
    "required": [
        "extraAnnotations",
        "extraImports",
        "typeExpression",
        "serialized"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<JvmType>

export const validateJvmType = createSchemaValidator<JvmType>(JvmTypeJsonSchema)

export default {
    uri: "$innerType/JvmType",
    schema: JvmTypeJsonSchema,
    validate: validateJvmType,
}
