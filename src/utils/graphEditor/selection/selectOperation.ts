import {Edge, Graph, Node} from "@antv/x6";
import {searchEdgesByNode} from "../search.ts";
import {CellInput, getFirst, process} from "../CellsInputProcess.ts";

export const useSelectOperation = (_graph: () => Graph) => {
    return {
        select: (cells: CellInput | CellInput[]) => select(_graph(), cells),
        unselect: (cells: CellInput | CellInput[]) => unselect(_graph(), cells),
        toggleSelect: (cells: CellInput | CellInput[]) => toggleSelect(_graph(), cells),
        selectAll: () => selectAll(_graph()),
        getSelectedEdges: () => getSelectedEdges(_graph()),
        getSelectedNodes: () => getSelectedNodes(_graph()),
        removeSelectedCells: () => removeSelectedCells(_graph()),
        removeSelectedNodes: () => removeSelectedNodes(_graph()),
        removeSelectedEdges: () => removeSelectedEdges(_graph()),
    }
}

export const selectAll = (graph: Graph) => {
    graph.resetSelection(graph.getCells())
}

export const unselect = (graph: Graph, cells: CellInput | CellInput[]) => {
    graph.unselect(process(cells))
}

export const select = (graph: Graph, cells: CellInput | CellInput[]) => {
    graph.select(process(cells))
}

/**
 * 切换 cell 选中状态
 */
export const toggleSelect = (graph: Graph, cells: CellInput | CellInput[]) => {
    const firstCell = getFirst(cells)
    if (firstCell && graph.isSelected(firstCell)) {
        graph.unselect(process(cells))
    } else {
        graph.select(process(cells))
    }
}

export const getSelectedNodes = (graph: Graph): Node[] => {
    return graph.getSelectedCells().filter(cell => cell.isNode()).map(cell => cell as Node)
}

export const getSelectedEdges = (graph: Graph): Edge[] => {
    const selectedNodes = getSelectedNodes(graph)
    const baseSelectedEdges = graph.getSelectedCells().filter(cell => cell.isEdge()).map(cell => cell as Edge)

    const edgeIdSet = new Set(baseSelectedEdges.map(it => it.id))

    selectedNodes.forEach(node => {
        const selectEdges = searchEdgesByNode(graph, {
            targetNodeId: node.id,
            sourceNodeId: node.id,
            selectType: 'OR'
        })

        selectEdges.forEach(edge => {
            if (!edgeIdSet.has(edge.id)) {
                baseSelectedEdges.push(edge)
                edgeIdSet.add(edge.id)
            }
        })
    })

    return baseSelectedEdges
}

export const removeSelectedCells = (graph: Graph) => {
    const cells = graph.getSelectedCells()
    graph.unselect(cells)
    graph.removeCells(cells)
}

export const removeSelectedNodes = (graph: Graph) => {
    const nodes = getSelectedNodes(graph)
    graph.unselect(nodes)
    graph.removeCells(nodes)
}

export const removeSelectedEdges = (graph: Graph) => {
    const edges = getSelectedEdges(graph)
    graph.unselect(edges)
    graph.removeCells(edges)
}