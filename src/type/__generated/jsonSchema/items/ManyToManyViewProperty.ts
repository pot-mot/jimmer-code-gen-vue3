import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const ManyToManyViewPropertyJsonSchema: JSONSchemaType<ManyToManyViewProperty> = {
    "allOf": [
        {
            "type": "object",
            "properties": {
                "category": {
                    "type": "string",
                    "const": "ManyToMany_View"
                },
                "baseToManyPropertyName": {
                    "type": "string"
                },
                "deeperAssociationPropertyName": {
                    "type": "string"
                }
            },
            "required": [
                "baseToManyPropertyName",
                "category",
                "deeperAssociationPropertyName"
            ]
        },
        {
            "type": "object",
            "properties": {
                "entityName": {
                    "type": "string"
                }
            },
            "required": [
                "entityName"
            ]
        }
    ],
    "$schema": "http://json-schema.org/draft-07/schema#"
}

export const validateManyToManyViewProperty = createSchemaValidator<ManyToManyViewProperty>(ManyToManyViewPropertyJsonSchema)

export default {
    uri: "$innerType/ManyToManyViewProperty",
    schema: ManyToManyViewPropertyJsonSchema,
    validate: validateManyToManyViewProperty,
}
