import type {GraphEdge} from "@vue-flow/core";

export const EdgeType_ConcreteAssociation = "CONCRETE_ASSOCIATION" as const

export type ConcreteAssociationEdge = Pick<GraphEdge, 'id' | 'source' | 'target'> & {
    type: typeof EdgeType_ConcreteAssociation
    data: {
        association: ConcreteAssociationIdOnly
        labelPosition: LabelPosition
    },
    sourceHandle: string,
    targetHandle: string,
}
