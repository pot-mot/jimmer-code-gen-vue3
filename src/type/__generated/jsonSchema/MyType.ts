import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const MyTypeJsonSchema: JSONSchemaType<MyType> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "value": {
            "type": "number"
        },
        "children": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "value": {
                        "type": "number"
                    }
                },
                "required": [
                    "name",
                    "value"
                ]
            }
        }
    },
    "required": [
        "children",
        "name",
        "value"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateMyType = createSchemaValidator<MyType>(MyTypeJsonSchema)

export default {
    uri: "$innerType/MyType",
    schema: MyTypeJsonSchema,
    validate: validateMyType,
}
