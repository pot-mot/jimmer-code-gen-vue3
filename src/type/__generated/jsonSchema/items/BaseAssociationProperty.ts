import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const BaseAssociationPropertyJsonSchema: JSONSchemaType<BaseAssociationProperty> = {
    "type": "object",
    "properties": {
        "associationId": {
            "type": "string"
        },
        "referencedEntityId": {
            "type": "string"
        },
        "idViewName": {
            "type": "string"
        },
        "idViewNameTemplate": {
            "type": "string"
        },
        "useIdViewNameTemplate": {
            "type": "boolean"
        }
    },
    "required": [
        "associationId",
        "idViewName",
        "idViewNameTemplate",
        "referencedEntityId",
        "useIdViewNameTemplate"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<BaseAssociationProperty>

export const validateBaseAssociationProperty = createSchemaValidator<BaseAssociationProperty>(BaseAssociationPropertyJsonSchema)

export default {
    uri: "$innerType/BaseAssociationProperty",
    schema: BaseAssociationPropertyJsonSchema,
    validate: validateBaseAssociationProperty,
}
