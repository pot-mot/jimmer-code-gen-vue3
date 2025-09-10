import {jsonSchemas} from "@/type/__generated/jsonSchema";
import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

const {definitions: mappedSuperClassDefinitions, properties: mappedSuperClassProperties, ...mappedSuperClassOther} = jsonSchemas.MappedSuperClass.schema
const {definitions: propertyDefinitions, propertyOther} = jsonSchemas.Property.schema

export const MappedSuperClassWithProperties_JsonSchema = {
    ...mappedSuperClassOther,
    properties: {
        ...mappedSuperClassProperties,
        properties: {
            type: "array",
            items: propertyOther,
        }
    },
    definitions: {
        ...mappedSuperClassDefinitions,
        ...propertyDefinitions,
    }
} as JSONSchemaType<MappedSuperClassWithProperties>

export const validateMappedSuperClassWithProperties = createSchemaValidator<MappedSuperClassWithProperties>(MappedSuperClassWithProperties_JsonSchema)

export default {
    uri: "$innerType/MappedSuperClassWithProperties",
    schema: MappedSuperClassWithProperties_JsonSchema,
    validate: validateMappedSuperClassWithProperties,
}
