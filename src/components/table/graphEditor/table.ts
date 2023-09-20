import {GenTableCommonView} from "../../../api/__generated/model/static";
import {Graph} from "@antv/x6";
import {COLUMN_HEIGHT, COLUMN_PORT} from "../constant";

const tableToNode = (table: GenTableCommonView, graph: Graph) => {
    return {
        shape: "table",
        data: {table, graph},
        id: `table-${table.id}`,
        ports: {
            groups: {
                column: {
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
        },
    }
}

export const addTableNodes = (graph: Graph, tables: readonly GenTableCommonView[]) => {
    graph.addNodes(tables.map(table => {
        return tableToNode(table, graph)
    }))
}

export const removeTableNodes = (graph: Graph, tables: readonly GenTableCommonView[]) => {
    graph.removeCells(tables.map(table => `table-${table.id}`))
}