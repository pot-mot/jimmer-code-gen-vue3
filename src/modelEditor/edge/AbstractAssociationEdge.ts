import type {GraphEdge} from "@vue-flow/core";

export const EdgeType_AbstractAssociation = "ABSTRACT_ASSOCIATION" as const

export type AbstractAssociationEdge = Pick<GraphEdge, 'id' | 'source' | 'target'> & {
    type: typeof EdgeType_AbstractAssociation
    data: {
        association: AbstractAssociationIdOnly
        labelPosition: LabelPosition
    },
    sourceHandle: string,
    targetHandle: string,
}
