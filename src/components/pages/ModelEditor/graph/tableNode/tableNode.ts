import {
    GenTableModelInput,
    GenTableColumnsView,
    GenTableModelInput_TargetOf_columns
} from "@/api/__generated/model/static";
import {Graph, Node} from "@antv/x6";
import {columnPortGroup} from "@/components/pages/ModelEditor/graph/tableNode/columnPort.ts";
import {COLUMN_PORT_GROUP, TABLE_NODE} from "@/components/business/modelEditor/constant.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/tableNodeData.ts";

export const columnToPort = () => {
    return {
        group: COLUMN_PORT_GROUP,
    }
}

const tableToNode = (table: GenTableModelInput, options: any = undefined) => {
    return {
        ...options,
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
    }
}

export const tableViewToInput = (tableView: GenTableColumnsView): GenTableModelInput => {
    return {
        comment: tableView.comment,
        name: tableView.name,
        orderKey: tableView.orderKey,
        remark: tableView.remark,
        type: tableView.type,
        indexes: tableView.indexes.map(indexView => {
            return {
                name: indexView.name,
                uniqueIndex: indexView.uniqueIndex,
                columns: tableView.columns
                    .filter(it => indexView.columnIds.includes(it.id))
                    .map(it => it.name)
                    .map(it => {
                        return {name: it}
                    })
            }
        }),
        columns: tableView.columns.map(column => {
            return <GenTableModelInput_TargetOf_columns>{
                autoIncrement: column.autoIncrement,
                comment: column.comment,
                defaultValue: column.defaultValue,
                displaySize: column.displaySize,
                name: column.name,
                numericPrecision: column.numericPrecision,
                orderKey: column.orderKey,
                partOfPk: column.partOfPk,
                remark: column.remark,
                typeCode: column.typeCode,
                overwriteByType: column.overwriteByType,
                type: column.type,
                typeNotNull: column.typeNotNull,
                logicalDelete: column.logicalDelete,
                businessKey: column.businessKey,
                enum:
                    column.enum ?
                        {name: column.enum.name} :
                        undefined
            }
        }),
    }
}

export const getTableNameMap = <T extends GenTableModelInput | GenTableColumnsView>(graph: Graph): Map<string, T[]> => {
    const tableNameMap = new Map<string, T[]>

    graph.getNodes()
        .filter(it => it.shape == TABLE_NODE && it.getData()?.table != undefined)
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

export const importTables = <T extends GenTableModelInput | GenTableColumnsView>(
    graph: Graph,
    tables: T[],
    initX?: number, initY?: number
): {
    nodes: Node[],
    tableNameMap: Map<string, (GenTableModelInput | GenTableColumnsView)[]>// 表与名称重复的表的最终 map，除了已经存在的名称，后续的名称将自动向后追加 count
} => {
    const tableNameMap = getTableNameMap(graph)

    const nodes: Node[] = tables.map(table => {
        const svgRect = graph.view.svg.getBoundingClientRect()

        const name = table.name
        if (tableNameMap.has(name)) {
            let count = tableNameMap.get(name)!.length
            let tempName = `${name}(${count})`
            while (tableNameMap.has(tempName)) {
                tempName = `${name}(${count++})`
            }
            table.name = tempName
            tableNameMap.get(name)!.push(table)
        } else {
            tableNameMap.set(name, [table])
        }

        const tableInput: GenTableModelInput = Object.keys(table).includes('id') ? tableViewToInput(table as GenTableColumnsView) : table as GenTableModelInput

        return graph.addNode(tableToNode(tableInput, graph.graphToLocal(
            initX ? initX : svgRect.width * 3 / 8 + Math.random() * 20,
            initY ? initY : svgRect.height * 3 / 8 + Math.random() * 20
        )))
    })

    return {
        nodes,
        tableNameMap,
    }
}
