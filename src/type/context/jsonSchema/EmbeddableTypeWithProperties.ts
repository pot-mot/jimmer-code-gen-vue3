import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";
import EmbeddableTypeJsonSchema from "@/type/__generated/jsonSchema/items/EmbeddableType.ts"
import PropertyJsonSchema from "@/type/__generated/jsonSchema/items/EmbeddableTypeProperty.ts"

const {definitions: entityDefinitions, properties: entityProperties, ...entityOther} = EmbeddableTypeJsonSchema.schema
const {definitions: propertyDefinitions, ...propertyOther} = PropertyJsonSchema.schema

export const EmbeddableTypeWithProperties_JsonSchema = {
    ...entityOther,
    properties: {
        ...entityProperties,
        properties: {
            type: "array",
            items: propertyOther,
        }
    },
    definitions: {
        ...entityDefinitions,
        ...propertyDefinitions,
    }
} as JSONSchemaType<EmbeddableTypeWithProperties>

export const validateEmbeddableTypeWithProperties = createSchemaValidator<EmbeddableTypeWithProperties>(EmbeddableTypeWithProperties_JsonSchema)

export default {
    uri: "$innerType/EmbeddableTypeWithProperties",
    schema: EmbeddableTypeWithProperties_JsonSchema,
    validate: validateEmbeddableTypeWithProperties,
}
