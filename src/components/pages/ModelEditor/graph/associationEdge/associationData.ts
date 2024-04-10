import {Edge, Graph} from "@antv/x6";
import {ASSOCIATION_EDGE, DEFAULT_ASSOCIATION_TYPE, TABLE_NODE,} from "@/components/business/modelEditor/constant.ts";
import {EdgeConnect, getEdgeConnect} from "@/components/global/graphEditor/edge/connectData.ts";
import {
    GenAssociationModelInput,
    GenAssociationModelInput_TargetOf_columnReferences,
    GenTableModelInput
} from "@/api/__generated/model/static";
import {AssociationType} from "@/api/__generated/model/enums";
import {createAssociationName} from "@/components/pages/ModelEditor/graph/nameTemplate/createAssociationName.ts";
import {useGenConfigContextStore} from "@/components/business/genConfig/ContextGenConfigStore.ts";

export const getTableColumnByEdgeConnect = (
    edgeConnect: EdgeConnect
) => {
    const {
        sourceNode,
        sourcePortIndex,
        targetNode,
        targetPortIndex,
    } = edgeConnect

    if (sourceNode.shape !== TABLE_NODE) return
    if (targetNode.shape !== TABLE_NODE) return

    if (sourcePortIndex === undefined) return
    if (targetPortIndex === undefined) return

    const sourceTable = sourceNode.getData()?.table as GenTableModelInput | undefined
    if (!sourceTable) return
    const targetTable = targetNode.getData()?.table as GenTableModelInput | undefined
    if (!targetTable) return
    const sourceColumn = sourceTable.columns[sourcePortIndex]
    const targetColumn = targetTable.columns[targetPortIndex]

    return {
        ...edgeConnect,
        sourceTable,
        targetTable,
        sourceColumn,
        targetColumn,
    }
}

const createAssociationByEdge = (
    edge: Edge
): GenAssociationModelInput | undefined => {
    const edgeConnect = getEdgeConnect(edge)
    if (!edgeConnect) return

    const edgeConnectData = getTableColumnByEdgeConnect(edgeConnect)
    if (!edgeConnectData) return

    const {
        sourceTable,
        targetTable,
        sourceColumn,
        targetColumn,
    } = edgeConnectData

    const association = edge.getData()?.association as GenAssociationModelInput | undefined

    const type: AssociationType =
        association?.type ??
        DEFAULT_ASSOCIATION_TYPE
    const fake: boolean =
        association?.fake ??
        !(useGenConfigContextStore().context.realFk)

    const name: string = association?.name ?? ""
    const dissociateAction =
        association?.dissociateAction ?? undefined
    const updateAction =
        association?.updateAction ?? ""
    const deleteAction =
        association?.deleteAction ?? ""

    const columnReferences: Array<GenAssociationModelInput_TargetOf_columnReferences> = []

    if (sourceColumn && targetColumn) {
        columnReferences.push({
            sourceColumn: {
                name: sourceColumn.name,
                comment: sourceColumn.comment,
                rawType: sourceColumn.rawType,
                typeCode: sourceColumn.typeCode,
            },
            targetColumn: {
                name: targetColumn.name,
                comment: targetColumn.comment,
                rawType: targetColumn.rawType,
                typeCode: targetColumn.typeCode,
            },
        })
    } else if (association && association.columnReferences.length > 1) {
        association.columnReferences.forEach(({sourceColumn, targetColumn}) => {
            columnReferences.push({
                sourceColumn: {
                    name: sourceColumn.name,
                    comment: sourceColumn.comment,
                    rawType: sourceColumn.rawType,
                    typeCode: sourceColumn.typeCode,
                },
                targetColumn: {
                    name: targetColumn.name,
                    comment: targetColumn.comment,
                    rawType: targetColumn.rawType,
                    typeCode: targetColumn.typeCode,
                },
            })
        })
    }

    const newAssociation: GenAssociationModelInput = {
        name,
        sourceTable: {
            name: sourceTable.name,
            comment: sourceTable.comment,
        },
        targetTable: {
            name: targetTable.name,
            comment: targetTable.comment,
        },
        columnReferences,
        type,
        fake,
        dissociateAction,
        updateAction,
        deleteAction
    }

    if (newAssociation.name.trim().length === 0) {
        newAssociation.name = createAssociationName(newAssociation)
    }

    return newAssociation
}
export const setEdgeAssociationData = (edge: Edge) => {
    const association = createAssociationByEdge(edge)
    if (!association) return
    edge.setData({association})
}
export const useAssociationData = (graph: Graph) => {
    graph.on('edge:added', ({edge}) => {
        if (edge.shape !== ASSOCIATION_EDGE) return
        setEdgeAssociationData(edge)
    })
}
