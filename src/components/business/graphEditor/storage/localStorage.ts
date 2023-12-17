import {Graph} from "@antv/x6";
import {sendMessage} from "@/utils/message.ts";
import {
    GraphEditorData,
    graphToEditorData,
    loadGraphFromEditorData
} from "@/components/business/graphEditor/storage/graphData.ts";

export const useGraphLocalStorage = (_graph: () => Graph, name: string) => {
    return {
        saveGraph: () => saveGraph(_graph(), name),
        loadGraph: (canUnload: boolean = true) => loadGraph(_graph(), name, canUnload),
        clearGraph: () => clearGraph(_graph(), name)
    }
}

const saveGraph = (graph: Graph, name: string, message: boolean = false) => {
    if (!graph) return

    try {
        graph.cleanSelection()

        localStorage.setItem(name, JSON.stringify(
            graphToEditorData(graph)
        ))

        if (message) {
            sendMessage("编辑区保存成功", "success")
        }
    } catch (e) {
        clearGraph(graph, name)
        if (message) {
            sendMessage("编辑区保存失败", "error", e)
        }
    }
}

/**
 * 从本地缓存中加载图像
 * @param graph
 * @param name
 * @param canUnload 可以在初始时不存在
 */
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
    if (graph) graph.removeCells(graph.getCells())
}
