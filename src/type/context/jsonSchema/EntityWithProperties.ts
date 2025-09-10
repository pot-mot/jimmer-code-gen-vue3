import {jsonSchemas} from "@/type/__generated/jsonSchema";
import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const {definitions: entityDefinitions, properties: entityProperties, ...entityOther} = jsonSchemas.Entity.schema
const {definitions: propertyDefinitions, ...propertyOther} = jsonSchemas.Property.schema

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
