import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ModelJsonSchema: JSONSchemaType<Model> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "createdTime": {
            "type": "string"
        },
        "modifiedTime": {
            "type": "string"
        },
        "database": {
            "$ref": "#/definitions/DatabaseType"
        },
        "language": {
            "$ref": "#/definitions/BackEndLanguage"
        }
    },
    "required": [
        "createdTime",
        "database",
        "description",
        "id",
        "language",
        "modifiedTime",
        "name"
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
        },
        "BackEndLanguage": {
            "enum": [
                "JAVA",
                "KOTLIN"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Model>

export const validateModel = createSchemaValidator<Model>(ModelJsonSchema)

export default {
    uri: "$innerType/Model",
    schema: ModelJsonSchema,
    validate: validateModel,
}
