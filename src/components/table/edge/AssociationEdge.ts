import {Edge, Graph, Shape} from "@antv/x6";
import {COMMON_COLOR, MANY_TO_MANY, MANY_TO_ONE, ONE_TO_ONE} from "../constant";
import {AssociationType} from "../../../api/__generated/model/enums";
import {GenAssociationMatchView} from "../../../api/__generated/model/static";
import {columnIdToPortId, portIdToColumnId} from "../port/ColumnPort.ts";
import {api} from "../../../api";

export const AssociationEdgeConnecting = {
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

export const getLabel = (edge: Edge): AssociationType => {
    return edge.labels[0].attrs!.label.text as AssociationType;
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

export const associationToEdge = (association: GenAssociationMatchView): Edge.Metadata => {
    return {
        source: columnIdToPortId(association.sourceColumnId),
        target: columnIdToPortId(association.targetColumnId),
        label: association.associationType
    }
}

export const edgeToAssociation = (edge: Edge): GenAssociationMatchView => {
    return {
        sourceColumnId: portIdToColumnId(edge.getSourcePortId()!),
        targetColumnId: portIdToColumnId(edge.getTargetPortId()!),
        associationType: getLabel(edge),
    }
}

export const getAssociations = (graph: Graph) => {
    return graph.getEdges().map(edgeToAssociation)
}

export const addAssociationEdges = (graph: Graph, associations: readonly GenAssociationMatchView[]) => {
    graph.addEdges(associations.map(associationToEdge))
}

export const scanAssociations = async (tableIds: readonly number[]) => {
    return await api.associationService.scan({body: tableIds})
}