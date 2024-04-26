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
    onBeforeDelete: (graph: Graph, cells: Cell[], target: string) => void = () => {
    },
    onDeleted: (graph: Graph, cells: Cell[], target: string) => void = () => {
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
            return commonRemove('removeCells', cells, graph, onBeforeDelete, onDeleted)
        },
        removeNodes: (nodeInputs) => {
            const graph = _graph()
            const nodes =
                nodeInputs.map(it =>
                    typeof it === 'string' ? graph.model.collection.get(it) as Cell | undefined : it)
                    .filter(it => it?.isNode()) as Node[]
            return commonRemove('removeNodes', nodes, graph, onBeforeDelete, onDeleted)
        },
        removeEdges: (edgeInputs) => {
            const graph = _graph()
            const edges =
                edgeInputs.map(it =>
                    typeof it === 'string' ? graph.model.collection.get(it) as Cell | undefined : it)
                    .filter(it => it?.isEdge()) as Edge[]
            return commonRemove('removeEdges', edges, graph, onBeforeDelete, onDeleted)
        },

        removeAllCells: () => {
            const graph = _graph()
            const cells = graph.getCells()
            return commonRemove('removeAllCells', cells, graph, onBeforeDelete, onDeleted)
        },
        removeAllNodes: () => {
            const graph = _graph()
            const nodes = graph.getNodes()
            return commonRemove('removeAllNodes', nodes, graph, onBeforeDelete, onDeleted)
        },
        removeAllEdges: () => {
            const graph = _graph()
            const edges = graph.getEdges()
            return commonRemove('removeAllEdges', edges, graph, onBeforeDelete, onDeleted)
        },

        removeSelectedCells: () => {
            const graph = _graph()
            const cells = graph.getSelectedCells()
            return commonRemove('removeSelectedCells', cells, graph, onBeforeDelete, onDeleted)
        },
        removeSelectedNodes: () => {
            const graph = _graph()
            const nodes = getSelectedNodes(graph)
            return commonRemove('removeSelectedNodes', nodes, graph, onBeforeDelete, onDeleted)
        },
        removeSelectedEdges: () => {
            const graph = _graph()
            const edges = getSelectedEdges(graph)
            return commonRemove('removeSelectedEdges', edges, graph, onBeforeDelete, onDeleted)
        },
    }
}

const commonRemove = <T extends Cell>(
    target: string,
    cells: T[],
    graph: Graph,
    onBeforeDelete: (graph: Graph, cells: Cell[], target: string) => void,
    onDeleted: (graph: Graph, cells: Cell[], target: string) => void
): T[] => {
    onBeforeDelete(graph, cells, target)
    graph.unselect(cells)
    graph.removeCells(cells)
    onDeleted(graph, cells, target)
    return cells
}
