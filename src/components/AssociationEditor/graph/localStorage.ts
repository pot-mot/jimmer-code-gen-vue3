import {Graph} from "@antv/x6";
import {sendMessage} from "../../../utils/message.ts";

export const saveGraph = (graph: Graph) => {
    if (!graph) return

    try {
        graph.cleanSelection()
        localStorage.setItem('graph', JSON.stringify(graph.toJSON()))
        sendMessage("编辑区保存成功", "success")
    } catch (e) {
        clearGraph(graph)
        sendMessage("编辑区保存失败", "error", e)
    }
}

export const loadGraph = (graph: Graph) => {
    if (!graph) return

    const graphStr = localStorage.getItem('graph')
    if (graphStr) {
        try {
            graph.fromJSON(JSON.parse(graphStr))
        } catch (e) {
            console.warn(e, graphStr)
            clearGraph(graph)
        }
    }
}

export const clearGraph = (graph: Graph) => {
    localStorage.removeItem('graph')
    if (graph) graph.clearCells()
}