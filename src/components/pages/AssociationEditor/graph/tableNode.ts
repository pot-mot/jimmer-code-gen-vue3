import {GenTableColumnsView} from "@/api/__generated/model/static";
import {Graph, Node} from "@antv/x6";
import {columnToPort} from "./columnPort.ts";
import {columnPortGroup} from "@/components/business/model/columnPort.ts";

export const tableIdToNodeId = (id: number) => {
    return `table-${id}`
}

export const nodeIdToTableId = (id: string) => {
    return parseInt(id.replace('table-', ''))
}

const tableToNode = (table: GenTableColumnsView, options: any = undefined) => {
    return {
        ...options,
        shape: "table",
        data: {table},
        id: tableIdToNodeId(table.id),
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

export const nodeToTable = (node: Node): GenTableColumnsView => {
    return node.data.table
}

export const getTables = (graph: Graph): GenTableColumnsView[] => {
    return graph.getNodes().map(nodeToTable)
}

/**
 * 插入 TableNode
 * @param graph
 * @param tables
 */
export const importTableNodes = (graph: Graph, tables: readonly GenTableColumnsView[]): Node[] => {
    const nodes: Node[] = tables.map(table => {
        const svgRect = graph.view.svg.getBoundingClientRect()
        return tableToNode(table, graph.graphToLocal(
            svgRect.width / 2,
            svgRect.height / 2
        ))
    })

    graph.addNodes(nodes)

    return graph.getNodes().filter(node => nodes.map(it => it.id).includes(node.id))
}

/**
 * 从图中移除 TableNode
 * @param graph
 * @param ids
 */
export const removeTableNodes = (graph: Graph, ids: readonly number[]) => {
    graph.removeCells(ids.map(id => tableIdToNodeId(id)))
}
