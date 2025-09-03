import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const DatabaseTypeJsonSchema: JSONSchemaType<DatabaseType> = {
    "enum": [
        "H2",
        "MYSQL",
        "ORACLE",
        "POSTGRESQL",
        "SQLITE",
        "SQLSERVER"
    ],
    "type": "string",
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<DatabaseType>

export const validateDatabaseType = createSchemaValidator<DatabaseType>(DatabaseTypeJsonSchema)

export default {
    uri: "$innerType/DatabaseType",
    schema: DatabaseTypeJsonSchema,
    validate: validateDatabaseType,
}
