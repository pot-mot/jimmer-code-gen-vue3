import {Node, Edge, Graph} from "@antv/x6";
import {GenAssociationModelInput, GenTableColumnsInput, GenTableColumnsView} from "@/api/__generated/model/static";
import {EdgeConnectData, getEdgeConnectData} from "@/components/business/model/associationEdge/connectData.ts";
import {AssociationType} from "@/api/__generated/model/enums";
import {getAssociationType} from "@/components/business/model/associationEdge/associationType.ts";

export const connectDataToAssociationInput = (
    connectData: EdgeConnectData,
    associationType: AssociationType | undefined,
    fake: boolean | undefined
): GenAssociationModelInput => {
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
        associationType: associationType ? associationType : 'MANY_TO_ONE',
        fake: fake != undefined ? fake : true,
        dissociateAction: undefined,
        comment: ""
    }
}

const setEdgeAssociationData = (edge: Edge) => {
    const connectData = getEdgeConnectData(edge)

    if (!connectData) return

    const association = connectDataToAssociationInput(connectData, getAssociationType(edge), edge.getData()?.association?.fake)

    if (association) {
        edge.setData({association})
    }
}

export const useEdgeAssociationData = (graph: Graph) => {
    graph.on('edge:added', ({edge}) => {
        setEdgeAssociationData(edge)

        edge.on('change:*', () => {
            setEdgeAssociationData(edge)
        })
    })
}

export interface EdgeAssociationData<T extends GenTableColumnsInput | GenTableColumnsView> {
    edge: Edge,
    association: GenAssociationModelInput,
    connectData: EdgeConnectData<T>
}

export const edgeToAssociationData = <T extends GenTableColumnsInput | GenTableColumnsView> (edge: Edge): EdgeAssociationData<T> | undefined => {
    const connectData = getEdgeConnectData<T>(edge)

    if (!connectData) return

    const association = edge.data.association

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
export const associationDataToEdge = <T extends GenTableColumnsInput | GenTableColumnsView> (graph: Graph, data: EdgeAssociationData<T>): Edge | undefined => {
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
