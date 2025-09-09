import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EmbeddableTypeJsonSchema: JSONSchemaType<EmbeddableType> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "groupId": {
            "type": "string"
        },
        "subPackagePath": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "comment": {
            "type": "string"
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
        "comment",
        "extraAnnotations",
        "extraImports",
        "groupId",
        "id",
        "name",
        "subPackagePath"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<EmbeddableType>

export const validateEmbeddableType = createSchemaValidator<EmbeddableType>(EmbeddableTypeJsonSchema)

export default {
    uri: "$innerType/EmbeddableType",
    schema: EmbeddableTypeJsonSchema,
    validate: validateEmbeddableType,
}
