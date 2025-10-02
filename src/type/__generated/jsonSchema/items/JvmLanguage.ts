import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const JvmLanguageJsonSchema: JSONSchemaType<JvmLanguage> = {
    "enum": [
        "JAVA",
        "KOTLIN"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<JvmLanguage>

export const validateJvmLanguage = createSchemaValidator<JvmLanguage>(JvmLanguageJsonSchema)

export default {
    uri: "$innerType/JvmLanguage",
    schema: JvmLanguageJsonSchema,
    validate: validateJvmLanguage,
}
