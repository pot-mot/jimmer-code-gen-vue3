import {TABLE_NODE,} from "@/components/business/modelEditor/constant.ts";
import {EdgeConnect} from "@/components/global/graphEditor/edge/connectData.ts";
import {
    GenTableModelInput, GenTableModelInput_TargetOf_columns
} from "@/api/__generated/model/static";

export interface EdgeConnectEntities {
    sourceTable: GenTableModelInput,
    targetTable: GenTableModelInput,
    sourceColumn: GenTableModelInput_TargetOf_columns,
    targetColumn: GenTableModelInput_TargetOf_columns,
}

export const getEdgeConnectEntities = (
    edgeConnect: EdgeConnect
): EdgeConnectEntities | undefined => {
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
        sourceTable,
        targetTable,
        sourceColumn,
        targetColumn,
    }
}
