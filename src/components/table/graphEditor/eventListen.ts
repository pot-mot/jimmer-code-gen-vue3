import {Graph} from "@antv/x6";
import {COMMON_COLOR, HOVER_COLOR} from "../constant";

export const useMouseEnterNodeToFront = (graph: Graph) => {
    graph.on('node:mouseenter', ({node}) => {
        node.toFront()
    })
}

export const useEdgeMouseEnterChangeEdgeColor = (graph: Graph) => {
    graph.on('edge:mouseenter', ({edge}) => {
        edge.attr('line/stroke', HOVER_COLOR)
    })
    graph.on('edge:mouseleave', ({edge}) => {
        edge.attr('line/stroke', COMMON_COLOR)
    })
}

export const useEdgeClickToggleAssociationType = (graph: Graph) => {
    graph.on('edge:click', ({edge}) => {
        if (!edge) return;

        if (edge.labels.length > 0 && edge.labels[0].attrs.label.text == "ManyToOne") {
            edge.setLabels(["OneToOne"])
        } else if (edge.labels.length > 0 && edge.labels[0].attrs.label.text == "OneToOne") {
            edge.setLabels(["ManyToMany"])
        } else {
            edge.setLabels(["ManyToOne"])
        }
    })
}