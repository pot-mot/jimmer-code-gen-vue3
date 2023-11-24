import {Edge, Graph, Node} from "@antv/x6";
import {SelectType} from "@/api/__generated/model/enums";
import {PortManager} from "@antv/x6/es/model/port";
import {columnIdToPortId} from "@/components/pages/AssociationEditor/graph/node/ColumnPort.ts";

export const searchNodeByTableName = (graph: Graph, tableName: string): Node | undefined => {
    return graph.getNodes().filter(node => node.getData().table.name == tableName)[0]
}

export const matchByKeywords = (target: {name: string, comment: string}, keywords: string[]): boolean => {
    for (let keyword of keywords) {
        if (
            target.name.includes(keyword) ||
            target.comment.includes(keyword)
        ) {
            return true
        }
    }
    return false
}

export const matchNode = (node: Node, keywords: string[]): boolean => matchByKeywords(node.getData().table, keywords)

export const searchPortByColumnName = (node: Node, columnName: string): PortManager.PortMetadata | undefined => {
    return node.getPorts().filter(port => port.data.column.name == columnName)[0]
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

export const searchEdgesByColumn = (graph: Graph, sourceColumnId: number, targetColumnId: number) => {
    return searchEdgesByPort(graph, {
        sourcePortId: columnIdToPortId(sourceColumnId),
        targetPortId: columnIdToPortId(targetColumnId)
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
