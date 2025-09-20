import type {GraphNode} from "@vue-flow/core";
import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";
import {MappedSuperClassWithProperties_JsonSchema} from "@/type/context/jsonSchema/MappedSuperClassWithProperties.ts";
import {EntityWithProperties_JsonSchema} from "@/type/context/jsonSchema/EntityWithProperties.ts";

export const NodeType_MappedSuperClass = "MAPPED_SUPER_CLASS" as const

export type MappedSuperClassNode = Pick<GraphNode, 'id' | 'position'> & {
    type: typeof NodeType_MappedSuperClass
    data: {
        mappedSuperClass: MappedSuperClassWithProperties
    }
}

export const MappedSuperClassNode_JsonSchema: JSONSchemaType<MappedSuperClassNode> = {
    type: "object",
    required: ["id", "type", "position", "data"],
    properties: {
        id: {type: "string"},
        type: {type: "string", enum: [NodeType_MappedSuperClass]},
        position: {
            type: "object",
            required: ["x", "y"],
            properties: {x: {type: "number"}, y: {type: "number"}},
        },
        data: {
            type: "object",
            properties: {
                mappedSuperClass: MappedSuperClassWithProperties_JsonSchema
            },
            required: ["mappedSuperClass"]
        }
    },
    definitions: {
        ...EntityWithProperties_JsonSchema.definitions
    }
}

export const validateMappedSuperClassNode = createSchemaValidator<MappedSuperClassNode>(MappedSuperClassNode_JsonSchema)
