import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ModelViewportJsonSchema: JSONSchemaType<ModelViewport> = {
    "type": "object",
    "properties": {
        "x": {
            "type": "number"
        },
        "y": {
            "type": "number"
        },
        "zoom": {
            "type": "number"
        }
    },
    "required": [
        "x",
        "y",
        "zoom"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ModelViewport>

export const validateModelViewport = createSchemaValidator<ModelViewport>(ModelViewportJsonSchema)

export default {
    uri: "$innerType/ModelViewport",
    schema: ModelViewportJsonSchema,
    validate: validateModelViewport,
}
