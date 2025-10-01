import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const SqlTypeJsonSchema: JSONSchemaType<SqlType> = {
    "type": "object",
    "properties": {
        "type": {
            "type": "string"
        },
        "dataSize": {
            "type": "number"
        },
        "numericPrecision": {
            "type": "number"
        },
        "nullable": {
            "type": "boolean"
        },
        "defaultValue": {
            "type": "string"
        }
    },
    "required": [
        "nullable",
        "type"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<SqlType>

export const validateSqlType = createSchemaValidator<SqlType>(SqlTypeJsonSchema)

export default {
    uri: "$innerType/SqlType",
    schema: SqlTypeJsonSchema,
    validate: validateSqlType,
}
