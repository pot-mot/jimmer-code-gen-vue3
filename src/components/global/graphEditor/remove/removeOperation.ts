import {Cell, Edge, Graph, Node} from "@antv/x6";
import {getSelectedEdges, getSelectedNodes} from "@/components/global/graphEditor/selection/selectOperation.ts";

export interface RemoveOperation {
    removeCells: (cellInputs: (string | Cell)[]) => Cell[]
    removeNodes: (nodeInputs: (string | Node)[]) => Node[]
    removeEdges: (edgeInputs: (string | Edge)[]) => Edge[]
    removeAllCells: () => Cell[]
    removeAllNodes: () => Node[]
    removeAllEdges: () => Edge[]
    removeSelectedCells: () => Cell[]
    removeSelectedNodes: () => Node[]
    removeSelectedEdges: () => Edge[]
}

export const useRemoveOperation = (
    _graph: () => Graph,
    onBeforeDelete: (graph: Graph, cells: Cell[]) => void = () => {
    },
    onDeleted: (graph: Graph, cells: Cell[]) => void = () => {
    },
): RemoveOperation => {
    return {
        removeCells: (cellInputs) => {
            const graph = _graph()
            const cells =
                cellInputs
                    .map(it =>
                        typeof it === 'string' ? graph.model.collection.get(it) as Cell | undefined : it)
                    .filter(it => it !== undefined) as Cell[]
            return commonRemove(cells, graph, onBeforeDelete, onDeleted)
        },
        removeNodes: (nodeInputs) => {
            const graph = _graph()
            const nodes =
                nodeInputs.map(it =>
                    typeof it === 'string' ? graph.model.collection.get(it) as Cell | undefined : it)
                    .filter(it => it?.isNode()) as Node[]
            return commonRemove(nodes, graph, onBeforeDelete, onDeleted)
        },
        removeEdges: (edgeInputs) => {
            const graph = _graph()
            const edges =
                edgeInputs.map(it =>
                    typeof it === 'string' ? graph.model.collection.get(it) as Cell | undefined : it)
                    .filter(it => it?.isEdge()) as Edge[]
            return commonRemove(edges, graph, onBeforeDelete, onDeleted)
        },

        removeAllCells: () => {
            const graph = _graph()
            const cells = graph.getCells()
            return commonRemove(cells, graph, onBeforeDelete, onDeleted)
        },
        removeAllNodes: () => {
            const graph = _graph()
            const nodes = graph.getNodes()
            return commonRemove(nodes, graph, onBeforeDelete, onDeleted)
        },
        removeAllEdges: () => {
            const graph = _graph()
            const edges = graph.getEdges()
            return commonRemove(edges, graph, onBeforeDelete, onDeleted)
        },

        removeSelectedCells: () => {
            const graph = _graph()
            const cells = graph.getSelectedCells()
            return commonRemove(cells, graph, onBeforeDelete, onDeleted)
        },
        removeSelectedNodes: () => {
            const graph = _graph()
            const nodes = getSelectedNodes(graph)
            return commonRemove(nodes, graph, onBeforeDelete, onDeleted)
        },
        removeSelectedEdges: () => {
            const graph = _graph()
            const edges = getSelectedEdges(graph)
            return commonRemove(edges, graph, onBeforeDelete, onDeleted)
        },
    }
}

const commonRemove = <T extends Cell>(
    cells: T[],
    graph: Graph,
    onBeforeDelete: (graph: Graph, cells: Cell[]) => void,
    onDeleted: (graph: Graph, cells: Cell[]) => void
): T[] => {
    onBeforeDelete(graph, cells)
    graph.unselect(cells)
    graph.removeCells(cells)
    onDeleted(graph, cells)
    return cells
}
