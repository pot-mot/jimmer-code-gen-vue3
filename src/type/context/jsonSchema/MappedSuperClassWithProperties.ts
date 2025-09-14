import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";
import MappedSuperClassJsonSchema from "@/type/__generated/jsonSchema/items/MappedSuperClass.ts"
import PropertyJsonSchema from "@/type/__generated/jsonSchema/items/Property.ts"

const {definitions: mappedSuperClassDefinitions, properties: mappedSuperClassProperties, ...mappedSuperClassOther} = MappedSuperClassJsonSchema.schema
const {definitions: propertyDefinitions, propertyOther} = PropertyJsonSchema.schema

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
