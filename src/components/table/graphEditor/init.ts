import {Graph} from "@antv/x6";
import {AssociationEdge} from "../edge/AssociationEdge.ts";

export const initGraph = (container: HTMLElement, wrapper: HTMLElement): Graph => {
    const graph = new Graph({
        container,
        width: wrapper.clientWidth,
        height: wrapper.clientHeight,
        connecting: AssociationEdge
    });
    container.addEventListener('resize', () => {
        if (container && wrapper) graph.resize(container.clientWidth, container.clientHeight)
    })
    return graph
}