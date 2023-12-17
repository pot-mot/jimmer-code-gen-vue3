import {GenTableColumnsInput} from "@/api/__generated/model/static";
import {Graph, Node} from "@antv/x6";
import {columnPortGroup} from "@/components/business/model/columnPort.ts";
import {COLUMN_PORT_GROUP} from "@/components/business/model/constant.ts";

export const modelColumnToPort = () => {
    return {
        group: COLUMN_PORT_GROUP,
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

export const importModelNodes = (graph: Graph, tables: readonly GenTableColumnsInput[], initX?: number, initY?: number): Node[] => {
    const nodes: Node[] = tables.map(table => {
        const svgRect = graph.view.svg.getBoundingClientRect()
        return modelToNode(table, graph.graphToLocal(
            initX ? initX : svgRect.width * 3 / 8,
            initY ? initY : svgRect.height * 3 / 8
        ))
    })

    graph.addNodes(nodes)

    return graph.getNodes().filter(node => tables.map(it => it.name).includes(node.getData().table.name))
}
