import {Edge, Graph} from "@antv/x6";
import {
    GenAssociationModelInput,
    GenAssociationView,
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns,
} from "@/api/__generated/model/static";
import {erRouter, orthRouter} from "@/components/global/graphEditor/edgeRouter.ts";
import {ASSOCIATION_EDGE} from "@/components/business/modelEditor/constant.ts";
import {PortManager} from "@antv/x6/es/model/port";

export const associationViewToInput = (
    view: GenAssociationView,
): GenAssociationModelInput => {
    return {
        type: view.type,
        name: view.name,
        dissociateAction: view.dissociateAction,
        updateAction: view.updateAction,
        deleteAction: view.deleteAction,
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
                    rawType: sourceColumn.rawType,
                    typeCode: sourceColumn.typeCode,
                },
                targetColumn: {
                    comment: targetColumn.comment,
                    name: targetColumn.name,
                    rawType: targetColumn.rawType,
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
        const sourceColumnIndex = sourceTable.columns.findIndex(column =>
            column.name == columnReference.sourceColumn.name &&
            column.rawType == columnReference.sourceColumn.rawType &&
            column.typeCode == columnReference.sourceColumn.typeCode
        )
        if (sourceColumnIndex == -1) continue
        const targetColumnIndex = targetTable.columns.findIndex(column =>
            column.name == columnReference.targetColumn.name &&
            column.rawType == columnReference.targetColumn.rawType &&
            column.typeCode == columnReference.targetColumn.typeCode
        )
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
