import type {GraphEdge} from "@vue-flow/core";

export const EdgeType_Association = "ASSOCIATION" as const

export type AssociationEdge = Pick<GraphEdge, 'id' | 'source' | 'target'> & {
    type: typeof EdgeType_Association
    data: {
        association: Association
    },
    sourceHandle: string,
    targetHandle: string,
}
