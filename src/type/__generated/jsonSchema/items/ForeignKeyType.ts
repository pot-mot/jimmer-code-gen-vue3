import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ForeignKeyTypeJsonSchema: JSONSchemaType<ForeignKeyType> = {
    "enum": [
        "AUTO",
        "FAKE",
        "REAL"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ForeignKeyType>

export const validateForeignKeyType = createSchemaValidator<ForeignKeyType>(ForeignKeyTypeJsonSchema)

export default {
    uri: "$innerType/ForeignKeyType",
    schema: ForeignKeyTypeJsonSchema,
    validate: validateForeignKeyType,
}
