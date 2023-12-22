import {Node, Edge, Graph} from "@antv/x6";
import {
    GenAssociationModelInput,
    GenAssociationView,
    GenTableColumnsInput,
    GenTableColumnsView
} from "@/api/__generated/model/static";
import {EdgeConnectData, getEdgeConnectData} from "@/components/business/modelGraphEditor/associationEdge/connectData.ts";
import {createAssociationName} from "@/components/business/modelGraphEditor/associationEdge/associationName.ts";
import {searchEdgesIgnoreDirection} from "@/components/business/graphEditor/common/search.ts";
import {erRouter, orthRouter} from "@/components/business/graphEditor/edgeRouter.ts";
import {GenTableColumnsInput_TargetOf_columns} from "@/api/__generated/model/static/GenTableColumnsInput.ts";
import {ASSOCIATION_EDGE} from "@/components/business/modelGraphEditor/constant.ts";

export const connectDataToAssociationInput = (
    connectData: EdgeConnectData,
    edge: Edge,
): GenAssociationModelInput => {
    const {
        sourceTable,
        sourceColumn,
        targetTable,
        targetColumn
    } = connectData

    const name: string | undefined = edge.getData()?.association?.name
    const associationType = edge.getData()?.association?.associationType
    const fake: boolean | undefined = edge.getData()?.association?.fake

    return {
        name: name ? name : createAssociationName(
            sourceTable.name,
            [sourceColumn.name],
            targetTable.name,
            [targetColumn.name]
        ),
        sourceTable: {
            name: sourceTable.name,
            comment: sourceTable.comment,
        },
        targetTable: {
            name: targetTable.name,
            comment: targetTable.comment,
        },
        columnReferences: [
            {
                sourceColumn: {
                    name: sourceColumn.name,
                    comment: sourceColumn.comment,
                    type: sourceColumn.type,
                    typeCode: sourceColumn.typeCode,
                },
                targetColumn: {
                    name: targetColumn.name,
                    comment: targetColumn.comment,
                    type: targetColumn.type,
                    typeCode: targetColumn.typeCode,
                },
            }
        ],
        associationType: associationType ? associationType : 'MANY_TO_ONE',
        fake: fake != undefined ? fake : false,
        dissociateAction: undefined,
    }
}

const setEdgeAssociationData = (edge: Edge) => {
    const connectData = getEdgeConnectData(edge)

    if (!connectData) return

    const association = connectDataToAssociationInput(connectData, edge)

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

export const edgeToAssociationData = <T extends GenTableColumnsInput | GenTableColumnsView>(edge: Edge): EdgeAssociationData<T> | undefined => {
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
export const associationDataToEdge = <T extends GenTableColumnsInput | GenTableColumnsView>(graph: Graph, data: EdgeAssociationData<T>): Edge | undefined => {
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

const associationViewToInput = (
    associationView: GenAssociationView,
    sourceTable: GenTableColumnsInput,
    targetTable: GenTableColumnsInput,
    columnReferences: {
        sourceColumn: GenTableColumnsInput_TargetOf_columns,
        targetColumn: GenTableColumnsInput_TargetOf_columns
    }[]
): GenAssociationModelInput => {
    return {
        associationType: associationView.associationType,
        name: associationView.name,
        dissociateAction: associationView.dissociateAction,
        fake: associationView.fake,
        sourceTable: {
            comment: sourceTable.comment,
            name: sourceTable.name
        },
        targetTable: {
            comment: targetTable.comment,
            name: targetTable.name
        },

        columnReferences: columnReferences.map(({sourceColumn, targetColumn}) => {
            return {
                sourceColumn: {
                    comment: sourceColumn.comment,
                    name: sourceColumn.name,
                    type: sourceColumn.type,
                    typeCode: sourceColumn.typeCode,
                },
                targetColumn: {
                    comment: targetColumn.comment,
                    name: targetColumn.name,
                    type: targetColumn.type,
                    typeCode: targetColumn.typeCode,
                },
            }
        })
    }
}

export const importAssociationViews = (graph: Graph, associations: readonly GenAssociationView[]): Edge[] => {
    const edges: Edge[] = []

    associations.map(association => {
        const sourceNode = graph.getNodes().filter(it =>
            it.getData()?.table.name == association.sourceTable.name
        )[0]
        if (!sourceNode) return
        const targetNode = graph.getNodes().filter(it =>
            it.getData()?.table.name == association.targetTable.name
        )[0]
        if (!targetNode) return

        const sourceTable = sourceNode.getData()?.table as GenTableColumnsInput
        if (!sourceTable) return
        const targetTable = targetNode.getData()?.table as GenTableColumnsInput
        if (!targetTable) return

        // TODO 处理多列关联

        const sourceColumnIndex = sourceTable.columns.findIndex(column => column.name == association.columnReferences[0]?.sourceColumn.name)
        if (sourceColumnIndex == -1) return
        const targetColumnIndex = targetTable.columns.findIndex(column => column.name == association.columnReferences[0]?.targetColumn.name)
        if (targetColumnIndex == -1) return

        const sourcePort = sourceNode.ports.items[sourceColumnIndex]
        if (!sourcePort || !sourcePort.id) return
        const targetPort = targetNode.ports.items[targetColumnIndex]
        if (!targetPort || !targetPort.id) return

        const sourceColumn = sourceTable.columns[sourceColumnIndex]
        const targetColumn = targetTable.columns[targetColumnIndex]

        const existAssociations = searchEdgesIgnoreDirection(graph, sourcePort.id, targetPort.id)

        graph.removeCells(existAssociations)

        const newEdge = new Edge({
            shape: ASSOCIATION_EDGE,
            source: {
                cell: sourceNode.id,
                port: sourcePort.id
            },
            target: {
                cell: targetNode.id,
                port: targetPort.id
            },
            data: {
                association: associationViewToInput(
                    association,
                    sourceTable, targetTable,
                    [{sourceColumn, targetColumn}]
                )
            }
        })

        if (targetNode.id == sourceNode.id) {
            newEdge.router = orthRouter
        } else {
            newEdge.router = erRouter
        }

        graph.addEdge(newEdge)

        edges.push(newEdge)
    })

    return edges
}
