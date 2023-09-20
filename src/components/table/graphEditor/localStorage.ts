import {Graph} from "@antv/x6";

export const saveGraph = (graph: Graph) => {
    try {
        localStorage.setItem('graph', JSON.stringify(graph.toJSON()))

        alert("保存成功")
    } catch (e) {
        alert(`保存失败：${e}`)
    }
}

export const loadGraph = (graph: Graph) => {
    const graphStr = localStorage.getItem('graph')
    if (graphStr) {
        try {
            graph.fromJSON(JSON.parse(graphStr))
        } catch (e) {
            console.warn(e, graphStr)
        }
    }
}