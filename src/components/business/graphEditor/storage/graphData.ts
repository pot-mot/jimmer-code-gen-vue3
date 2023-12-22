import {Cell, Graph} from "@antv/x6";
import {unStyleAll} from "@/components/business/modelGraphEditor/highlight.ts";

export type GraphEditorData = {
    json: { cells: Cell.Properties[] },
    zoom: number,
    transform: string | null
}
export const useGraphDataOperation = (_graph: () => Graph) => {
    return {
        toData: (): GraphEditorData => graphToEditorData(_graph()),
        loadGraphByData: (data: GraphEditorData) => loadGraphFromEditorData(_graph(), data),
        toDataJSONStr: (): string => JSON.stringify(graphToEditorData(_graph())),
        loadGraphByJSONStr: (JSONStr: string) => loadGraphFromEditorData(_graph(), JSON.parse(JSONStr)),
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
export const loadGraphFromEditorData = (graph: Graph, data: GraphEditorData) => {
    const {json, zoom, transform} = data

    graph.startBatch('load from JSON')

    // 预先移除所有过去的 cells
    graph.removeCells(graph.getCells())

    graph.fromJSON(json)

    // 通过移除和重新添加的方式触发 node:added 和 edge:added
    const tempNodes = graph.getNodes()
    const tempEdges = graph.getEdges()
    graph.removeCells(graph.getCells())
    graph.addNodes(tempNodes)
    graph.addEdges(tempEdges)

    graph.zoomTo(zoom)

    if (transform) {
        graph.view.viewport.setAttribute('transform', transform)
    }

    graph.stopBatch('load from JSON')
}
