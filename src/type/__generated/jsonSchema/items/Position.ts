import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const PositionJsonSchema: JSONSchemaType<Position> = {
    "type": "object",
    "properties": {
        "x": {
            "type": "number"
        },
        "y": {
            "type": "number"
        }
    },
    "required": [
        "x",
        "y"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Position>

export const validatePosition = createSchemaValidator<Position>(PositionJsonSchema)

export default {
    uri: "$innerType/Position",
    schema: PositionJsonSchema,
    validate: validatePosition,
}
