import {Graph} from "@antv/x6";
import debounce from "lodash/debounce";
import {useHistory} from "../history/useHistory.ts";
import {useSelection} from "../selection/useSelection.ts";
import {useKeyBoard} from "@/components/global/graphEditor/keyboard/useKeyBoard.ts";

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

    useKeyBoard(graph)
    useHistory(graph)
    useSelection(graph)

    return graph
}
