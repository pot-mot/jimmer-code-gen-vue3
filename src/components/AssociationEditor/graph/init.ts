import {Graph} from "@antv/x6"
import {AssociationEdgeConnecting} from "../edge/AssociationEdge.ts"
import {defaultZoomRange} from "./scale.ts"
import {debounce} from 'lodash'
import {COMMON_COLOR, HIGHLIGHT_COLOR} from "../constant";

export const initGraph = (container: HTMLElement, wrapper: HTMLElement): Graph => {
    const graph = new Graph({
        container,

        mousewheel: {
            enabled: true,
            ...defaultZoomRange,
        },

        width: wrapper.clientWidth,
        height: wrapper.clientHeight,

        panning: {
            enabled: true,
            eventTypes: ['rightMouseDown']
        },

        connecting: AssociationEdgeConnecting as any,
    })

    const resizeOb = new ResizeObserver(debounce(() => {
        graph.resize(wrapper.clientWidth, wrapper.clientHeight)
    }, 200))

    resizeOb.observe(wrapper)

    useHoverToFront(graph)
    useEdgeColor(graph)

    return graph
}

const useHoverToFront = (graph: Graph) => {
    graph.on('cell:mouseenter', ({cell}) => {
        cell.toFront()
        if (cell.isNode()) {
            graph.getConnectedEdges(cell).forEach(edge => {
                edge.toFront()
            })
        }
    })
}

const useEdgeColor = (graph: Graph) => {
    graph.on('edge:selected', ({edge}) => {
        edge.attr('line/stroke', HIGHLIGHT_COLOR)
    })
    graph.on('edge:unselected', ({edge}) => {
        edge.attr('line/stroke', COMMON_COLOR)
    })
}