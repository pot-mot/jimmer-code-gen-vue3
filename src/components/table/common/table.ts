import {GenTableCommonView} from "../../../api/__generated/model/static";
import {Graph} from "@antv/x6";
import {COLUMN_HEIGHT} from "../constant";

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
                        position: 'Column',    // 链接桩布局
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