import {Graph} from "@antv/x6"
import {AssociationEdgeConnecting} from "./edge/AssociationEdge.ts"
import {defaultZoomRange} from "./constant.ts"
import {debounce} from 'lodash'
import {useEdgeStyle, useHoverToFront} from "../../utils/graphEditor/style.ts";
import {useHistory} from "../../utils/graphEditor/history/useHistory.ts";
import {useSelection} from "../../utils/graphEditor/selection/useSelection.ts";

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
    useEdgeStyle(graph)
    useHistory(graph)
    useSelection(graph)

    return graph
}