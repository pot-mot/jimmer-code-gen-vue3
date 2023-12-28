import {Cell, Node, Edge, Graph} from "@antv/x6";
import {unStyleAll} from "@/components/business/modelGraphEditor/highlight.ts";

export type GraphEditorData = {
    json: { cells: Cell.Properties[] },
    zoom: number,
    transform: string | null
}
export const useGraphDataOperation = (_graph: () => Graph) => {
    return {
        toData: (): GraphEditorData => graphToEditorData(_graph()),
        loadGraphByData: (data: GraphEditorData) => {
            loadEditorData(_graph(), data)
        },
        toDataJSONStr: (): string => JSON.stringify(graphToEditorData(_graph())),
        loadGraphByJSONStr: (JSONStr: string) => {
            loadEditorData(_graph(), JSON.parse(JSONStr))
        },
    }
}
export const graphToEditorData = (graph: Graph): GraphEditorData => {
    unStyleAll(graph)

    return {
        json: graph.toJSON(),
        zoom: graph.zoom(),
        transform: graph.view.viewport.getAttribute('transform')
    }
}
export const loadEditorData = (graph: Graph, data: GraphEditorData, reset: boolean = true) => {
    const {json, zoom, transform} = data

    graph.startBatch('load from JSON')

    // 预先移除所有过去的 cells
    if (reset) graph.removeCells(graph.getCells())

    const cells = graph.parseJSON(json)
    const nodes = <Node[]>cells.filter(it => it.isNode())
    const edges = <Edge[]>cells.filter(it => it.isEdge())

    graph.addNodes(nodes)
    graph.addEdges(edges)

    graph.zoomTo(zoom)

    if (transform) {
        graph.view.viewport.setAttribute('transform', transform)
    }

    graph.stopBatch('load from JSON')

    return {nodes, edges}
}
