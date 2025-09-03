import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const BackEndLanguageJsonSchema: JSONSchemaType<BackEndLanguage> = {
    "enum": [
        "JAVA",
        "KOTLIN"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<BackEndLanguage>

export const validateBackEndLanguage = createSchemaValidator<BackEndLanguage>(BackEndLanguageJsonSchema)

export default {
    uri: "$innerType/BackEndLanguage",
    schema: BackEndLanguageJsonSchema,
    validate: validateBackEndLanguage,
}
