import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";
import Group from "@/type/__generated/jsonSchema/items/Group.ts"
import Position from "@/type/__generated/jsonSchema/items/Position.ts";
import EntityWithProperties from "@/type/context/jsonSchema/EntityWithProperties.ts"
import MappedSuperClassWithProperties from "@/type/context/jsonSchema/MappedSuperClassWithProperties.ts";
import EmbeddableTypeWithProperties from "@/type/context/jsonSchema/EmbeddableTypeWithProperties.ts";
import Enumeration from "@/type/__generated/jsonSchema/items/Enumeration.ts";
import OneToOneAssociationIdOnly from "@/type/__generated/jsonSchema/items/OneToOneAssociationIdOnly.ts";
import OneToOneAbstractAssociationIdOnly
    from "@/type/__generated/jsonSchema/items/OneToOneAbstractAssociationIdOnly.ts";
import ManyToOneAssociationIdOnly from "@/type/__generated/jsonSchema/items/ManyToOneAssociationIdOnly.ts";
import ManyToOneAbstractAssociationIdOnly
    from "@/type/__generated/jsonSchema/items/ManyToOneAbstractAssociationIdOnly.ts";
import ManyToManyAssociationIdOnly from "@/type/__generated/jsonSchema/items/ManyToManyAssociationIdOnly.ts";
import LabelPosition from "@/type/__generated/jsonSchema/items/LabelPosition.ts";
import ManyToManyAbstractAssociationIdOnly
    from "@/type/__generated/jsonSchema/items/ManyToManyAbstractAssociationIdOnly.ts";

export const PartialModelGraphSubData_JsonSchema: JSONSchemaType<Partial<ModelGraphSubData>> = {
    type: "object",
    properties: {
        groups: {
            type: "array",
            items: Group.schema,
            nullable: true,
        },
        entities: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    data: EntityWithProperties.schema,
                    position: Position.schema
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
                    data: MappedSuperClassWithProperties.schema,
                    position: Position.schema
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
                    data: EmbeddableTypeWithProperties.schema,
                    position: Position.schema
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
                    data: Enumeration.schema,
                    position: Position.schema
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
                            OneToOneAssociationIdOnly.schema,
                            OneToOneAbstractAssociationIdOnly.schema,
                            ManyToOneAssociationIdOnly.schema,
                            ManyToOneAbstractAssociationIdOnly.schema,
                            ManyToManyAssociationIdOnly.schema,
                            ManyToManyAbstractAssociationIdOnly.schema,
                        ]
                    },
                    labelPosition: LabelPosition.schema
                },
                required: ["data", "labelPosition"],
            },
            nullable: true,
        }
    },
    definitions: {
        ...Group.schema.definitions,
        ...EntityWithProperties.schema.definitions,
        ...MappedSuperClassWithProperties.schema.definitions,
        ...EmbeddableTypeWithProperties.schema.definitions,
        ...Enumeration.schema.definitions,
        ...OneToOneAssociationIdOnly.schema.definitions,
        ...OneToOneAbstractAssociationIdOnly.schema.definitions,
        ...ManyToOneAssociationIdOnly.schema.definitions,
        ...ManyToOneAbstractAssociationIdOnly.schema.definitions,
        ...ManyToManyAssociationIdOnly.schema.definitions,
        ...ManyToManyAbstractAssociationIdOnly.schema.definitions,
    }
}

export const validatePartialModelGraphSubData = createSchemaValidator(PartialModelGraphSubData_JsonSchema)

export default {
    uri: "$innerType/PartialModelGraphSubData",
    schema: PartialModelGraphSubData_JsonSchema,
    validate: validatePartialModelGraphSubData,
}
