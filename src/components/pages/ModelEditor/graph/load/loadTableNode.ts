import {
    GenModelInput,
    GenTableColumnsView,
    GenTableModelInput,
    GenTableModelInput_TargetOf_superTables,
} from "@/api/__generated/model/static";
import {Graph, Node} from "@antv/x6";
import {columnPortGroup} from "@/components/pages/ModelEditor/graph/tableNode/columnPort.ts";
import {COLUMN_PORT_GROUP, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {TableLoadOptions} from "@/components/pages/ModelEditor/graph/load/loadData.ts";
import {DeepReadonly} from "vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";

export const columnToPort = () => {
    return {
        group: COLUMN_PORT_GROUP,
    }
}

const tableToNode = (
    table: DeepReadonly<GenTableModelInput>,
    options?: any
): Node => {
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

const getTableNameMap = <T extends GenTableModelInput | GenTableColumnsView>(graph: Graph): Map<string, T[]> => {
    const tableNameMap = new Map<string, T[]>

    graph.getNodes()
        .filter(it => it.shape === TABLE_NODE && it.getData()?.table !== undefined)
        .forEach(node => {
            const table = node.getData().table
            if (tableNameMap.has(table.name)) {
                const count = tableNameMap.get(table.name)!.length
                table.name = `${table.name}(${count})`
                updateTableNodeData(node, table)
                tableNameMap.get(table.name)!.push(table)
            } else {
                tableNameMap.set(table.name, [table])
            }
        })

    return tableNameMap
}

export const loadTableModelInputs = (
    model: DeepReadonly<GenModelInput>,
    graph: Graph,
    tables: DeepReadonly<GenTableModelInput[]>,
    baseOptions?: DeepReadonly<TableLoadOptions>,
    eachTableOptions?: DeepReadonly<TableLoadOptions[]>
): {
    nodes: Node[],
    tableNameMap: Map<string, GenTableModelInput[]>// 表与名称重复的表的最终 map，除了已经存在的名称，后续的名称将自动向后追加 count
} => {
    const tableNameMap = getTableNameMap<GenTableModelInput>(graph)

    const subGroupNameSet = new Set(model.subGroups.map(it => it.name))
    const enumNameSet = new Set(model.enums.map(it => it.name))

    const tempTables = tables.map(table => {
        const name = table.name
        const tempTable = cloneDeepReadonly<GenTableModelInput>(table)

        if (tempTable.subGroup && !subGroupNameSet.has(tempTable.subGroup.name)) {
            tempTable.subGroup = undefined
        }
        for (const column of tempTable.columns) {
            if (column.enum && !enumNameSet.has(column.enum.name)) {
                column.enum = undefined
            }
        }

        const nameMatchedTables = tableNameMap.get(name)
        if (nameMatchedTables !== undefined) {
            let count = nameMatchedTables.length
            let tempName = `${name}(${count})`
            while (tableNameMap.has(tempName)) {
                tempName = `${name}(${count++})`
            }
            tempTable.name = tempName
            nameMatchedTables.push(tempTable)
        } else {
            tableNameMap.set(name, [tempTable])
        }

        return tempTable
    })

    const nodes = tempTables.map((tempTable, index) => {
        const newSuperTables: GenTableModelInput_TargetOf_superTables[] = []
        for (const superTable of tempTable.superTables) {
            const matchedSuperTables = tableNameMap.get(superTable.name)
            if (matchedSuperTables && matchedSuperTables.length > 0) {
                const lastMatchedSuperTable = matchedSuperTables[matchedSuperTables.length - 1]
                newSuperTables.push({name: lastMatchedSuperTable.name})
            }
        }
        tempTable.superTables = newSuperTables

        const node = tableToNode(
            tempTable,
            {
                x: (baseOptions?.x !== undefined && eachTableOptions && eachTableOptions[index] && eachTableOptions[index].x !== undefined) ?
                    baseOptions.x + eachTableOptions[index].x! : baseOptions?.x,
                y: (baseOptions?.y !== undefined && eachTableOptions && eachTableOptions[index] && eachTableOptions[index].y !== undefined) ?
                    baseOptions.y + eachTableOptions[index].y! : baseOptions?.y,
            }
        )

        return graph.addNode(node)
    })

    return {
        nodes,
        tableNameMap,
    }
}
