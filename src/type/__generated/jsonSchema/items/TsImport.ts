import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const TsImportJsonSchema: JSONSchemaType<TsImport> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "fromPath": {
            "type": "string"
        },
        "typeOnly": {
            "type": "boolean"
        }
    },
    "required": [
        "fromPath",
        "name",
        "typeOnly"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<TsImport>

export const validateTsImport = createSchemaValidator<TsImport>(TsImportJsonSchema)

export default {
    uri: "$innerType/TsImport",
    schema: TsImportJsonSchema,
    validate: validateTsImport,
}
