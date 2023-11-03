import {GenTableColumnsInput} from "../../../api/__generated/model/static";
import {Graph, Node} from "@antv/x6";

const modelToNode = (table: GenTableColumnsInput, options: any = undefined) => {
    return {
        ...options,
        shape: "model",
        data: {table},
    }
}

export const addModelNode = (graph: Graph, table: GenTableColumnsInput): Node => {
    const svgRect = graph.view.svg.getBoundingClientRect()
    const node = modelToNode(table, graph.graphToLocal(
        svgRect.width / 2,
        svgRect.height / 2
    ))

    graph.addNode(node)

    return node
}