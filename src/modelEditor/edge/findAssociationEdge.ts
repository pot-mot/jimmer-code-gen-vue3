import type {GraphEdge, VueFlowStore} from "@vue-flow/core";
import {
    type ConcreteAssociationEdge,
    EdgeType_ConcreteAssociation
} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import {
    type AbstractAssociationEdge,
    EdgeType_AbstractAssociation
} from "@/modelEditor/edge/AbstractAssociationEdge.ts";

export const findAssociationEdge = (
    associationId: string,
    vueFlow: VueFlowStore,
): GraphEdge | undefined => {
    for (const edge of vueFlow.edges.value) {
        if (edge.type === EdgeType_ConcreteAssociation || edge.type === EdgeType_AbstractAssociation) {
            const associationEdge = edge as ConcreteAssociationEdge | AbstractAssociationEdge
            if (associationEdge.data.edgedAssociation.association.id === associationId) {
                return edge
            }
        }
    }
}