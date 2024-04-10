import {Cell, Edge, Graph, Node} from "@antv/x6";

export type GraphEditorData = {
    json: { cells: Cell.Properties[] },
    zoom: number,
    transform: string | null
}

export interface GraphDataOperation {
    getGraphData: () => string
    loadGraphData: (jsonStr: string, reset: boolean) => { nodes: Node[], edges: Edge[] }
}

export const useGraphDataOperation = (_graph: () => Graph): GraphDataOperation => {
    return {
        getGraphData: () => {
            return JSON.stringify(graphToEditorData(_graph()))
        },
        loadGraphData: (jsonStr: string, reset: boolean = true) => {
            return loadEditorData(_graph(), JSON.parse(jsonStr), reset)
        },
    }
}
const graphToEditorData = (graph: Graph): GraphEditorData => {
    return {
        json: graph.toJSON(),
        zoom: graph.zoom(),
        transform: graph.view.viewport.getAttribute('transform')
    }
}
const loadEditorData = (graph: Graph, data: GraphEditorData, reset: boolean) => {
    const {json, zoom, transform} = data

    graph.startBatch('Load from JSON')

    // 预先移除所有过去的 cells
    if (reset) graph.removeCells(graph.getCells())

    const cells = graph.parseJSON(json)
    const nodes = <Node[]>cells.filter(it => it.isNode())
    const edges = <Edge[]>cells.filter(it => it.isEdge())

    const insertedNodes = nodes.map(it => graph.addNode(it))
    const insertedEdges = edges.map(it => graph.addEdge(it))

    graph.zoomTo(zoom)

    if (transform) {
        graph.view.viewport.setAttribute('transform', transform)
    }

    graph.stopBatch('Load from JSON')

    return {nodes: insertedNodes, edges: insertedEdges}
}
