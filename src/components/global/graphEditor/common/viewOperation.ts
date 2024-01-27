import {Ref, ref} from "vue";
import {getBottom, getLeft, getRight, getTop, layoutByLevel, LayoutDirection} from "../layout/layoutByLevel.ts";
import {Graph} from "@antv/x6";
import {getSelectedNodes} from "../selection/selectOperation.ts";
import {CellProperty, getCell} from "./cellsInputProcess.ts";
import {DEFAULT_ZOOM_RANGE} from "@/components/business/modelEditor/constant.ts";

export const useViewOperation = (_graph: () => Graph) => {
    const layoutDirection: Ref<LayoutDirection> = ref("LR")

    return {
        layoutDirection,
        layout: () => layout(_graph(), layoutDirection.value),
        fit: () => fit(_graph()),
        focus: (cell: CellProperty) => focus(_graph(), cell),
        center: () => center(_graph())
    }
}

/** 布局 */
export const layout = (graph: Graph, direction: LayoutDirection) => {
    layoutByLevel(graph, direction)
}

/**
 * 使画布适应内容
 */
export const fit = (graph: Graph) => {
    graph.scaleContentToFit({...DEFAULT_ZOOM_RANGE, padding: 100})
    graph.centerContent()
}

/**
 * 聚焦 cell，将移动画布并选中 cell
 */
export const focus = (graph: Graph, input: string | CellProperty) => {
    const cell = getCell(graph, input)

    cell.toFront()
    graph.cleanSelection()
    graph.centerCell(cell)
    graph.select(cell)
}

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

        const centerPoint = {
            x: (right - left) / 2 + left,
            y: (bottom - top) / 2 + top,
        }

        graph.centerPoint(
            centerPoint.x,
            centerPoint.y
        )
    }
}
