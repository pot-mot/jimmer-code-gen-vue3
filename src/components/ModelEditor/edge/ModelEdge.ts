import {Edge, Graph} from "@antv/x6";
import {getAssociationType} from "../../AssociationEditor/edge/AssociationEdge.ts";
import {searchNodeByTableName, searchPortByColumnName} from "../../../utils/graphEditor/search.ts";
import {GenAssociationModelInput, GenTableColumnsInput} from "../../../api/__generated/model/static";

export interface EdgeData extends GenAssociationModelInput {
    edge: Edge
}

export const getEdgeConnect = (edge: Edge) => {
    const sourceNode = edge.getSourceNode()
    const targetNode = edge.getTargetNode()
    const sourcePortId = edge.getSourcePortId()
    const targetPortId = edge.getTargetPortId()
    if (!sourceNode || !targetNode || !sourcePortId || !targetPortId) {
        return
    }

    const sourcePort = sourceNode.getPort(sourcePortId)
    const targetPort = targetNode.getPort(targetPortId)
    if (!sourcePort || !targetPort) {
        return
    }

    return {
        sourceNode,
        sourcePort,
        targetNode,
        targetPort
    }
}

export const getEdgeConnectData = (edge: Edge) => {
    const connect = getEdgeConnect(edge)

    if (!connect) return

    const {sourceNode, sourcePort, targetNode, targetPort} = connect

    const sourceTable = sourceNode.getData().table as GenTableColumnsInput
    const sourceColumn = sourceTable.columns.filter(column => column.name == sourcePort.data.column.name)[0]
    const targetTable = targetNode.getData().table as GenTableColumnsInput
    const targetColumn = targetTable.columns.filter(column => column.name == targetPort.data.column.name)[0]

    return {
        ...connect,
        sourceTable,
        sourceColumn,
        targetTable,
        targetColumn
    }
}

export const edgeToModelAssociation = (edge: Edge): GenAssociationModelInput | undefined => {
    const connect = getEdgeConnectData(edge)

    if (!connect) return

    const {sourceTable, sourceColumn, targetTable, targetColumn} = connect

    return {
        sourceColumn: {
            name: sourceColumn.name,
            comment: sourceColumn.comment,
            type: sourceColumn.type,
            typeCode: sourceColumn.typeCode,

            table: {
                name: sourceTable.name,
                comment: sourceTable.comment,
            }
        },
        targetColumn: {
            name: targetColumn.name,
            comment: targetColumn.comment,
            type: targetColumn.type,
            typeCode: targetColumn.typeCode,

            table: {
                name: targetTable.name,
                comment: targetTable.comment,
            }
        },
        associationType: getAssociationType(edge),
        fake: true,
        dissociateAction: undefined,
        comment: ""
    }
}

export const edgeToData = (edge: Edge): EdgeData | undefined => {
    const modelAssociation = edgeToModelAssociation(edge)

    if (!modelAssociation) return

    return {
        ...modelAssociation,
        edge,
    }
}

export const dataToEdge = (graph: Graph, data: EdgeData): Edge | undefined => {
    if (data.targetColumn.typeCode != data.sourceColumn.typeCode) return

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