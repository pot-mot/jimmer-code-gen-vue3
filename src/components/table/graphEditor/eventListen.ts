import {Graph} from "@antv/x6";

export const useMouseEnterToFront = (graph: Graph) => {
    graph.on('node:mouseenter', ({ e, node, view }) => {
        node.toFront()
    })
}