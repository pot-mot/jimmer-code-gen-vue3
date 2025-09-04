import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const GroupJsonSchema: JSONSchemaType<Group> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "comment": {
            "type": "string"
        },
        "color": {
            "type": "string"
        },
        "basePackagePath": {
            "type": "string"
        },
        "baseTableSchema": {
            "type": "string"
        }
    },
    "required": [
        "basePackagePath",
        "baseTableSchema",
        "color",
        "comment",
        "id",
        "name"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Group>

export const validateGroup = createSchemaValidator<Group>(GroupJsonSchema)

export default {
    uri: "$innerType/Group",
    schema: GroupJsonSchema,
    validate: validateGroup,
}
