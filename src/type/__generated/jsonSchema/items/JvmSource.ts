import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JvmSourceJsonSchema: JSONSchemaType<JvmSource> = {
    "enum": [
        "BOTH",
        "JAVA",
        "KOTLIN"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<JvmSource>

export const validateJvmSource = createSchemaValidator<JvmSource>(JvmSourceJsonSchema)

export default {
    uri: "$innerType/JvmSource",
    schema: JvmSourceJsonSchema,
    validate: validateJvmSource,
}
