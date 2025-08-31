import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const AssociationJsonSchema: JSONSchemaType<Association> = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        },
        "type": {
            "$ref": "#/definitions/AssociationType"
        }
    },
    "required": [
        "name",
        "type"
    ],
    "definitions": {
        "AssociationType": {
            "enum": [
                "MANY TO MANY",
                "MANY TO ONE",
                "ONE TO MANY",
                "ONE TO ONE"
            ],
            "type": "string"
        }
    },
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateAssociation = createSchemaValidator<Association>(AssociationJsonSchema)

export default {
    uri: "$innerType/Association",
    schema: AssociationJsonSchema,
    validate: validateAssociation,
}
