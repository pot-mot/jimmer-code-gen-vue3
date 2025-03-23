import {EntityConfigView, GenModelInput_TargetOf_enums, GenTableModelInput} from "@/api/__generated/model/static";
import {TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {Graph} from "@antv/x6";
import {useTableDialogsStore} from "@/store/modelEditor/dialogs/TableDialogsStore.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {DeepReadonly} from "vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {useEntityDialogsStore} from "@/store/modelEditor/dialogs/EntityDialogsStore.ts";

// 同步表中的枚举名
const syncEnumNameInTable = (table: DeepReadonly<GenTableModelInput>, oldEnumName: string, newEnumName: string | undefined): GenTableModelInput => {
    const tempTable = cloneDeepReadonly<GenTableModelInput>(table)

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
    tableDialogsStore.items.forEach(({key, value, options}) => {
        if (value && judgeEnumInTable(oldEnumName, value)) {
            const newTable = syncEnumNameInTable(value, oldEnumName, newEnumName)
            tableDialogsStore.set(key, newTable, options)
        }
    })

    // 同步所有节点中的表数据
    for (const node of nodes) {
        const table = node.getData()?.table as GenTableModelInput | undefined
        if (table && judgeEnumInTable(oldEnumName, table)) {
            const newTable = syncEnumNameInTable(table, oldEnumName, newEnumName)
            updateTableNodeData(node, newTable)
        }
    }
}


// 在表中同步新的枚举（新的枚举必然来源于唯一的表中唯一的列）
export const syncNewEnumForTables = (genEnum: DeepReadonly<GenModelInput_TargetOf_enums>, tableKey: string, columnName: string) => {
    const tableDialogsStore = useTableDialogsStore()

    const table = tableDialogsStore.get(tableKey)
    if (table !== undefined) {
        table.columns.forEach(column => {
            if (column.name === columnName) {
                column.enum = {name: genEnum.name}
            }
        })
    }
}


// 同步实体中的枚举名
const syncEnumNameInEntity = (entity: DeepReadonly<EntityConfigView>, oldEnumName: string, newEnumName: string | undefined): EntityConfigView => {
    const tempEntity = cloneDeepReadonly<EntityConfigView>(entity)

    tempEntity.tableConvertedEntity.properties.forEach(property => {
        if (property.enumName && property.enumName === oldEnumName) {
            if (newEnumName === undefined) {
                property.enumId = undefined
                property.enumName = undefined
            } else {
                property.enumName = newEnumName
            }
        }
    })

    return tempEntity
}

// 判断枚举是否在实体中出现
const judgeEnumInEntity = (enumName: string, entity: DeepReadonly<EntityConfigView>): boolean => {
    return entity.tableConvertedEntity.properties
        .flatMap(it => it.enumName).filter(it => it !== undefined)
        .includes(enumName)
}

export const syncEnumNameForEntities = (oldEnumName: string, newEnumName: string | undefined) => {
    const entityDialogsStore = useEntityDialogsStore()

    entityDialogsStore.items.forEach(({key, value, options}) => {
        if (value && judgeEnumInEntity(oldEnumName, value)) {
            const newTable = syncEnumNameInEntity(value, oldEnumName, newEnumName)
            entityDialogsStore.set(key, newTable, options)
        }
    })
}