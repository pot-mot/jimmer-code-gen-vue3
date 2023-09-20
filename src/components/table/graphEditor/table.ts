import {GenTableColumnsView} from "../../../api/__generated/model/static";
import {GenTableColumnsView_TargetOf_columns} from "../../../api/__generated/model/static/GenTableColumnsView.ts";

import {Graph} from "@antv/x6";
import {COLUMN_HEIGHT, COLUMN_PORT, COLUMN_PORT_GROUP} from "../constant";
import {getLabel} from "../edge/AssociationEdge.ts";

const columnToPort = (column: GenTableColumnsView_TargetOf_columns) => {
    return {
        id: `column-${column.id}`,
        group: COLUMN_PORT_GROUP,
    }
}

const tableToNode = (table: GenTableColumnsView, options: any = undefined) => {
    return {
        ...options,
        shape: "table",
        data: {table},
        id: `table-${table.id}`,
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

export const addTableNodes = (graph: Graph, tables: readonly GenTableColumnsView[]) => {
    graph.addNodes(tables.map(table => {
        const svgRect = graph.view.svg.getBoundingClientRect()
        return tableToNode(table, graph.graphToLocal(svgRect.width / 4 + Math.random() * svgRect.width / 8, svgRect.height / 4 + Math.random() * svgRect.height / 8))
    }))
}

export const removeTableNodes = (graph: Graph, tables: readonly GenTableColumnsView[]) => {
    graph.removeCells(tables.map(table => `table-${table.id}`))
}

export const getAssociations = (graph: Graph) => {
    graph.getEdges().forEach(edge => {
        console.log(edge.getSourcePortId(), edge.getTargetPortId(), getLabel(edge))
    })
}