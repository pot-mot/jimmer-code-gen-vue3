import type {GraphNode} from "@vue-flow/core";
import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";
import {EmbeddableTypeWithProperties_JsonSchema} from "@/type/context/jsonSchema/EmbeddableTypeWithProperties.ts";

export const NodeType_EmbeddableType = "EMBEDDABLE_TYPE" as const

export type EmbeddableTypeNode = Pick<GraphNode, 'id' | 'position'> & {
    type: typeof NodeType_EmbeddableType
    data: {
        embeddableType: EmbeddableTypeWithProperties
    }
}

export const EmbeddableTypeNode_JsonSchema: JSONSchemaType<EmbeddableTypeNode> = {
    type: "object",
    required: ["id", "type", "position", "data"],
    properties: {
        id: {type: "string"},
        type: {type: "string", enum: [NodeType_EmbeddableType]},
        position: {
            type: "object",
            required: ["x", "y"],
            properties: {x: {type: "number"}, y: {type: "number"}},
        },
        data: {
            type: "object",
            properties: {
                embeddableType: EmbeddableTypeWithProperties_JsonSchema
            },
            required: ["embeddableType"]
        }
    },
    definitions: {
        ...EmbeddableTypeWithProperties_JsonSchema.definitions
    }
}

export const validateEmbeddableTypeNode = createSchemaValidator<EmbeddableTypeNode>(EmbeddableTypeNode_JsonSchema)
