import {GenTableModelInput} from "@/api/__generated/model/static";
import {cloneDeep} from "lodash";
import {TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {Graph} from "@antv/x6";
import {useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";

// 同步表中的枚举名
const syncEnumNameInTable = (table: GenTableModelInput, oldEnumName: string, newEnumName: string | undefined): GenTableModelInput => {
    const tempTable = cloneDeep(table)

    tempTable.columns.forEach(column => {
        if (column.enum && column.enum.name === oldEnumName) {
            if (newEnumName === undefined) {
                column.enum = undefined
            } else {
                column.enum.name = newEnumName
            }
        }
    })

    return tempTable
}

// 判断枚举是否在表中出现
const judgeEnumInTable = (enumName: string, table: GenTableModelInput): boolean => {
    return table.columns
        .flatMap(it => it.enum?.name).filter(it => it !== undefined)
        .includes(enumName)
}

// 在全部表中同步枚举名
export const syncEnumNameForTables = (graph: Graph, oldEnumName: string, newEnumName: string | undefined) => {
    const nodes = graph.getNodes().filter(it => it.shape === TABLE_NODE)

    const tableDialogsStore = useTableDialogsStore()

    // 同步所有对话框中的表数据
    tableDialogsStore.items.forEach((value, key) => {
        if (value && judgeEnumInTable(oldEnumName, value)) {
            const newTable = syncEnumNameInTable(value, oldEnumName, newEnumName)
            tableDialogsStore.set(key, newTable)
        }
    })

    // 同步所有节点中的表数据
    for (let node of nodes) {
        const table = node.getData()?.table as GenTableModelInput | undefined
        if (table && judgeEnumInTable(oldEnumName, table)) {
            const newTable = syncEnumNameInTable(table, oldEnumName, newEnumName)
            updateTableNodeData(node, newTable)
        }
    }
}
