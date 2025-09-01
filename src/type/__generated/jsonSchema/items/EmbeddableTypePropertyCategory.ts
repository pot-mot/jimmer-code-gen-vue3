import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EmbeddableTypePropertyCategoryJsonSchema: JSONSchemaType<EmbeddableTypePropertyCategory> = {
    "enum": [
        "enum",
        "scalar"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<EmbeddableTypePropertyCategory>

export const validateEmbeddableTypePropertyCategory = createSchemaValidator<EmbeddableTypePropertyCategory>(EmbeddableTypePropertyCategoryJsonSchema)

export default {
    uri: "$innerType/EmbeddableTypePropertyCategory",
    schema: EmbeddableTypePropertyCategoryJsonSchema,
    validate: validateEmbeddableTypePropertyCategory,
}
