import {GenTableCommonView} from "../../../api/__generated/model/static";
import {Graph} from "@antv/x6";
import {COLUMN_HEIGHT, COLUMN_PORT} from "../constant";

export const addTableNodes = (graph: Graph, tables: readonly GenTableCommonView[]) => {
    tables.forEach(table => {
        graph.addNode({
            x: 0,
            y: 0,
            shape: "table",
            data: table,
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
        })
    })
}

export const removeTableNodes = (graph: Graph, tables: readonly GenTableCommonView[]) => {
    tables.forEach(table => {
        graph.removeNode(`table-${table.id}`)
    })
}