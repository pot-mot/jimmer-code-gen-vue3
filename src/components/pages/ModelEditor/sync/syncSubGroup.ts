import {GenModelInput, GenTableModelInput} from "@/api/__generated/model/static";
import {TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {Graph} from "@antv/x6";
import {useTablesStore} from "@/store/modelEditor/dialogs/TablesStore.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {DeepReadonly} from "vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {useEnumsStore} from "@/store/modelEditor/dialogs/EnumsStore.ts";

type SubGroupItem = {subGroup?: {name: string} | undefined}

// 同步子组元素中的子组名
const setSubGroupNameInItem = <T extends SubGroupItem> (item: DeepReadonly<T>, subGroupName: string | undefined): T => {
    const tempItem = cloneDeepReadonly<T>(item)

    if (subGroupName !== undefined) {
        tempItem.subGroup = {name: subGroupName}
    } else {
        tempItem.subGroup = undefined
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

    const tableDialogsStore = useTablesStore()

    // 同步所有对话框中的表数据
    tableDialogsStore.items.forEach(({key, value, options}) => {
        if (value && judgeSubGroupInItem(oldSubGroupName, value)) {
            const newTable = setSubGroupNameInItem(value, newSubGroupName)
            tableDialogsStore.set(key, newTable, options)
        }
    })

    // 同步所有节点中的表数据
    for (const node of nodes) {
        const table = node.getData()?.table as GenTableModelInput | undefined
        if (table && judgeSubGroupInItem(oldSubGroupName, table)) {
            const newTable = setSubGroupNameInItem(table, newSubGroupName)
            updateTableNodeData(node, newTable)
        }
    }
}

// 在全部枚举中同步子组名
export const syncSubGroupNameForEnums = (model: GenModelInput, oldSubGroupName: string, newSubGroupName: string | undefined) => {
    const enumDialogsStore = useEnumsStore()

    // 同步所有对话框中的子组数据
    enumDialogsStore.items.forEach(({key, value, options}) => {
        if (value && judgeSubGroupInItem(oldSubGroupName, value)) {
            const newEnum = setSubGroupNameInItem(value, newSubGroupName)
            enumDialogsStore.set(key, newEnum, options)
        }
    })

    // 同步模型中的子组数据
    model.enums = model.enums.map(it => {
        if (judgeSubGroupInItem(oldSubGroupName, it)) {
            return setSubGroupNameInItem(it, newSubGroupName)
        } else {
            return it
        }
    })
}


// 在表中设置子组名
export const setSubGroupNameForTables = (graph: Graph, tableKeys: Set<string>, subGroupName: string) => {
    const nodes = graph.getNodes().filter(it => it.shape === TABLE_NODE)

    const tableDialogsStore = useTablesStore()

    // 同步所有对话框中的表数据
    tableDialogsStore.items.forEach(({key, value, options}) => {
        if (value && tableKeys.has(key)) {
            const newTable = setSubGroupNameInItem(value, subGroupName)
            tableDialogsStore.set(key, newTable, options)
        }
    })

    // 同步所有节点中的表数据
    for (const node of nodes) {
        const table = node.getData()?.table as GenTableModelInput | undefined
        if (table && tableKeys.has(node.id)) {
            const newTable = setSubGroupNameInItem(table, subGroupName)
            updateTableNodeData(node, newTable)
        }
    }
}

// 在枚举中设置子组名
export const setSubGroupNameForEnums = (model: GenModelInput, enumKeys: Set<string>, subGroupName: string) => {
    const enumDialogsStore = useEnumsStore()

    // 同步所有对话框中的子组数据
    enumDialogsStore.items.forEach(({key, value, options}) => {
        if (value && enumKeys.has(key)) {
            const newEnum = setSubGroupNameInItem(value, subGroupName)
            enumDialogsStore.set(key, newEnum, options)
        }
    })

    // 同步模型中的子组数据
    model.enums = model.enums.map(it => {
        if (enumKeys.has(it.name)) {
            return setSubGroupNameInItem(it, subGroupName)
        } else {
            return it
        }
    })
}
