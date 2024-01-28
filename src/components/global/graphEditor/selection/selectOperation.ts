import {Edge, Graph, Node, Cell} from "@antv/x6";
import {searchEdgesByNode} from "../common/search.ts";
import {CellProperty, getFirst} from "../common/cellsInputProcess.ts";

export interface SelectOperation {
    select: (cells: CellProperty | CellProperty[]) => void
    unselect: (cells: CellProperty | CellProperty[]) => void
    toggleSelect: (cells: CellProperty | CellProperty[]) => void
    selectAll: () => void
    getSelectedNodes: () => Node[]
    getSelectedEdges: () => Edge[]
    getSelectedNodeConnectedEdges: () => Edge[]
    removeSelectedCells: () => Cell[]
    removeSelectedNodes: () => Node[]
    removeSelectedEdges: () => Edge[]
}

export const useSelectOperation = (_graph: () => Graph): SelectOperation => {
    return {
        select: (cells: CellProperty | CellProperty[]) => select(_graph(), cells),
        unselect: (cells: CellProperty | CellProperty[]) => unselect(_graph(), cells),
        toggleSelect: (cells: CellProperty | CellProperty[]) => toggleSelect(_graph(), cells),
        selectAll: () => selectAll(_graph()),
        getSelectedNodes: () => getSelectedNodes(_graph()),
        getSelectedEdges: () => getSelectedEdges(_graph()),
        getSelectedNodeConnectedEdges: () => getSelectedNodeConnectedEdges(_graph()),
        removeSelectedCells: () => removeSelectedCells(_graph()),
        removeSelectedNodes: () => removeSelectedNodes(_graph()),
        removeSelectedEdges: () => removeSelectedEdges(_graph()),
    }
}

export const selectAll = (graph: Graph) => {
    graph.resetSelection(graph.getCells())
}

export const unselect = (graph: Graph, cells: CellProperty | CellProperty[]) => {
    graph.unselect(cells)
}

export const select = (graph: Graph, cells: CellProperty | CellProperty[]) => {
    graph.select(cells)
}

/**
 * 切换 cell 选中状态
 */
export const toggleSelect = (graph: Graph, cells: CellProperty | CellProperty[]) => {
    const firstCell = getFirst(cells)
    if (firstCell && graph.isSelected(firstCell)) {
        graph.unselect(cells)
    } else {
        graph.select(cells)
    }
}

export const getSelectedNodes = (graph: Graph): Node[] => {
    return graph.getSelectedCells().filter(cell => cell.isNode()).map(cell => cell as Node)
}

export const getSelectedEdges = (graph: Graph): Edge[] => {
    return graph.getSelectedCells().filter(cell => cell.isEdge()).map(cell => cell as Edge)
}

export const getSelectedNodeConnectedEdges =  (graph: Graph): Edge[] => {
    const selectedNodes = getSelectedNodes(graph)

    const connectedEdges: Edge[] = []

    selectedNodes.forEach(node => {
        const selectEdges = searchEdgesByNode(graph, {
            targetNodeId: node.id,
            sourceNodeId: node.id,
            selectType: 'OR'
        })

        selectEdges.forEach(edge => {
            connectedEdges.push(edge)
        })
    })

    return connectedEdges
}

export const removeSelectedCells = (graph: Graph) => {
    const cells = graph.getSelectedCells()
    graph.unselect(cells)
    graph.removeCells(cells)
    return cells
}

export const removeSelectedNodes = (graph: Graph) => {
    const nodes = getSelectedNodes(graph)
    graph.unselect(nodes)
    graph.removeCells(nodes)
    return nodes
}

export const removeSelectedEdges = (graph: Graph) => {
    const edges = getSelectedEdges(graph)
    graph.unselect(edges)
    graph.removeCells(edges)
    return edges
}
