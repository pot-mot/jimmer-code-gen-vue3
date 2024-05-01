import {ASSOCIATION_EDGE} from "@/components/pages/ModelEditor/constant.ts";
import {
    GenAssociationModelInput,
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns
} from "@/api/__generated/model/static";
import {createAssociationName} from "@/components/pages/ModelEditor/graph/nameTemplate/createAssociationName.ts";
import {Edge, Node} from "@antv/x6";

export const refreshEdgeAssociation = (
    node: Node,
    edge: Edge,
    oldTable: GenTableModelInput,
    newTable: GenTableModelInput,
): GenAssociationModelInput | undefined => {
    if (edge.shape != ASSOCIATION_EDGE || !edge.getData()?.association) return

    const association = edge.getData().association as GenAssociationModelInput

    const oldColumnNameMap = new Map<string, GenTableModelInput_TargetOf_columns>
    oldTable.columns.forEach(column => {
        oldColumnNameMap.set(column.name, column)
    })

    const newColumnOrderKeyMap = new Map<number, GenTableModelInput_TargetOf_columns>
    newTable.columns.forEach(column => {
        newColumnOrderKeyMap.set(column.orderKey, column)
    })

    if (edge.getSourceCellId() === node.id) {
        const oldSourceTableName = association.sourceTableName

        association.sourceTableName = newTable.name

        let noColumnFlag = false
        for (let columnReference of association.columnReferences) {
            const oldSourceColumn = oldColumnNameMap.get(columnReference.sourceColumnName)
            if (!oldSourceColumn) {
                noColumnFlag = true
                break
            }
            const newSourceColumn = newColumnOrderKeyMap.get(oldSourceColumn.orderKey)
            if (!newSourceColumn) {
                noColumnFlag = true
                break
            }
            columnReference.sourceColumnName = newSourceColumn.name
        }
        if (noColumnFlag) return undefined

        if (oldSourceTableName !== newTable.name) {
            association.name = createAssociationName(association)
        }
    }

    if (edge.getTargetCellId() === node.id) {
        const oldTargetTableName = association.targetTableName

        association.targetTableName = newTable.name

        let noColumnFlag = false
        for (let columnReference of association.columnReferences) {
            const oldTargetColumn = oldColumnNameMap.get(columnReference.targetColumnName)
            if (!oldTargetColumn) {
                noColumnFlag = true
                break
            }
            const newTargetColumn = newColumnOrderKeyMap.get(oldTargetColumn.orderKey)
            if (!newTargetColumn) {
                noColumnFlag = true
                break
            }
            columnReference.targetColumnName = newTargetColumn.name
        }
        if (noColumnFlag) return undefined

        if (oldTargetTableName !== newTable.name) {
            association.name = createAssociationName(association)
        }
    }

    return association
}
