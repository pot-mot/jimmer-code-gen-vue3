import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToManyViewPropertyJsonSchema: JSONSchemaType<ManyToManyViewProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "ASSOCIATION_ManyToMany_View"
                },
                "baseToManyPropertyId": {
                    "type": "string"
                },
                "deeperAssociationPropertyId": {
                    "type": "string"
                }
            },
            "required": [
                "baseToManyPropertyId",
                "category",
                "deeperAssociationPropertyId"
            ]
        },
        {
            "type": "object",
            "properties": {
                "entityId": {
                    "type": "string"
                }
            },
            "required": [
                "entityId"
            ]
        }
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
} as any as JSONSchemaType<ManyToManyViewProperty>

export const validateManyToManyViewProperty = createSchemaValidator<ManyToManyViewProperty>(ManyToManyViewPropertyJsonSchema)

export default {
    uri: "$innerType/ManyToManyViewProperty",
    schema: ManyToManyViewPropertyJsonSchema,
    validate: validateManyToManyViewProperty,
}
