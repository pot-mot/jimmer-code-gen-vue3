import {Edge, Graph, Node} from "@antv/x6";
import {searchEdgesByNode} from "./search.ts";

export const getSelectedNodes = (graph: Graph): Node[] => {
    return graph.getSelectedCells().filter(cell => cell.isNode()).map(cell => cell as Node)
}

export const getSelectedEdges = (graph: Graph): Edge[] => {
    const selectedNodes = getSelectedNodes(graph)
    const baseSelectedEdges = graph.getSelectedCells().filter(cell => cell.isEdge()).map(cell => cell as Edge)

    const edgeIdSet = new Set(baseSelectedEdges.map(it => it.id))

    selectedNodes.forEach(node => {
        const selectEdges = searchEdgesByNode(graph, {
            targetNodeId: node.id,
            sourceNodeId: node.id,
            selectType: 'OR'
        })

        selectEdges.forEach(edge => {
            if (!edgeIdSet.has(edge.id)) {
                baseSelectedEdges.push(edge)
                edgeIdSet.add(edge.id)
            }
        })
    })

    return baseSelectedEdges
}