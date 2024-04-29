import {Node, Edge, Graph} from "@antv/x6";
import {
    GenAssociationModelInput,
    GenAssociationView,
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns,
} from "@/api/__generated/model/static";
import {erRouter, orthRouter} from "@/components/global/graphEditor/edgeRouter.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {PortManager} from "@antv/x6/es/model/port";
import {DeepReadonly} from "vue";

export const associationViewToInput = (
    view: DeepReadonly<GenAssociationView>,
): GenAssociationModelInput => {
    return {
        type: view.type,
        name: view.name,
        dissociateAction: view.dissociateAction,
        updateAction: view.updateAction,
        deleteAction: view.deleteAction,
        fake: view.fake,
        sourceTableName: view.sourceTable.name,
        targetTableName: view.targetTable.name,

        columnReferences: view.columnReferences.map(({sourceColumn, targetColumn}) => {
            return {
                sourceColumnName: sourceColumn.name,
                targetColumnName: targetColumn.name,
            }
        })
    }
}

export interface AssociationEdgeConnect {
    association: GenAssociationModelInput
    sourceNode: Node,
    sourceTable: GenTableModelInput,
    targetNode: Node,
    targetTable: GenTableModelInput,
    columnReferences: {
        sourceColumn: GenTableModelInput_TargetOf_columns,
        sourcePort: PortManager.PortMetadata,
        targetColumn: GenTableModelInput_TargetOf_columns,
        targetPort: PortManager.PortMetadata,
    }[],
    router: Edge.RouterData
}

export const associationToEdgeConnect = (
    graph: Graph,
    association: DeepReadonly<GenAssociationModelInput>
): DeepReadonly<AssociationEdgeConnect> | undefined => {
    if (association.columnReferences.length === 0) return

    const nodes = graph.getNodes().filter(it => it.shape === TABLE_NODE)

    const sourceNode = nodes.filter(it =>
        it.getData()?.table.name === association.sourceTableName
    )[0]
    if (!sourceNode) return
    const targetNode = nodes.filter(it =>
        it.getData()?.table.name === association.targetTableName
    )[0]
    if (!targetNode) return

    const sourceTable = sourceNode.getData()?.table as GenTableModelInput | undefined
    if (!sourceTable) return
    const targetTable = targetNode.getData()?.table as GenTableModelInput | undefined
    if (!targetTable) return

    const columnReferences = <{
        sourceColumn: GenTableModelInput_TargetOf_columns,
        sourcePort: PortManager.PortMetadata,
        targetColumn: GenTableModelInput_TargetOf_columns,
        targetPort: PortManager.PortMetadata,
    }[]>[]

    for (let columnReference of association.columnReferences) {
        const sourceColumnIndex = sourceTable.columns.findIndex(column =>
            column.name === columnReference.sourceColumnName
        )
        if (sourceColumnIndex === -1) continue
        const targetColumnIndex = targetTable.columns.findIndex(column =>
            column.name === columnReference.targetColumnName
        )
        if (targetColumnIndex === -1) continue

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
            sourcePort,
            targetColumn,
            targetPort
        })
    }

    if (columnReferences.length === 0) return

    return {
        association,
        sourceNode,
        sourceTable,
        targetNode,
        targetTable,
        columnReferences,
        router: targetNode.id === sourceNode.id ? orthRouter : erRouter
    }
}

export const associationEdgeConnectToEdgeMeta = (
    associationEdgeConnect: DeepReadonly<AssociationEdgeConnect>,
): Edge.Metadata => {
    const {
        association,
        sourceNode,
        targetNode,
        columnReferences,
        router
    } = associationEdgeConnect

    return {
        shape: ASSOCIATION_EDGE,
        source: (
            columnReferences.length > 1 ?
                {
                    cell: sourceNode.id,
                } : {
                    cell: sourceNode.id,
                    port: columnReferences[0].sourcePort.id
                }
        ),
        target: (
            columnReferences.length > 1 ?
                {
                    cell: targetNode.id,
                } : {
                    cell: targetNode.id,
                    port: columnReferences[0].targetPort.id
                }
        ),
        data: {
            association
        },
        router
    }
}

export const loadAssociationModelInputs = (
    graph: Graph,
    associations: DeepReadonly<Array<GenAssociationModelInput>>
): Edge[] => {
    const edges: Edge[] = []

    associations.forEach(association => {
        const associationEdgeConnect = associationToEdgeConnect(graph, association)
        if (!associationEdgeConnect) return
        const edgeMeta = associationEdgeConnectToEdgeMeta(associationEdgeConnect)
        if (!edgeMeta) return
        edges.push(graph.addEdge(edgeMeta))
    })

    return edges
}
