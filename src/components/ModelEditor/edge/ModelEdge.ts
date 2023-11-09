import {Edge, Graph} from "@antv/x6";
import {getAssociationType} from "../../AssociationEditor/edge/AssociationEdge.ts";
import {searchNodeByTableName, searchPortByColumnName} from "../../../utils/graphEditor/search.ts";
import {GenAssociationModelInput} from "../../../api/__generated/model/static";
import {sendMessage} from "../../../utils/message.ts";

export interface EdgeData extends GenAssociationModelInput {
    edge: Edge
}

export const edgeToModelAssociation = (edge: Edge): GenAssociationModelInput => {
    const sourceNode = edge.getSourceNode()
    const targetNode = edge.getTargetNode()
    const sourcePortId = edge.getSourcePortId()
    const targetPortId = edge.getTargetPortId()
    if (!sourceNode || !targetNode || !sourcePortId || !targetPortId) {
        sendMessage('association 关联数据解析出错')
        throw new Error
    }

    const sourcePort = sourceNode.getPort(sourcePortId)
    const targetPort = targetNode.getPort(targetPortId)
    if (!sourcePort || !targetPort) {
        sendMessage('association 关联数据解析出错')
        throw new Error
    }

    const sourceTable = sourceNode.getData().table
    const sourceColumn = sourcePort.data.column
    const targetTable = targetNode.getData().table
    const targetColumn = targetPort.data.column
    if (!sourceTable || !sourceColumn || !targetTable || !targetColumn) {
        sendMessage('association 关联数据解析出错')
        throw new Error
    }

    return {
        sourceColumn: {
            name: sourceColumn.name,
            type: sourceColumn.type,

            table: {
                name: sourceTable.name,
                comment: sourceTable.comment,
            }
        },
        targetColumn: {
            name: targetColumn.name,
            type: targetColumn.type,

            table: {
                name: targetTable.name,
                comment: targetTable.comment,
            }
        },
        associationType: getAssociationType(edge),
    }
}

export const edgeToData = (edge: Edge): EdgeData => {
    return {
        ...edgeToModelAssociation(edge),
        edge,
    }
}

export const dataToEdge = (graph: Graph, data: EdgeData): Edge | undefined => {
    const sourceNode = searchNodeByTableName(graph, data.sourceColumn.table.name)
    const targetNode = searchNodeByTableName(graph, data.targetColumn.table.name)

    if (!sourceNode || !targetNode) return

    const sourcePort = searchPortByColumnName(sourceNode, data.sourceColumn.name)
    const targetPort = searchPortByColumnName(targetNode, data.targetColumn.name)

    if (!sourcePort || !targetPort) return

    data.edge.setSource({cell: sourceNode.id, port: sourcePort.id})
    data.edge.setTarget({cell: targetNode.id, port: targetPort.id})

    return data.edge
}