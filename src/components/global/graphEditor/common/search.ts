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

export const searchNodesByNames = (graph: Graph, names: string[]) => {
    return graph.getNodes().filter(node => names.includes(node.getData()?.table?.name))
}

/**
 * 判断节点是否存在
 * @param graph
 * @param nodeId
 */
export const nodeIsExist = (graph: Graph, nodeId: string): boolean => {
    const cell = graph.getCellById(nodeId)
    return cell && cell.isNode()
}

/**
 * 寻找 Edge
 */
export const searchEdgesByPort = (
    graph: Graph,
    opt: {
        sourcePortId?: string
        targetPortId?: string
        selectType?: SelectType
    }
): Edge[] => {
    return graph.getEdges().filter(
        edge => {
            let sourceFlag = true
            let targetFlag = true

            if (opt.sourcePortId) {
                sourceFlag = edge.getSourcePortId() == opt.sourcePortId
            }
            if (opt.targetPortId) {
                targetFlag = edge.getTargetPortId() == opt.targetPortId
            }

            if (!opt.selectType || opt.selectType == 'AND') {
                return targetFlag && sourceFlag
            } else {
                return targetFlag || sourceFlag
            }
        })
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
                sourceFlag = edge.getSourceNode()?.id == opt.sourceNodeId
            }
            if (opt.targetNodeId) {
                targetFlag = edge.getTargetNode()?.id == opt.targetNodeId
            }

            if (!opt.selectType || opt.selectType == 'AND') {
                return targetFlag && sourceFlag
            } else {
                return targetFlag || sourceFlag
            }
        })
}

/**
 * 寻找 Edge，忽视方向
 * @param graph 图
 * @param port1 连接桩1
 * @param port2 连接桩2
 * @returns Edge 数组
 */
export const searchEdgesIgnoreDirection = (graph: Graph, port1: string, port2: string): Edge[] => {
    return graph.getEdges().filter(
        edge =>
            (edge.getTargetPortId() == port1 && edge.getSourcePortId() == port2) ||
            (edge.getTargetPortId() == port2 && edge.getSourcePortId() == port1)
    )
}
