import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EmbeddablePropertyJsonSchema: JSONSchemaType<EmbeddableProperty> = {
    "type": "object",
    "properties": {
        "embeddableTypeName": {
            "type": "string"
        },
        "propOverrides": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "propertyName": {
                        "type": "string"
                    },
                    "overrideColumnName": {
                        "type": "string"
                    }
                },
                "required": [
                    "overrideColumnName",
                    "propertyName"
                ]
            }
        }
    },
    "required": [
        "embeddableTypeName",
        "propOverrides"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateEmbeddableProperty = createSchemaValidator<EmbeddableProperty>(EmbeddablePropertyJsonSchema)

export default {
    uri: "$innerType/EmbeddableProperty",
    schema: EmbeddablePropertyJsonSchema,
    validate: validateEmbeddableProperty,
}
