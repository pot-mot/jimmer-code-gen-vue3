import {Edge, Graph, Node} from "@antv/x6";
import {CellProperty, getFirst} from "@/components/global/graphEditor/inputProcess/cellsInputProcess.ts";
import {searchEdgesByNode} from "@/components/global/graphEditor/search/graphSearch.ts";

export interface GraphSelectOperation {
    select: (cells: CellProperty | CellProperty[]) => void
    unselect: (cells: CellProperty | CellProperty[]) => void
    toggleSelect: (cells: CellProperty | CellProperty[]) => void
    resetSelect: (cells: CellProperty | CellProperty[]) => void
    selectAll: () => void
    unselectAll: () => void
    getSelectedNodes: () => Node[]
    getSelectedEdges: () => Edge[]
}

export const useSelectOperation = (_graph: () => Graph): GraphSelectOperation => {
    return {
        select: (cells: CellProperty | CellProperty[]) => select(_graph(), cells),
        unselect: (cells: CellProperty | CellProperty[]) => unselect(_graph(), cells),
        toggleSelect: (cells: CellProperty | CellProperty[]) => toggleSelect(_graph(), cells),
        resetSelect: (cells: CellProperty | CellProperty[]) => resetSelect(_graph(), cells),
        selectAll: () => selectAll(_graph()),
        unselectAll: () => unselectAll(_graph()),
        getSelectedNodes: () => getSelectedNodes(_graph()),
        getSelectedEdges: () => getSelectedEdges(_graph()),
    }
}

const selectAll = (graph: Graph) => {
    graph.resetSelection(graph.getCells())
}

const unselectAll = (graph: Graph) => {
    graph.resetSelection()
}

const unselect = (graph: Graph, cells: CellProperty | CellProperty[]) => {
    graph.unselect(cells)
}

const select = (graph: Graph, cells: CellProperty | CellProperty[]) => {
    graph.select(cells)
}

const resetSelect = (graph: Graph, cells: CellProperty | CellProperty[]) => {
    graph.resetSelection(cells)
}

/**
 * 切换 cell 选中状态
 */
const toggleSelect = (graph: Graph, cells: CellProperty | CellProperty[]) => {
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

export const getNodeConnectedEdges = (graph: Graph, nodeIds: string[]): Edge[] => {
    const connectedEdges: Edge[] = []

    for (const nodeId of nodeIds) {
        const selectEdges = searchEdgesByNode(graph, {
            targetNodeId: nodeId,
            sourceNodeId: nodeId,
            selectType: 'OR'
        })

        connectedEdges.push(...selectEdges)
    }

    return connectedEdges
}
