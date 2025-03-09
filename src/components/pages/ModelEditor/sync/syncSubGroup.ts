import {GenModelInput_TargetOf_subGroups, GenTableModelInput} from "@/api/__generated/model/static";
import {TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {Graph} from "@antv/x6";
import {useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {DeepReadonly} from "vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {useEnumDialogsStore} from "@/store/modelEditor/EnumDialogsStore.ts";

type SubGroupItem = {subGroup?: {name: string} | undefined}

// 同步子组元素中的子组名
const syncSubGroupNameInItem = <T extends SubGroupItem> (item: DeepReadonly<T>, oldSubGroupName: string, newSubGroupName: string | undefined): T => {
    const tempItem = cloneDeepReadonly<T>(item)

    if (tempItem.subGroup && tempItem.subGroup.name === oldSubGroupName) {
        if (newSubGroupName === undefined) {
            tempItem.subGroup = undefined
        } else {
            tempItem.subGroup.name = newSubGroupName
        }
    }

    return tempItem
}

// 判断子组是否在子组元素中出现
const judgeSubGroupInItem = <T extends SubGroupItem> (subGroupName: string, table: T): boolean => {
    return table.subGroup?.name === subGroupName
}

// 在全部表中同步子组名
export const syncSubGroupNameForTables = (graph: Graph, oldSubGroupName: string, newSubGroupName: string | undefined) => {
    const nodes = graph.getNodes().filter(it => it.shape === TABLE_NODE)

    const tableDialogsStore = useTableDialogsStore()

    // 同步所有对话框中的表数据
    tableDialogsStore.items.forEach(({key, value, options}) => {
        if (value && judgeSubGroupInItem(oldSubGroupName, value)) {
            const newTable = syncSubGroupNameInItem(value, oldSubGroupName, newSubGroupName)
            tableDialogsStore.set(key, newTable, options)
        }
    })

    // 同步所有节点中的表数据
    for (const node of nodes) {
        const table = node.getData()?.table as GenTableModelInput | undefined
        if (table && judgeSubGroupInItem(oldSubGroupName, table)) {
            const newTable = syncSubGroupNameInItem(table, oldSubGroupName, newSubGroupName)
            updateTableNodeData(node, newTable)
        }
    }
}

// 在全部枚举中同步子组名
export const syncSubGroupNameForEnums = (oldSubGroupName: string, newSubGroupName: string | undefined) => {
    const enumDialogsStore = useEnumDialogsStore()

    // 同步所有对话框中的枚举数据
    enumDialogsStore.items.forEach(({key, value, options}) => {
        if (value && judgeSubGroupInItem(oldSubGroupName, value)) {
            const newEnum = syncSubGroupNameInItem(value, oldSubGroupName, newSubGroupName)
            enumDialogsStore.set(key, newEnum, options)
        }
    })
}


// 在表中同步新的子组
export const syncNewSubGroupForTables = (genSubGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>, tableKey: string) => {
    const tableDialogsStore = useTableDialogsStore()

    const table = tableDialogsStore.get(tableKey)
    if (table !== undefined) {
        table.subGroup = {name: genSubGroup.name}
    }
}

// 在表中同步新的枚举（新的枚举必然来源于唯一的表中唯一的列）
export const syncNewSubGroupForEnums = (genSubGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>, enumKey: string) => {
    const enumDialogsStore = useEnumDialogsStore()

    const genEnum = enumDialogsStore.get(enumKey)
    if (genEnum !== undefined) {
        genEnum.subGroup = {name: genSubGroup.name}
    }
}
