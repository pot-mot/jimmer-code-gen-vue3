import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const DatabaseJsonSchema: JSONSchemaType<Database> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "type": {
            "$ref": "#/definitions/DatabaseType"
        },
        "name": {
            "type": "string"
        },
        "url": {
            "type": "string"
        },
        "username": {
            "type": "string"
        },
        "password": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "password",
        "type",
        "url",
        "username"
    ],
    "definitions": {
        "DatabaseType": {
            "enum": [
                "H2",
                "MYSQL",
                "ORACLE",
                "POSTGRESQL",
                "SQLITE",
                "SQLSERVER"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Database>

export const validateDatabase = createSchemaValidator<Database>(DatabaseJsonSchema)

export default {
    uri: "$innerType/Database",
    schema: DatabaseJsonSchema,
    validate: validateDatabase,
}
