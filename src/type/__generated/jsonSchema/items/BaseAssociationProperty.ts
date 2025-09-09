import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const BaseAssociationPropertyJsonSchema: JSONSchemaType<BaseAssociationProperty> = {
    "type": "object",
    "properties": {
        "associationId": {
            "type": "string"
        },
        "referenceEntityId": {
            "type": "string"
        },
        "idViewName": {
            "type": "string"
        }
    },
    "required": [
        "associationId",
        "idViewName",
        "referenceEntityId"
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<BaseAssociationProperty>

export const validateBaseAssociationProperty = createSchemaValidator<BaseAssociationProperty>(BaseAssociationPropertyJsonSchema)

export default {
    uri: "$innerType/BaseAssociationProperty",
    schema: BaseAssociationPropertyJsonSchema,
    validate: validateBaseAssociationProperty,
}
