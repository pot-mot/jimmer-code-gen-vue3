import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EmbeddablePropertyJsonSchema: JSONSchemaType<EmbeddableProperty> = {
    "type": "object",
    "properties": {
        "embeddableTypeId": {
            "type": "string"
        },
        "propOverrides": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "propertyPath": {
                        "type": "string"
                    },
                    "overrideColumnName": {
                        "type": "string"
                    }
                },
                "required": [
                    "overrideColumnName",
                    "propertyPath"
                ]
            }
        }
    },
    "required": [
        "embeddableTypeId",
        "propOverrides"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<EmbeddableProperty>

export const validateEmbeddableProperty = createSchemaValidator<EmbeddableProperty>(EmbeddablePropertyJsonSchema)

export default {
    uri: "$innerType/EmbeddableProperty",
    schema: EmbeddablePropertyJsonSchema,
    validate: validateEmbeddableProperty,
}
