import {Graph} from "@antv/x6";
import {AssociationEdge} from "../edge/AssociationEdge.ts";

export const initGraph = (container: HTMLElement, wrapper: HTMLElement): Graph => {
    const graph = new Graph({
        container,

        mousewheel: {
            enabled: true,
            minScale: 0.1,
            maxScale: 4,
        },

        width: wrapper.clientWidth,
        height: wrapper.clientHeight,

        panning: {
            enabled: true,
            eventTypes: ['rightMouseDown']
        },

        connecting: AssociationEdge,
    });

    graph.zoomTo(0.5)

    return graph
}