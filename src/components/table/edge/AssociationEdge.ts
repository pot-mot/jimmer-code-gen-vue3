import {Edge, Graph, Shape} from "@antv/x6";
import {COMMON_COLOR, MANY_TO_MANY, MANY_TO_ONE, ONE_TO_ONE} from "../constant";

export const AssociationEdge = {
    router: {
        name: 'er',
        args: {
            offset: 25,
            direction: 'H',
        },
    },

    createEdge() {
        return new Shape.Edge({
            attrs: {
                line: {
                    stroke: COMMON_COLOR,
                    strokeWidth: 1,
                },
            },
            labels: [{
                attrs: {
                    label: {text: MANY_TO_ONE}
                }
            }]
        })
    },

    allowBlank: false,
    allowNode: false,
    allowEdge: false,
}

export const setLabel = (edge: Edge, label: string) => {
    edge.setLabelAt(0, label)
}

export const getLabel = (edge: Edge) => {
    return edge.labels[0].attrs!.label.text
}

export const useSwitchAssociationType = (graph: Graph) => {
    graph.on('edge:click', ({edge}) => {
        if (!edge) return;

        if (getLabel(edge) == MANY_TO_ONE) {
            setLabel(edge, MANY_TO_MANY)
        } else if (getLabel(edge) == MANY_TO_MANY) {
            setLabel(edge, ONE_TO_ONE)
        } else {
            setLabel(edge, MANY_TO_ONE)
        }
    })
}