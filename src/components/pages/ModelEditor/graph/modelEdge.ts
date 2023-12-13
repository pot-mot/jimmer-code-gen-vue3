import {Node, Edge, Graph} from "@antv/x6";
import {getAssociationType} from "../../AssociationEditor/graph/associationEdge.ts";
import {GenAssociationModelInput, GenTableColumnsInput, GenTableColumnsView} from "@/api/__generated/model/static";
import {EdgeConnectData, getEdgeConnectData} from "@/components/business/model/associationEdge/connectData.ts";
import {AssociationType} from "@/api/__generated/model/enums";

export interface EdgeData<T extends GenTableColumnsInput | GenTableColumnsView> {
    edge: Edge,
    association: GenAssociationModelInput,
    connectData: EdgeConnectData<T>
}

const connectDataToAssociation = (connectData: EdgeConnectData, associationType: AssociationType): GenAssociationModelInput => {
    const {
        sourceTable,
        sourceColumn,
        targetTable,
        targetColumn
    } = connectData

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
        associationType,
        fake: true,
        dissociateAction: undefined,
        comment: ""
    }
}

export const edgeToModelAssociation = (edge: Edge): GenAssociationModelInput | undefined => {
    const connectData = getEdgeConnectData(edge)

    if (!connectData) return

    return connectDataToAssociation(connectData, getAssociationType(edge))
}

export const edgeToData = <T extends GenTableColumnsInput | GenTableColumnsView> (edge: Edge): EdgeData<T> | undefined => {
    const connectData = getEdgeConnectData<T>(edge)

    if (!connectData) return

    const association = connectDataToAssociation(connectData, getAssociationType(edge))

    if (!association) return

    return {
        edge,
        association,
        connectData
    }
}

/**
 * 将 EdgeData 重新转换成 Edge，并更新 source 和 target
 */
export const dataToEdge = <T extends GenTableColumnsInput | GenTableColumnsView> (graph: Graph, data: EdgeData<T>): Edge | undefined => {
    if (data.connectData.targetColumn.typeCode != data.connectData.sourceColumn.typeCode) return

    const sourceNode = graph.getCellById(data.connectData.sourceNode.id) as Node
    if (!sourceNode) return
    const targetNode = graph.getCellById(data.connectData.targetNode.id) as Node
    if (!targetNode) return

    const sourceTable = sourceNode.getData().table as T | undefined
    if (!sourceTable) return
    const targetTable = targetNode.getData().table as T | undefined
    if (!targetTable) return

    const sourceColumnNewIndex = sourceTable.columns.findIndex(
        column =>
            column.name == data.connectData.sourceColumn.name &&
            column.typeCode == data.connectData.sourceColumn.typeCode &&
            column.type == data.connectData.sourceColumn.type
    )
    if (sourceColumnNewIndex == -1) return
    const sourcePort = sourceNode.ports.items[sourceColumnNewIndex]
    if (!sourcePort) return

    const targetColumnNewIndex = targetTable.columns.findIndex(
        column =>
            column.name == data.connectData.targetColumn.name &&
            column.typeCode == data.connectData.targetColumn.typeCode &&
            column.type == data.connectData.targetColumn.type
    )
    if (targetColumnNewIndex == -1) return
    const targetPort = targetNode.ports.items[targetColumnNewIndex]
    if (!targetPort) return

    data.edge.setSource({cell: sourceNode.id, port: sourcePort.id})
    data.edge.setTarget({cell: targetNode.id, port: targetPort.id})

    return data.edge
}
