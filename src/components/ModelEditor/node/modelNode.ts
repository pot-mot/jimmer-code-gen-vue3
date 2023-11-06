import {GenTableColumnsInput} from "../../../api/__generated/model/static";
import {Graph} from "@antv/x6";

const modelToNode = (table: GenTableColumnsInput, options: any = undefined) => {
    return {
        ...options,
        shape: "model",
        data: {table},
        ports: {
            groups: {
                right: {
                    position: 'right',
                    zindex: 'auto',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#5F95FF',
                            strokeWidth: 1,
                            fill: '#fff',
                        },
                    },
                },
                left: {
                    position: 'left',
                    zindex: 'auto',
                    attrs: {
                        circle: {
                            r: 4,
                            magnet: true,
                            stroke: '#5F95FF',
                            strokeWidth: 1,
                            fill: '#fff',
                        },
                    },
                },
            },
            items: [
                {
                    group: 'right',
                },
                {
                    group: 'left',
                },
            ],
        }
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