import {GenTableColumnsInput} from "../../../api/__generated/model/static";
import {Graph} from "@antv/x6";
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
        data: {table},
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

export const addModelNode = (graph: Graph, table: GenTableColumnsInput) => {
    const svgRect = graph.view.svg.getBoundingClientRect()
    const node = modelToNode(table, graph.graphToLocal(
        svgRect.width / 2,
        svgRect.height / 2
    ))

    return graph.addNode(node)
}