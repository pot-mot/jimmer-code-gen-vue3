import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const AssociationJsonSchema: JSONSchemaType<Association> = {
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "name": {
            "type": "string"
        },
        "type": {
            "$ref": "#/definitions/AssociationType"
        },
        "sourceEntityId": {
            "type": "string"
        },
        "targetEntityId": {
            "type": "string"
        },
        "sourcePropertyId": {
            "type": "string"
        },
        "targetPropertyId": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "sourceEntityId",
        "sourcePropertyId",
        "targetEntityId",
        "targetPropertyId",
        "type"
    ],
    "definitions": {
        "AssociationType": {
            "enum": [
                "MANY_TO_MANY",
                "MANY_TO_ONE",
                "ONE_TO_ONE"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<Association>

export const validateAssociation = createSchemaValidator<Association>(AssociationJsonSchema)

export default {
    uri: "$innerType/Association",
    schema: AssociationJsonSchema,
    validate: validateAssociation,
}
