import { Graph } from "@antv/x6"
import { AssociationEdgeConnecting } from "../edge/AssociationEdge.ts"
import { defaultZoomRange } from "./scale.ts"
import { debounce } from 'lodash'

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

        connecting: AssociationEdgeConnecting,
    })

    const resizeOb = new ResizeObserver(debounce(() => {
        graph.resize(wrapper.clientWidth, wrapper.clientHeight)
    }, 200))

    resizeOb.observe(wrapper)

    return graph
}