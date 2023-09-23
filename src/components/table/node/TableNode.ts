import {GenTableColumnsView} from "../../../api/__generated/model/static";
import {Graph, Node} from "@antv/x6";
import {COLUMN_HEIGHT, COLUMN_PORT} from "../constant";
import {columnToPort} from "../port/ColumnPort.ts";

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
                COLUMN_PORT_GROUP: {
                    position: COLUMN_PORT,
                    markup: [
                        {
                            tagName: 'rect',
                            selector: 'portBody',
                        }
                    ],
                    attrs: {
                        portBody: {
                            magnet: true,
                            fill: "rgba(0,0,0,0)",
                            height: COLUMN_HEIGHT
                        }
                    }
                },
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

export const addTableNodes = (graph: Graph, tables: readonly GenTableColumnsView[]) => {
    graph.addNodes(tables.map(table => {
        const svgRect = graph.view.svg.getBoundingClientRect()
        return tableToNode(table, graph.graphToLocal(svgRect.width / 4 + Math.random() * svgRect.width / 8, svgRect.height / 4 + Math.random() * svgRect.height / 8))
    }))
}

export const removeTableNodes = (graph: Graph, ids: readonly number[]) => {
    graph.removeCells(ids.map(id => tableIdToNodeId(id)))
}