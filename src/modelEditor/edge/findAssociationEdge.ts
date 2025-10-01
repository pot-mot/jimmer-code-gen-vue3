import type {GraphEdge, VueFlowStore} from "@vue-flow/core";

export const findAssociationEdge = (
    associationId: string,
    vueFlow: VueFlowStore,
): GraphEdge | undefined => {
    for (const edge of vueFlow.edges.value) {
        if ("association" in edge.data && "id" in edge.data.association && edge.data.association.id === associationId) {
            return edge
        }
    }
}