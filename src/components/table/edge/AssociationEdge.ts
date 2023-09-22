import {Edge, Graph, Node, Shape} from "@antv/x6";
import {COMMON_COLOR, MANY_TO_MANY, MANY_TO_ONE, ONE_TO_ONE} from "../constant";
import {AssociationType} from "../../../api/__generated/model/enums";
import {GenAssociationMatchView} from "../../../api/__generated/model/static";
import {columnIdToPortId, portIdToColumnId} from "../port/ColumnPort.ts";
import {api} from "../../../api";
import {nodeIdToTableId, tableIdToNodeId} from "../node/TableNode.ts";
import {Options} from "@antv/x6/es/graph/options";
import Connecting = Options.Connecting;

const baseColumnEdge = {
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
}

export const AssociationEdgeConnecting: Partial<Connecting> = {
    router: {
        name: 'er',
        args: {
            offset: 25,
            direction: 'H',
        },
    },

    validateConnection(
        {
            sourcePort,
            targetPort,
        }
    ) {
        const graph = this
        const edges = graph.getEdges()

        let isExist = false

        for (let edge of edges) {
            if (
                (edge.getTargetPortId() == targetPort && edge.getSourcePortId() == sourcePort) ||
                (edge.getTargetPortId() == sourcePort && edge.getSourcePortId() == targetPort)
            ) {
                isExist = true
                break
            }
        }

        return !isExist
    },

    // @ts-ignore
    createEdge() {
        return new Shape.Edge({
            ...baseColumnEdge
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

export const associationToEdge = (association: GenAssociationMatchView): Edge => {
    const edge: Edge = new Shape.Edge<Edge.Properties>({
        ...baseColumnEdge,
        source: {
            cell: tableIdToNodeId(association.sourceColumn.table!.id),
            port: columnIdToPortId(association.sourceColumn.id)
        },
        target: {
            cell: tableIdToNodeId(association.targetColumn.table!.id),
            port: columnIdToPortId(association.targetColumn.id)
        },
    })
    setLabel(edge, association.associationType)
    return edge
}

export const edgeToAssociation = (edge: Edge): GenAssociationMatchView => {
    return {
        sourceColumn: {
            id: portIdToColumnId(edge.getSourcePortId()!),
            table: {
                id: nodeIdToTableId(edge.getSourceNode()!.id)
            }
        },
        targetColumn: {
            id: portIdToColumnId(edge.getTargetPortId()!),
            table: {
                id: nodeIdToTableId(edge.getTargetNode()!.id)
            }
        },
        associationType: getLabel(edge),
    }
}

export const getAssociations = (graph: Graph) => {
    return graph.getEdges().map(edgeToAssociation)
}

const compareEdge = (oldEdge: Edge, newEdge: Edge): boolean => {
    return oldEdge.getSourcePortId() == newEdge.getSourcePortId() && oldEdge.getTargetPortId() == newEdge.getTargetPortId();
}

export const addAssociationEdges = (graph: Graph, associations: readonly GenAssociationMatchView[]) => {
    graph.startBatch('add edge')

    associations.map(associationToEdge).forEach(newEdge => {
        try {
            const edges: Edge[] = graph.getEdges();
            const isDuplicate = edges.some((oldEdge) => compareEdge(oldEdge, newEdge))
            // 如果不存在 source 和 target 相同的边
            if (!isDuplicate) {
                graph.addEdge(newEdge)
            }
        } catch (e) {
            console.warn('add edge fail', newEdge, e)
        }
    })

    graph.stopBatch('add edge')
}

export const scanAssociations = async (tableIds: readonly number[]) => {
    return await api.associationService.scan({body: tableIds})
}