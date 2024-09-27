import {Edge, Graph, Node} from "@antv/x6";
import {searchEdgesByNode} from "@/components/pages/ModelEditor/search/graphSearch.ts";
import {CellProperty, getFirst} from "../common/cellsInputProcess.ts";

export interface SelectOperation {
    select: (cells: CellProperty | CellProperty[]) => void
    unselect: (cells: CellProperty | CellProperty[]) => void
    toggleSelect: (cells: CellProperty | CellProperty[]) => void
    selectAll: () => void
    getSelectedNodes: () => Node[]
    getSelectedEdges: () => Edge[]
    getSelectedNodeConnectedEdges: () => Edge[]
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
    }
}

const selectAll = (graph: Graph) => {
    graph.resetSelection(graph.getCells())
}

const unselect = (graph: Graph, cells: CellProperty | CellProperty[]) => {
    graph.unselect(cells)
}

const select = (graph: Graph, cells: CellProperty | CellProperty[]) => {
    graph.select(cells)
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

export const getSelectedNodeConnectedEdges = (graph: Graph): Edge[] => {
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
