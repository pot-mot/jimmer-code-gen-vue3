import type {GraphNode} from "@vue-flow/core";
import type {JSONSchemaType} from "ajv/lib/types/json-schema.ts";
import {createSchemaValidator} from "@/utils/type/typeGuard.ts";
import {jsonSchemas} from "@/type/__generated/jsonSchema";

export const NodeType_Enumeration = "ENUMERATION" as const

export type EnumerationNode = Pick<GraphNode, 'id' | 'position'> & {
    type: typeof NodeType_Enumeration
    data: {
        enumeration: Enumeration
    }
}

export const EnumerationNode_JsonSchema: JSONSchemaType<EnumerationNode> = {
    type: "object",
    required: ["id", "type", "position", "data"],
    properties: {
        id: {type: "string"},
        type: {type: "string", enum: [NodeType_Enumeration]},
        position: {
            type: "object",
            required: ["x", "y"],
            properties: {x: {type: "number"}, y: {type: "number"}},
        },
        data: {
            type: "object",
            properties: {
                enumeration: jsonSchemas.Enumeration.schema
            },
            required: ["enumeration"]
        }
    },
    definitions: {
        ...jsonSchemas.Enumeration.schema.definitions
    }
}

export const validateEnumerationNode = createSchemaValidator<EnumerationNode>(EnumerationNode_JsonSchema)
