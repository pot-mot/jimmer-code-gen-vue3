import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {jsonSchemas} from "@/type/__generated/jsonSchema";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";

export const PartialModelGraphSubData: JSONSchemaType<Partial<ModelGraphSubData>> = {
    type: "object",
    properties: {
        groups: {
            type: "array",
            items: jsonSchemas.Group.schema,
            nullable: true,
        },
        entities: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    data: jsonSchemas.EntityWithProperties.schema,
                    position: jsonSchemas.Position.schema
                },
                required: ["data", "position"],
            },
            nullable: true,
        },
        mappedSuperClasses: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    data: jsonSchemas.MappedSuperClassWithProperties.schema,
                    position: jsonSchemas.Position.schema
                },
                required: ["data", "position"],
            },
            nullable: true,
        },
        embeddableTypes: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    data: jsonSchemas.EmbeddableTypeWithProperties.schema,
                    position: jsonSchemas.Position.schema
                },
                required: ["data", "position"],
            },
            nullable: true,
        },
        enumerations: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    data: jsonSchemas.Enumeration.schema,
                    position: jsonSchemas.Position.schema
                },
                required: ["data", "position"],
            },
            nullable: true,
        },
        associations: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    data: {
                        oneOf: [
                            jsonSchemas.OneToOneAssociationIdOnly.schema,
                            jsonSchemas.OneToOneAbstractAssociationIdOnly.schema,
                            jsonSchemas.ManyToOneAssociationIdOnly.schema,
                            jsonSchemas.ManyToOneAbstractAssociationIdOnly.schema,
                            jsonSchemas.ManyToManyAssociationIdOnly.schema,
                        ]
                    },
                    labelPosition: jsonSchemas.LabelPosition.schema
                },
                required: ["data", "labelPosition"],
            },
            nullable: true,
        }
    },
    definitions: {
        ...jsonSchemas.Group.schema.definitions,
        ...jsonSchemas.EntityWithProperties.schema.definitions,
        ...jsonSchemas.MappedSuperClassWithProperties.schema.definitions,
        ...jsonSchemas.EmbeddableTypeWithProperties.schema.definitions,
        ...jsonSchemas.Enumeration.schema.definitions,
        ...jsonSchemas.OneToOneAssociationIdOnly.schema.definitions,
        ...jsonSchemas.OneToOneAbstractAssociationIdOnly.schema.definitions,
        ...jsonSchemas.ManyToOneAssociationIdOnly.schema.definitions,
        ...jsonSchemas.ManyToOneAbstractAssociationIdOnly.schema.definitions,
        ...jsonSchemas.ManyToManyAssociationIdOnly.schema.definitions,
    }
}

export const validatePartialModelGraphSubData = createSchemaValidator(PartialModelGraphSubData)
