import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const BackEndMappingSourceJsonSchema: JSONSchemaType<BackEndMappingSource> = {
    "enum": [
        "BOTH",
        "JAVA",
        "KOTLIN"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<BackEndMappingSource>

export const validateBackEndMappingSource = createSchemaValidator<BackEndMappingSource>(BackEndMappingSourceJsonSchema)

export default {
    uri: "$innerType/BackEndMappingSource",
    schema: BackEndMappingSourceJsonSchema,
    validate: validateBackEndMappingSource,
}
