import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const CrossType_IdOnlyJsonSchema: JSONSchemaType<CrossType_IdOnly> = {
    "type": "object",
    "properties": {
        "jvmSource": {
            "$ref": "#/definitions/JvmSource"
        },
        "databaseSource": {
            "$ref": "#/definitions/DatabaseSource"
        },
        "sqlTypeId": {
            "type": "string"
        },
        "jvmTypeId": {
            "type": "string"
        },
        "tsTypeId": {
            "type": "string"
        }
    },
    "required": [
        "databaseSource",
        "jvmSource",
        "jvmTypeId",
        "sqlTypeId",
        "tsTypeId"
    ],
    "definitions": {
        "JvmSource": {
            "enum": [
                "ANY",
                "JAVA",
                "KOTLIN"
            ],
            "type": "string"
        },
        "DatabaseSource": {
            "enum": [
                "ANY",
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
} as any as JSONSchemaType<CrossType_IdOnly>

export const validateCrossType_IdOnly = createSchemaValidator<CrossType_IdOnly>(CrossType_IdOnlyJsonSchema)

export default {
    uri: "$innerType/CrossType_IdOnly",
    schema: CrossType_IdOnlyJsonSchema,
    validate: validateCrossType_IdOnly,
}
