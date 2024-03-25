import {Edge, Graph, Node} from "@antv/x6";
import {SelectType} from "@/api/__generated/model/enums";

export const matchByKeywords = <T extends {[key: string]: any}> (target: T, keywords: string[], props: Array<keyof T> = ['name', 'comment']): boolean => {
    for (let keyword of keywords) {
        for (let prop of props) {
            if (target[prop].includes(keyword)) {
                return true
            }
        }
    }
    return false
}

const matchNode = (node: Node, keywords: string[]): boolean => {
    const table = node.getData().table
    if (table && Object.keys(table).includes('name') && Object.keys(table).includes('comment')) {
        return matchByKeywords(node.getData().table, keywords)
    }
    return false
}

export const searchNodesByKeywords = (graph: Graph, keywords: string[]) => {
    return graph.getNodes().filter(node => matchNode(node, keywords))
}

export const searchEdgesByNode = (
    graph: Graph,
    opt: {
        sourceNodeId?: string,
        targetNodeId?: string,
        selectType?: SelectType
    }
): Edge[] => {
    return graph.getEdges().filter(
        edge => {
            let sourceFlag = true
            let targetFlag = true

            if (opt.sourceNodeId) {
                sourceFlag = edge.getSourceNode()?.id === opt.sourceNodeId
            }
            if (opt.targetNodeId) {
                targetFlag = edge.getTargetNode()?.id === opt.targetNodeId
            }

            if (!opt.selectType || opt.selectType === 'AND') {
                return targetFlag && sourceFlag
            } else {
                return targetFlag || sourceFlag
            }
        })
}
