import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const DatabaseSourceJsonSchema: JSONSchemaType<DatabaseSource> = {
    "enum": [
        "ANY",
        "H2",
        "MYSQL",
        "ORACLE",
        "POSTGRESQL",
        "SQLITE",
        "SQLSERVER"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<DatabaseSource>

export const validateDatabaseSource = createSchemaValidator<DatabaseSource>(DatabaseSourceJsonSchema)

export default {
    uri: "$innerType/DatabaseSource",
    schema: DatabaseSourceJsonSchema,
    validate: validateDatabaseSource,
}
