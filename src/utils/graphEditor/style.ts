import {Graph} from "@antv/x6";
import {COMMON_COLOR, HIGHLIGHT_COLOR} from "../../components/AssociationEditor/constant.ts";

export const useHoverToFront = (graph: Graph) => {
    graph.on('cell:mouseenter', ({cell}) => {
        cell.toFront()
        if (cell.isNode()) {
            graph.getConnectedEdges(cell).forEach(edge => {
                edge.toFront()
            })
        }
    })
}

export const useEdgeStyle = (graph: Graph) => {
    graph.on('edge:selected', ({edge}) => {
        edge.attr('line/stroke', HIGHLIGHT_COLOR)
    })
    graph.on('edge:unselected', ({edge}) => {
        edge.attr('line/stroke', COMMON_COLOR)
    })
    graph.on('edge:mouseenter', ({edge}) => {
        edge.attr('line/strokeWidth', 2)
    })
    graph.on('edge:mouseleave', ({edge}) => {
        edge.attr('line/strokeWidth', 1)
    })
}