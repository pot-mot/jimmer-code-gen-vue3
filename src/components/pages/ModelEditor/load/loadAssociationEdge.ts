import {Node, Edge} from "@antv/x6";
import {
    GenAssociationModelInput,
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns, Pair,
} from "@/api/__generated/model/static";
import {erRouter, orthRouter} from "@/components/global/graphEditor/edge/edgeRouter.ts";
import {ASSOCIATION_EDGE} from "@/components/pages/ModelEditor/constant.ts";
import {PortManager} from "@antv/x6/es/model/port";
import {DeepReadonly} from "vue";
import {mergeWithExisted} from "@/components/pages/ModelEditor/load/mergeWithExisted.ts";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {jsonSortPropStringify} from "@/utils/json.ts";

type AssociationEdgeConnect = {
    association: GenAssociationModelInput
    sourceNode: UnwrapRefSimple<Node>,
    sourceTable: GenTableModelInput,
    targetNode: UnwrapRefSimple<Node>,
    targetTable: GenTableModelInput,
    columnReferences: {
        sourceColumn: GenTableModelInput_TargetOf_columns,
        sourcePort: PortManager.PortMetadata,
        targetColumn: GenTableModelInput_TargetOf_columns,
        targetPort: PortManager.PortMetadata,
    }[],
    router: Edge.RouterData
}

type ColumnReferenceConnect = AssociationEdgeConnect["columnReferences"][number]

const associationToEdgeConnect = (
    association: GenAssociationModelInput,
    tableNodes: Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>,
): AssociationEdgeConnect | undefined => {
    if (association.columnReferences.length === 0) return

    const sourcePair = tableNodes.find(it =>
        it.first.name === association.sourceTableName
    )
    if (!sourcePair) return
    const targetPair = tableNodes.find(it =>
        it.first.name === association.targetTableName
    )
    if (!targetPair) return

    const {first: sourceTable, second: sourceNode} = sourcePair
    const {first: targetTable, second: targetNode} = targetPair
    const columnReferences = <ColumnReferenceConnect[]>[]

    for (const columnReference of association.columnReferences) {
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

const associationEdgeConnectToEdgeMeta = (
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

/**
 * 根据 tableNameMap 处理重名的表，自动将 source 和 target 重名表重命名为同名表列表的最后一个
 */
const resetAssociationTableName = (
    associations: GenAssociationModelInput[],
    tableNameMap: DeepReadonly<Map<string, GenTableModelInput[]>>
): GenAssociationModelInput[] => {
    const filteredAssociations = associations
        .filter(it => tableNameMap.has(it.targetTableName))
        .filter(it => tableNameMap.has(it.sourceTableName))

    // 根据同名表覆盖 association 的 source 和 target
    for (const association of filteredAssociations) {
        const sourceSameNameList = tableNameMap.get(association.sourceTableName)
        if (sourceSameNameList && sourceSameNameList.length > 1) {
            association.sourceTableName = sourceSameNameList[sourceSameNameList.length - 1].name
        }

        const targetSameNameList = tableNameMap.get(association.targetTableName)
        if (targetSameNameList && targetSameNameList.length > 1) {
            association.targetTableName = targetSameNameList[targetSameNameList.length - 1].name
        }
    }

    return filteredAssociations
}

export const loadAssociationEdge = (
    associations: DeepReadonly<GenAssociationModelInput[]>,
    existedAssociations: DeepReadonly<GenAssociationModelInput[]>,
    tableNameMap: DeepReadonly<Map<string, GenTableModelInput[]>>,
    tableNodes: Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>,
): {
    edgeMetas: Edge.Metadata[],
    allAssociations: Array<GenAssociationModelInput>,
    newAssociations: Array<GenAssociationModelInput>,
    associationNameMap: Map<string, GenAssociationModelInput[]>
} => {
    const resetTableNameAssociations = resetAssociationTableName(
        cloneDeepReadonly<GenAssociationModelInput[]>(associations),
        tableNameMap
    )

    const {
        allItems: allAssociations,
        newItems: newAssociations,
        keyToItemsMap: associationNameMap,
    } = mergeWithExisted<GenAssociationModelInput, string>(
        resetTableNameAssociations,
        existedAssociations,
        it => it.name,
        (name, item, keyDuplicateItems, newItems, existedItems) => {
            const jsonStr = jsonSortPropStringify(item)

            for (const keyDuplicateItem of keyDuplicateItems) {
                if (jsonSortPropStringify(keyDuplicateItem) !== jsonStr) {
                    let tempCount = keyDuplicateItems.length
                    let tempName = `${name}(${tempCount})`
                    while (existedItems.some(it => it.name === tempName)) {
                        tempName = `${name}(${tempCount++})`
                    }
                    item.name = tempName
                    keyDuplicateItems.push(item)
                    newItems.push(item)
                    break
                }
            }
        }
    )

    const edgeMetas: Edge.Metadata[] = []

    for (const association of newAssociations) {
        const associationEdgeConnect = associationToEdgeConnect(association, tableNodes)
        if (!associationEdgeConnect) continue
        const edgeMeta = associationEdgeConnectToEdgeMeta(associationEdgeConnect)
        if (!edgeMeta) continue
        edgeMetas.push(edgeMeta)
    }

    return {
        edgeMetas,
        allAssociations,
        newAssociations,
        associationNameMap
    }
}
