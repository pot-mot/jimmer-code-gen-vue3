import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const MyTypeJsonSchema: JSONSchemaType<MyType> = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        }
    },
    "required": [
        "name"
    ]
}

export const validateMyType = createSchemaValidator<MyType>(MyTypeJsonSchema)

export default {
    uri: "$innerType/MyType",
    schema: MyTypeJsonSchema,
}