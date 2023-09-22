import {Graph} from "@antv/x6";
import {COMMON_COLOR, HIGHLIGHT_COLOR} from "../constant";

export const useHoverToFront = (graph: Graph) => {
    graph.on('node:mouseenter', ({node}) => {
        node.toFront()
    })
}

export const useEdgeColor = (graph: Graph) => {
    graph.on('edge:selected', ({edge}) => {
        edge.attr('line/stroke', HIGHLIGHT_COLOR)
    })
    graph.on('edge:unselected', ({edge}) => {
        edge.attr('line/stroke', COMMON_COLOR)
    })
}