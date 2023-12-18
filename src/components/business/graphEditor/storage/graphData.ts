import {Cell, Graph} from "@antv/x6";
import {unStyleAll} from "@/components/business/graphEditor/common/highlight.ts";

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

    graph.fromJSON(json)

    // 触发 node:added 和 edge:added
    const tempNodes = graph.getNodes()
    const tempEdges = graph.getEdges()
    graph.removeCells(tempEdges)
    graph.removeCells(tempNodes)
    graph.addNodes(tempNodes)
    graph.addEdges(tempEdges)

    graph.zoomTo(zoom)

    if (transform) {
        graph.view.viewport.setAttribute('transform', transform)
    }
}
