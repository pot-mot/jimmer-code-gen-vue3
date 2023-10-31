import {CellInput, getCell} from "./CellsInputProcess.ts";
import {Graph} from "@antv/x6";

/**
 * 聚焦 cell，将移动画布并选中 cell
 */
export const focus = (graph: Graph, cellInput: CellInput) => {
    const cell = getCell(graph, cellInput)

    cell.toFront()
    graph.cleanSelection()
    graph.centerCell(cell)
    graph.select(cell)
}