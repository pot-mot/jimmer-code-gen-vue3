import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const EntityTypePropertyJsonSchema: JSONSchemaType<EntityTypeProperty> = {
    "type": "object",
    "properties": {
        "entityId": {
            "type": "string"
        }
    },
    "required": [
        "entityId"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<EntityTypeProperty>

export const validateEntityTypeProperty = createSchemaValidator<EntityTypeProperty>(EntityTypePropertyJsonSchema)

export default {
    uri: "$innerType/EntityTypeProperty",
    schema: EntityTypePropertyJsonSchema,
    validate: validateEntityTypeProperty,
}
