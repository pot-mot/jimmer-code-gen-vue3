import {Graph, Cell} from "@antv/x6";
import {sendMessage} from "../../../utils/message.ts";

type GraphEditorData = {
    json: {cells: Cell.Properties[]},
    zoom: number,
    transform: string | null
}

export const useLocalStorageOperation = (_graph: () => Graph, name: string) => {
    return {
        saveGraph: () => saveGraph(_graph(), name),
        loadGraph: (canUnload: boolean = true) => loadGraph(_graph(), name, canUnload),
        clearGraph: () => clearGraph(_graph(), name)
    }
}

const graphToEditorData = (graph: Graph): GraphEditorData => {
    return {
        json: graph.toJSON(),
        zoom: graph.zoom(),
        transform: graph.view.viewport.getAttribute('transform')
    }
}

const loadGraphFromEditorData = (graph: Graph, data: GraphEditorData) => {
    const {json, zoom, transform} = data

    graph.fromJSON(json)
    graph.zoomTo(zoom)

    if (transform) {
        graph.view.viewport.setAttribute('transform', transform)
    }
}


export const saveGraph = (graph: Graph, name: string) => {
    if (!graph) return

    try {
        graph.cleanSelection()

        localStorage.setItem(name, JSON.stringify(
            graphToEditorData(graph)
        ))

        sendMessage("编辑区保存成功", "success")
    } catch (e) {
        clearGraph(graph, name)
        sendMessage("编辑区保存失败", "error", e)
    }
}

export const loadGraph = (graph: Graph, name: string, canUnload: boolean = true) => {
    if (!graph) return

    try {
        const editorDataStr = localStorage.getItem(name)

        if (!editorDataStr) {
            if (!canUnload) {
                sendMessage('未找到对应本地存储，无法正常加载', 'warning')
            }
            return
        }

        const editorData: GraphEditorData = JSON.parse(editorDataStr)

        loadGraphFromEditorData(graph, editorData)
    } catch (e) {
        sendMessage('恢复编辑区失败', 'error', e)
        clearGraph(graph, name)
    }
}

export const clearGraph = (graph: Graph, name: string) => {
    localStorage.removeItem(name)
    // 为了避免错误数据残留，必须也清空原图
    if (graph) graph.clearCells()
}