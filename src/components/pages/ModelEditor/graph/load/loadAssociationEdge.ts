import {Node, Edge, Graph} from "@antv/x6";
import {
    GenAssociationModelInput,
    GenAssociationView,
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns,
} from "@/api/__generated/model/static";
import {erRouter, orthRouter} from "@/components/global/graphEditor/edge/edgeRouter.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {PortManager} from "@antv/x6/es/model/port";
import {DeepReadonly} from "vue";
import {updateAssociationEdgeData} from "@/components/pages/ModelEditor/graph/associationEdge/updateData.ts";
import {cloneDeep} from "lodash";

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

const getAssociationNameMap = (graph: Graph): Map<string, GenAssociationModelInput[]> => {
    const associationNameMap = new Map<string, GenAssociationModelInput[]>

    graph.getEdges()
        .filter(it => it.shape === ASSOCIATION_EDGE && it.getData().association !== undefined)
        .forEach(edge => {
            const association = edge.getData().association
            if (associationNameMap.has(association.name)) {
                const count = associationNameMap.get(association.name)!.length
                association.name = `${association.name}(${count})`
                updateAssociationEdgeData(edge, association)
                associationNameMap.get(association.name)!.push(association)
            } else {
                associationNameMap.set(association.name, [association])
            }
        })

    return associationNameMap
}

export const loadAssociationModelInputs = (
    graph: Graph,
    associations: DeepReadonly<GenAssociationModelInput[]>
): {
    edges: Edge[],
    associationNameMap: Map<string, GenAssociationModelInput[]>// 表与名称重复的表的最终 map，除了已经存在的名称，后续的名称将自动向后追加 count
} => {
    const associationNameMap = getAssociationNameMap(graph)

    const edges: Edge[] = []

    associations.forEach(association => {
        const name = association.name
        const tempAssociation = cloneDeep(association) as GenAssociationModelInput

        if (associationNameMap.has(name)) {
            let count = associationNameMap.get(name)!.length
            let tempName = `${name}(${count})`
            while (associationNameMap.has(tempName)) {
                tempName = `${name}(${count++})`
            }
            tempAssociation.name = tempName
            associationNameMap.get(name)!.push(tempAssociation)
        } else {
            associationNameMap.set(name, [tempAssociation])
        }

        const associationEdgeConnect = associationToEdgeConnect(graph, tempAssociation)
        if (!associationEdgeConnect) return
        const edgeMeta = associationEdgeConnectToEdgeMeta(associationEdgeConnect)
        if (!edgeMeta) return
        edges.push(graph.addEdge(edgeMeta))
    })

    return {
        edges,
        associationNameMap
    }
}
