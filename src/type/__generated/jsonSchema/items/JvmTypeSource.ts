import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JvmTypeSourceJsonSchema: JSONSchemaType<JvmTypeSource> = {
    "enum": [
        "BOTH",
        "JAVA",
        "KOTLIN"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<JvmTypeSource>

export const validateJvmTypeSource = createSchemaValidator<JvmTypeSource>(JvmTypeSourceJsonSchema)

export default {
    uri: "$innerType/JvmTypeSource",
    schema: JvmTypeSourceJsonSchema,
    validate: validateJvmTypeSource,
}
