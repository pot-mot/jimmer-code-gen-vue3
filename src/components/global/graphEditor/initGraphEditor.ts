import {Graph} from "@antv/x6";
import debounce from "lodash/debounce";
import {useSelection} from "./selection/useSelection.ts";
import {useKeyBoard} from "@/components/global/graphEditor/keyboard/useKeyBoard.ts";
import {Options as GraphOptions} from "@antv/x6/src/graph/options.ts";
import {useExport} from "@/components/global/graphEditor/export/export.ts";

export const initGraphEditor = (
    container: HTMLElement,
    wrapper: HTMLElement,
    opt: Partial<GraphOptions.Manual>,
): Graph => {
    const graph = new Graph({
        container,

        width: wrapper.clientWidth,
        height: wrapper.clientHeight,

        ...(opt as any)
    })

    const resizeOb = new ResizeObserver(debounce(() => {
        graph.resize(wrapper.clientWidth, wrapper.clientHeight)
    }, 200))

    resizeOb.observe(wrapper)

    useKeyBoard(graph)
    useSelection(graph)
    useExport(graph)

    return graph
}
