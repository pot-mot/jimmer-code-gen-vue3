import {Graph} from "@antv/x6";
import {AssociationEdge} from "../edge/AssociationEdge.ts";

export const initGraph = (container: HTMLElement, wrapper: HTMLElement): Graph => {
    const graph = new Graph({
        container,
        mousewheel: {
            enabled: true,
            modifiers: ['ctrl', 'meta'],
        },

        width: wrapper.clientWidth,
        height: wrapper.clientHeight,

        connecting: AssociationEdge,
    });

    container.addEventListener('resize', () => {
        if (graph && container && wrapper) graph.resize(wrapper.clientWidth, wrapper.clientHeight)
    })
    window.addEventListener('resize', () => {
        if (graph && container && wrapper) graph.resize(wrapper.clientWidth, wrapper.clientHeight)
    })

    return graph
}