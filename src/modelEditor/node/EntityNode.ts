import type {GraphNode} from "@vue-flow/core";
import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";
import {EntityWithProperties_JsonSchema} from "@/type/context/jsonSchema/EntityWithProperties.ts";

export const NodeType_Entity = "ENTITY" as const

export const NOT_EXIST_ASSOCIATION_ID = "[[NOT_EXIST_ASSOCIATION_ID]]"

export type EntityNode = Pick<GraphNode, 'id' | 'position'> & {
    type: typeof NodeType_Entity
    data: {
        entity: EntityWithProperties
    }
}

export const EntityNode_JsonSchema: JSONSchemaType<EntityNode> = {
    type: "object",
    required: ["id", "type", "position", "data"],
    properties: {
        id: {type: "string"},
        type: {type: "string", enum: [NodeType_Entity]},
        position: {
            type: "object",
            required: ["x", "y"],
            properties: {x: {type: "number"}, y: {type: "number"}},
        },
        data: {
            type: "object",
            properties: {
                entity: EntityWithProperties_JsonSchema
            },
            required: ["entity"]
        }
    },
    definitions: {
        ...EntityWithProperties_JsonSchema.definitions
    }
}

export const validateEntityNode = createSchemaValidator<EntityNode>(EntityNode_JsonSchema)
