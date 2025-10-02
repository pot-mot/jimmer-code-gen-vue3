import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TsTypeJsonSchema: JSONSchemaType<TsType> = {
    "type": "object",
    "properties": {
        "fullTypeExpression": {
            "type": "string"
        },
        "extraImports": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "fromPath": {
                        "type": "string"
                    }
                },
                "required": [
                    "fromPath",
                    "name"
                ]
            }
        }
    },
    "required": [
        "extraImports",
        "fullTypeExpression"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<TsType>

export const validateTsType = createSchemaValidator<TsType>(TsTypeJsonSchema)

export default {
    uri: "$innerType/TsType",
    schema: TsTypeJsonSchema,
    validate: validateTsType,
}
