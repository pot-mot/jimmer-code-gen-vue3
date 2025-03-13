import {ASSOCIATION_EDGE} from "@/components/pages/ModelEditor/constant.ts";
import {
    GenAssociationModelInput,
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns
} from "@/api/__generated/model/static";
import {createAssociationName} from "@/components/business/association/createAssociationName.ts";
import {Edge, Graph, Node} from "@antv/x6";

export const refreshEdgeAssociation = (
    graph: Graph,
    node: Node,
    edge: Edge,
    oldTable: GenTableModelInput,
    newTable: GenTableModelInput,
): GenAssociationModelInput | undefined => {
    if (edge.shape != ASSOCIATION_EDGE || !edge.getData()?.association) return

    const association = edge.getData().association as GenAssociationModelInput

    const oldColumnNameMap = new Map<string, GenTableModelInput_TargetOf_columns[]>
    for (const column of oldTable.columns) {
        if (oldColumnNameMap.has(column.name)) {
            oldColumnNameMap.get(column.name)!.push(column)
        } else {
            oldColumnNameMap.set(column.name, [column])
        }
    }

    const newColumnOrderKeyMap = new Map<number, GenTableModelInput_TargetOf_columns[]>
    for (const column of newTable.columns) {
        if (newColumnOrderKeyMap.has(column.orderKey)) {
            newColumnOrderKeyMap.get(column.orderKey)!.push(column)
        } else {
            newColumnOrderKeyMap.set(column.orderKey, [column])
        }
    }

    if (edge.getSourceCellId() === node.id) {
        const oldSourceTableName = association.sourceTableName

        association.sourceTableName = newTable.name
        const targetCell = graph.getCellById(edge.getTargetCellId())
        if (targetCell === undefined || targetCell.getData().table === undefined) return
        const targetTable = targetCell.getData().table
        association.targetTableName = targetTable.name

        let noColumnFlag = false
        for (const columnReference of association.columnReferences) {
            const oldSourceColumns = oldColumnNameMap.get(columnReference.sourceColumnName)
            if (!oldSourceColumns || oldSourceColumns.length === 0) {
                noColumnFlag = true
                break
            }
            const newSourceColumns = newColumnOrderKeyMap.get(oldSourceColumns[0].orderKey)
            if (!newSourceColumns || newSourceColumns.length === 0) {
                noColumnFlag = true
                break
            }
            columnReference.sourceColumnName = newSourceColumns[0].name
        }
        if (noColumnFlag) return undefined

        if (oldSourceTableName !== newTable.name) {
            association.name = createAssociationName(
                association,
                newTable.type === "SUPER_TABLE",
                targetTable.type === "SUPER_TABLE",
            )
        }
    }

    if (edge.getTargetCellId() === node.id) {
        const oldTargetTableName = association.targetTableName

        association.targetTableName = newTable.name
        const sourceCell = graph.getCellById(edge.getSourceCellId())
        if (sourceCell === undefined || sourceCell.getData().table === undefined) return
        const sourceTable = sourceCell.getData().table
        association.sourceTableName = sourceTable.name

        let noColumnFlag = false
        for (const columnReference of association.columnReferences) {
            const oldTargetColumns = oldColumnNameMap.get(columnReference.targetColumnName)
            if (!oldTargetColumns || oldTargetColumns.length === 0) {
                noColumnFlag = true
                break
            }
            const newTargetColumns = newColumnOrderKeyMap.get(oldTargetColumns[0].orderKey)
            if (!newTargetColumns || newTargetColumns.length === 0) {
                noColumnFlag = true
                break
            }
            columnReference.targetColumnName = newTargetColumns[0].name
        }
        if (noColumnFlag) return undefined

        if (oldTargetTableName !== newTable.name) {
            association.name = createAssociationName(
                association,
                sourceTable.type === "SUPER_TABLE",
                newTable.type === "SUPER_TABLE"
            )
        }
    }

    return association
}
