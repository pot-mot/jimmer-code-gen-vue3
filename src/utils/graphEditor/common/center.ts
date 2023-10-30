import {getSelectedNodes} from "../selection/selectOperation.ts";
import {Graph} from "@antv/x6";
import {focus} from "./focus.ts";
import {getBottom, getLeft, getRight, getTop} from "../layout/layoutByLevel.ts";

export const center = (graph: Graph) => {
    const nodes = getSelectedNodes(graph)

    if (graph.isSelectionEmpty()) {
        graph.centerContent()
    } else if (nodes.length == 1) {
        focus(graph, nodes[0].id)
    } else {
        const left = getLeft(nodes)!
        const right = getRight(nodes)!
        const top = getTop(nodes)!
        const bottom = getBottom(nodes)!

        console.log(left, right)
        console.log(top, bottom)

        const centerPoint = {
            x: (right - left) / 2 + left,
            y: (bottom - top) / 2 + top,
        }

        console.log(centerPoint)

        graph.centerPoint(
            centerPoint.x,
            centerPoint.y
        )
    }
}