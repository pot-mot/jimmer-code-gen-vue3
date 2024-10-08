// 同步表中的上级表名
import {GenTableModelInput, GenTableModelInput_TargetOf_superTables} from "@/api/__generated/model/static";
import {TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {Graph} from "@antv/x6";
import {useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts";
import {cloneDeep} from "lodash";

const syncSuperTableNameInTable = (table: GenTableModelInput, oldSuperTableName: string, newSuperTableName: string | undefined): GenTableModelInput => {
    const tempTable = cloneDeep(table)

    const newSuperTables: GenTableModelInput_TargetOf_superTables[] = []

    tempTable.superTables.forEach(superTable => {
        if (superTable.name === oldSuperTableName) {
            if (newSuperTableName !== undefined) {
                newSuperTables.push({name: newSuperTableName})
            }
        } else {
            newSuperTables.push(superTable)
        }
    })

    tempTable.superTables = newSuperTables

    return tempTable
}

// 判断上级表是否在表中出现
const judgeSuperTableInTable = (superTableName: string, table: GenTableModelInput): boolean => {
    return table.superTables
        .flatMap(it => it.name)
        .includes(superTableName)
}

// 在全部表中同步上级表
export const syncSuperTableNameForTables = (graph: Graph, oldSuperTableName: string, newSuperTableName: string | undefined) => {
    const nodes = graph.getNodes().filter(it => it.shape === TABLE_NODE)

    const tableDialogsStore = useTableDialogsStore()

    // 同步所有对话框中的表数据
    tableDialogsStore.items.forEach((value, key) => {
        if (value && judgeSuperTableInTable(oldSuperTableName, value)) {
            const newTable = syncSuperTableNameInTable(value, oldSuperTableName, newSuperTableName)
            tableDialogsStore.set(key, newTable)
        }
    })

    // 同步所有节点中的表数据
    for (let node of nodes) {
        const table = node.getData()?.table as GenTableModelInput | undefined
        if (table && judgeSuperTableInTable(oldSuperTableName, table)) {
            const newTable = syncSuperTableNameInTable(table, oldSuperTableName, newSuperTableName)
            updateTableNodeData(node, newTable)
        }
    }
}
