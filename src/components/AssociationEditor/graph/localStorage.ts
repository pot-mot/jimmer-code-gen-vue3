import {Graph} from "@antv/x6";
import {sendMessage} from "../../../utils/message.ts";

export const saveGraph = (graph: Graph) => {
    if (!graph) return

    try {
        graph.cleanSelection()
        localStorage.setItem('graph', JSON.stringify(graph.toJSON()))
        localStorage.setItem('zoom', JSON.stringify(graph.zoom()))
        localStorage.setItem('transform', JSON.stringify(graph.view.viewport.getAttribute('transform')))

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

            const zoom = localStorage.getItem('zoom')
            if (zoom) {
                graph.zoomTo(JSON.parse(zoom))
            }

            const transform = localStorage.getItem('transform')
            if (transform) {
                graph.view.viewport.setAttribute('transform', JSON.parse(transform))
            }
        } catch (e) {
            sendMessage('恢复编辑区失败', 'error', e)
            clearGraph(graph)
        }
    }
}

export const clearGraph = (graph: Graph) => {
    localStorage.removeItem('graph')
    if (graph) graph.clearCells()
}