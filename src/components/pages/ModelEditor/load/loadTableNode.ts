import {
    GenModelInput_TargetOf_enums,
    GenModelInput_TargetOf_subGroups,
    GenTableModelInput, GenTableModelInput_TargetOf_superTables,
} from "@/api/__generated/model/static";
import {Node} from "@antv/x6";
import {columnPortGroup} from "@/components/pages/ModelEditor/graph/tableNode/columnPort.ts";
import {COLUMN_PORT_GROUP, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {DeepReadonly} from "vue";
import {mergeWithExisted} from "@/components/pages/ModelEditor/load/mergeWithExisted.ts";

export interface TableLoadOptions {
    x?: number,
    y?: number
}

export const columnToPort = () => {
    return {
        group: COLUMN_PORT_GROUP,
    }
}

const tableToNode = (
    table: DeepReadonly<GenTableModelInput>,
    options?: TableLoadOptions
): Node.Metadata => {
    return {
        shape: TABLE_NODE,
        data: {
            table
        },
        ports: {
            groups: {
                COLUMN_PORT_GROUP: columnPortGroup,
            },
            items: [
                ...table.columns.map(columnToPort)
            ]
        },
        ...options,
    }
}

const keepTableSubGroupLegal = (
    tables: GenTableModelInput[],
    subGroupNameMap: DeepReadonly<Map<string, GenModelInput_TargetOf_subGroups[]>>,
) => {
    for (const table of tables) {
        if (table.subGroup) {
            const matchedSubGroups = subGroupNameMap.get(table.subGroup.name)
            if (matchedSubGroups === undefined || matchedSubGroups.length === 0) {
                table.subGroup = undefined
            } else if (matchedSubGroups.length > 1) {
                table.subGroup.name = matchedSubGroups[matchedSubGroups.length - 1].name
            }
        }
    }
}

const keepTableEnumLegal = (
    tables: GenTableModelInput[],
    enumNameMap: DeepReadonly<Map<string, GenModelInput_TargetOf_enums[]>>,
) => {
    for (const table of tables) {
        for (const column of table.columns) {
            if (column.enum) {
                const matchedEnums = enumNameMap.get(column.enum.name)
                if (matchedEnums === undefined || matchedEnums.length === 0) {
                    column.enum = undefined
                } else if (matchedEnums.length > 1) {
                    column.enum.name = matchedEnums[matchedEnums.length - 1].name
                }
            }
        }
    }
}

const keepTableSuperTableLegal = (
    tables: GenTableModelInput[],
    tableNameMap: DeepReadonly<Map<string, GenTableModelInput[]>>,
) => {
    for (const table of tables) {
        const newSuperTables: GenTableModelInput_TargetOf_superTables[] = []
        for (const superTable of table.superTables) {
            const matchedSuperTables = tableNameMap.get(superTable.name)
            if (matchedSuperTables && matchedSuperTables.length > 0) {
                const lastMatchedSuperTable = matchedSuperTables[matchedSuperTables.length - 1]
                newSuperTables.push({name: lastMatchedSuperTable.name})
            }
        }
        table.superTables = newSuperTables
    }
}

export const loadTableNode = (
    tables: DeepReadonly<GenTableModelInput[]>,
    existedTables: DeepReadonly<GenTableModelInput[]>,
    subGroupNameMap: DeepReadonly<Map<string, GenModelInput_TargetOf_subGroups[]>>,
    enumNameMap: DeepReadonly<Map<string, GenModelInput_TargetOf_enums[]>>,
    baseOptions?: TableLoadOptions,
    eachTableOptions?: (TableLoadOptions | undefined)[],
): {
    nodeMetas: Node.Metadata[],
    allTables: Array<GenTableModelInput>,
    newTables: Array<GenTableModelInput>,
    tableNameMap: DeepReadonly<Map<string, GenTableModelInput[]>>,
} => {
    const {
        allItems: allTables,
        newItems: newTables,
        keyToItemsMap: tableNameMap,
    } = mergeWithExisted<GenTableModelInput, string>(
        tables,
        existedTables,
        it => it.name,
        (name, item, keyDuplicateItems, newItems, existedItems) => {
            let tempCount = keyDuplicateItems.length
            let tempName = `${name}(${tempCount})`
            while (existedItems.some(it => it.name === tempName)) {
                tempName = `${name}(${tempCount++})`
            }
            item.name = tempName
            keyDuplicateItems.push(item)
            newItems.push(item)
        }
    )

    keepTableSubGroupLegal(newTables, subGroupNameMap)
    keepTableEnumLegal(newTables, enumNameMap)
    keepTableSuperTableLegal(newTables, tableNameMap)

    const nodeMetas = newTables.map((table, index) => {
        let x: number | undefined = undefined
        let y: number | undefined = undefined

        if (baseOptions !== undefined) {
            x = baseOptions.x
            y = baseOptions.y
        }

        if (eachTableOptions !== undefined && eachTableOptions[index] !== undefined) {
            const currentOptions = eachTableOptions[index]
            if (currentOptions.x !== undefined) {
                if (x !== undefined) {
                    x += currentOptions.x
                } else {
                    x = currentOptions.x
                }
            }
            if (currentOptions.y !== undefined) {
                if (y !== undefined) {
                    y += currentOptions.y
                } else {
                    y = currentOptions.y
                }
            }
        }

        return tableToNode(
            table,
            {
                x, y
            }
        )
    })

    return {
        nodeMetas,
        allTables,
        newTables,
        tableNameMap,
    }
}
