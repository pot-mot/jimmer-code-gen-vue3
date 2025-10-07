import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EntityJsonSchema: JSONSchemaType<Entity> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "groupId": {
            "type": "string"
        },
        "subPackagePath": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "comment": {
            "type": "string"
        },
        "tableName": {
            "type": "string"
        },
        "autoSyncTableName": {
            "type": "boolean"
        },
        "extendsIds": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "extraImports": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "extraAnnotations": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "required": [
        "autoSyncTableName",
        "comment",
        "extendsIds",
        "extraAnnotations",
        "extraImports",
        "groupId",
        "id",
        "name",
        "subPackagePath",
        "tableName"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Entity>

export const validateEntity = createSchemaValidator<Entity>(EntityJsonSchema)

export default {
    uri: "$innerType/Entity",
    schema: EntityJsonSchema,
    validate: validateEntity,
}
