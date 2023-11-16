import {GenTableColumnsInput} from "../../../api/__generated/model/static";
import {Graph, Node} from "@antv/x6";
import {columnPortGroup} from "../../AssociationEditor/node/ColumnPort.ts";
import {COLUMN_PORT_GROUP} from "../../../utils/graphEditor/constant.ts";
import {GenTableColumnsInput_TargetOf_columns} from "../../../api/__generated/model/static/GenTableColumnsInput.ts";

export const modelColumnToPort = (column: GenTableColumnsInput_TargetOf_columns) => {
    return {
        group: COLUMN_PORT_GROUP,
        data: {
            column
        }
    }
}

const modelToNode = (table: GenTableColumnsInput, options: any = undefined) => {
    return {
        ...options,
        shape: "model",
        data: {
            table
        },
        ports: {
            groups: {
                COLUMN_PORT_GROUP: columnPortGroup,
            },
            items: [
                ...table.columns.map(modelColumnToPort)
            ]
        },
    }
}

export const importModelNodes = (graph: Graph, tables: readonly GenTableColumnsInput[]): Node[] => {
    const nodes: Node[] = tables.map(table => {
        const svgRect = graph.view.svg.getBoundingClientRect()
        return modelToNode(table, graph.graphToLocal(
            svgRect.width / 2,
            svgRect.height / 2
        ))
    })

    graph.addNodes(nodes)

    return graph.getNodes().filter(node => tables.map(it => it.name).includes(node.getData().table.name))
}