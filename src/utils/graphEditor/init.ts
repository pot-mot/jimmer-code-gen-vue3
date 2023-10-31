import {Graph} from "@antv/x6";
import {debounce} from "lodash";
import {useEdgeStyle, useHoverToFront} from "./style.ts";
import {useHistory} from "./useHistory.ts";
import {useSelection} from "./useSelection.ts";

export const initGraph = (
    container: HTMLElement,
    wrapper: HTMLElement,
    opt: any | undefined,
): Graph => {
    const graph = new Graph({
        container,

        width: wrapper.clientWidth,
        height: wrapper.clientHeight,

        ...opt
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