import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const BackEndTypeJsonSchema: JSONSchemaType<BackEndType> = {
    "type": "object",
    "properties": {
        "fullTypeExpression": {
            "type": "string"
        },
        "extraImports": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "required": [
        "extraImports",
        "fullTypeExpression"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<BackEndType>

export const validateBackEndType = createSchemaValidator<BackEndType>(BackEndTypeJsonSchema)

export default {
    uri: "$innerType/BackEndType",
    schema: BackEndTypeJsonSchema,
    validate: validateBackEndType,
}
