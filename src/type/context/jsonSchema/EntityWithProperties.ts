import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";
import EntityJsonSchema from "@/type/__generated/jsonSchema/items/Entity.ts"
import PropertyJsonSchema from "@/type/__generated/jsonSchema/items/Property.ts"

const {definitions: entityDefinitions, properties: entityProperties, ...entityOther} = EntityJsonSchema.schema
const {definitions: propertyDefinitions, ...propertyOther} = PropertyJsonSchema.schema

export const EntityWithProperties_JsonSchema = {
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
} as JSONSchemaType<EntityWithProperties>

export const validateEntityWithProperties = createSchemaValidator<EntityWithProperties>(EntityWithProperties_JsonSchema)

export default {
    uri: "$innerType/EntityWithProperties",
    schema: EntityWithProperties_JsonSchema,
    validate: validateEntityWithProperties,
}
