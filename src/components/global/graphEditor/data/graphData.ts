import {Cell, Edge, Graph, Node} from "@antv/x6";
import {DeepReadonly} from "vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";

export type GraphData = {
    json: { cells: Cell.Properties[] },
    zoom: number,
    transform: string | undefined
}

export interface GraphDataOperation {
    getGraphData: () => DeepReadonly<GraphData>
    loadGraphData: (graphData: DeepReadonly<GraphData>, reset: boolean) => { nodes: Node[], edges: Edge[] }
}

export const useGraphDataOperation = (_graph: () => Graph): GraphDataOperation => {
    return {
        getGraphData: () => {
            return getGraphData(_graph())
        },
        loadGraphData: (graphData: DeepReadonly<GraphData>, reset: boolean = true) => {
            return loadGraphData(_graph(), graphData, reset)
        },
    }
}
const getGraphData = (graph: Graph): DeepReadonly<GraphData> => {
    return {
        json: graph.toJSON(),
        zoom: graph.zoom(),
        transform: graph.view.viewport.getAttribute('transform') ?? undefined
    }
}

/**
 * 向图中导入 GraphData
 * @param graph 图
 * @param data 深度只读数据
 * @param reset 重置，若设置为 true，则移除图中原有的 cells，不然则只是添加
 */
const loadGraphData = (graph: Graph, data: DeepReadonly<GraphData>, reset: boolean) => {
    const {json, zoom, transform} = data

    graph.startBatch('Load from JSON')

    // 预先移除所有过去的 cells
    if (reset) graph.removeCells(graph.getCells())

    const cells = graph.parseJSON(cloneDeepReadonly<GraphData["json"]>(json))
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
