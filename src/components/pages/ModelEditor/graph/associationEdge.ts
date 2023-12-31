import {Edge, Graph} from "@antv/x6";
import {
    GenAssociationModelInput,
    GenAssociationView,
    GenTableModelInput,
} from "@/api/__generated/model/static";
import {
    EdgeConnectData,
    getEdgeConnectData
} from "@/components/business/modelGraphEditor/associationEdge/connectData.ts";
import {createAssociationName} from "@/components/business/modelGraphEditor/associationEdge/associationName.ts";
import {erRouter, orthRouter} from "@/components/business/graphEditor/edgeRouter.ts";
import {GenTableModelInput_TargetOf_columns} from "@/api/__generated/model/static/GenTableModelInput.ts";
import {ASSOCIATION_EDGE} from "@/components/business/modelGraphEditor/constant.ts";
import {PortManager} from "@antv/x6/es/model/port";

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

    const columnReferences = []

    if (sourceColumn && targetColumn) {
        columnReferences.push({
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
        })
    }

    return {
        name: name ? name : createAssociationName(
            sourceTable.name,
            [sourceColumn ? sourceColumn.name : ''],
            targetTable.name,
            [targetColumn ? targetColumn.name : '']
        ),
        sourceTable: {
            name: sourceTable.name,
            comment: sourceTable.comment,
        },
        targetTable: {
            name: targetTable.name,
            comment: targetTable.comment,
        },
        columnReferences,
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

export const useAssociationEdgeData = (graph: Graph) => {
    graph.on('edge:added', ({edge}) => {
        setEdgeAssociationData(edge)

        edge.on('change:*', () => {
            setEdgeAssociationData(edge)
        })
    })
}

export const associationViewToInput = (
    view: GenAssociationView,
): GenAssociationModelInput => {
    return {
        associationType: view.associationType,
        name: view.name,
        dissociateAction: view.dissociateAction,
        fake: view.fake,
        sourceTable: {
            comment: view.sourceTable.comment,
            name: view.sourceTable.name
        },
        targetTable: {
            comment: view.targetTable.comment,
            name: view.targetTable.name
        },

        columnReferences: view.columnReferences.map(({sourceColumn, targetColumn}) => {
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

export const importAssociation = (graph: Graph, association: GenAssociationModelInput): Edge | undefined => {
    if (association.columnReferences.length == 0) return

    const sourceNode = graph.getNodes().filter(it =>
        it.getData()?.table.name == association.sourceTable.name
    )[0]
    if (!sourceNode) return
    const targetNode = graph.getNodes().filter(it =>
        it.getData()?.table.name == association.targetTable.name
    )[0]
    if (!targetNode) return

    const sourceTable = sourceNode.getData()?.table as GenTableModelInput
    if (!sourceTable) return
    const targetTable = targetNode.getData()?.table as GenTableModelInput
    if (!targetTable) return

    const columnReferences = <{
        sourceColumn: GenTableModelInput_TargetOf_columns,
        targetColumn: GenTableModelInput_TargetOf_columns
    }[]>[]

    const portPairs = <{
        sourcePort: PortManager.PortMetadata,
        targetPort: PortManager.PortMetadata,
    }[]>[]

    for (let columnReference of association.columnReferences) {
        const sourceColumnIndex = sourceTable.columns.findIndex(column => column.name == columnReference.sourceColumn.name && column.type == columnReference.sourceColumn.type)
        if (sourceColumnIndex == -1) continue
        const targetColumnIndex = targetTable.columns.findIndex(column => column.name == columnReference.targetColumn.name && column.type == columnReference.targetColumn.type)
        if (targetColumnIndex == -1) continue

        const sourceColumn = sourceTable.columns[sourceColumnIndex]
        if (!sourceColumn) continue
        const targetColumn = targetTable.columns[targetColumnIndex]
        if (!targetColumn) continue

        const sourcePort = sourceNode.ports.items[sourceColumnIndex]
        if (!sourcePort) continue
        const targetPort = targetNode.ports.items[targetColumnIndex]
        if (!targetPort) continue

        columnReferences.push({
            sourceColumn,
            targetColumn
        })

        portPairs.push({
            sourcePort,
            targetPort
        })
    }

    if (portPairs.length == 0 || columnReferences.length == 0) return

    /**
     * 当 columnReference 多于一个时，在 cell 间直接建立关联
     */

    const edgeMeta: Edge.Metadata = {
        shape: ASSOCIATION_EDGE,
        source: (
            portPairs.length > 1 ?
                {
                    cell: sourceNode.id,
                } : {
                    cell: sourceNode.id,
                    port: portPairs[0].sourcePort.id
                }
        ),
        target: (
            portPairs.length > 1 ?
                {
                    cell: targetNode.id,
                } : {
                    cell: targetNode.id,
                    port: portPairs[0].targetPort.id
                }
        ),
        data: {
            association
        },
        router: erRouter
    }

    if (targetNode.id == sourceNode.id) {
        edgeMeta.router = orthRouter
    }

    return graph.addEdge(edgeMeta)
}

export const importAssociations = (graph: Graph, associations: readonly GenAssociationModelInput[]): Edge[] => {
    const edges: Edge[] = []

    associations.forEach(association => {
        const edge = importAssociation(graph, association)
        if (edge) edges.push(edge)
    })

    return edges
}
