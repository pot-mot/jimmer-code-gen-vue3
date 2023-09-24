import {Graph} from "@antv/x6";

export const saveGraph = (graph: Graph) => {
    if (!graph) return

    try {
        graph.cleanSelection()
        localStorage.setItem('graph', JSON.stringify(graph.toJSON()))
        alert("保存成功")
    } catch (e) {
        clearGraph(graph)
        alert("保存失败")
        console.error(e)
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