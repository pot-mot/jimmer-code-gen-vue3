import { Edge, Graph, Shape } from "@antv/x6";
import { COMMON_COLOR, MANY_TO_ONE, ONE_TO_ONE } from "../constant";
import { AssociationType } from "../../../api/__generated/model/enums";
import { GenAssociationMatchView } from "../../../api/__generated/model/static";
import { columnIdToPortId, portIdToColumnId } from "../port/ColumnPort.ts";
import { nodeIdToTableId, tableIdToNodeId } from "../node/TableNode.ts";
import { Options } from "@antv/x6/es/graph/options";
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
            label: { text: MANY_TO_ONE }
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

    validateConnection({sourcePort,targetPort}) {
        return searchEdgesIgnoreDirection(this, sourcePort, targetPort).length == 0
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

export const nodeIsExist = (graph: Graph, nodeId: string): boolean => {
    const cell = graph.getCellById(nodeId)
    return cell && cell.isNode()
}

/**
 * 寻找 Edge，忽视方向
 * @param graph 图
 * @param port1 连接桩1 
 * @param port2 连接桩2
 * @returns Edge 数组
 */
export const searchEdgesIgnoreDirection = (graph: Graph, port1: string, port2: string): Edge[] => {
    return graph.getEdges().filter(
        edge => 
        (edge.getTargetPortId() == port1 && edge.getSourcePortId() == port2) ||
        (edge.getTargetPortId() == port2 && edge.getSourcePortId() == port1)
    )
}

/**
 * 寻找 Edge
 * @param graph 图
 * @param sourcePort 源连接桩
 * @param targetPort 目标连接桩
 * @returns Edge 数组
 */
export const searchEdges = (graph: Graph, sourcePort: string, targetPort: string): Edge[] => {
    return graph.getEdges().filter(edge => edge.getSourcePortId() == sourcePort && edge.getTargetPortId() == targetPort)
}

export const setLabel = (edge: Edge, label: string) => {
    edge.setLabelAt(0, label)
}

export const getLabel = (edge: Edge): AssociationType => {
    return edge.labels[0].attrs!.label.text as AssociationType;
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

export const getAssociations = (graph: Graph): GenAssociationMatchView[] => {
    return graph.getEdges().map(edgeToAssociation)
}

export const addAssociationEdges = (graph: Graph, associations: readonly GenAssociationMatchView[]) => {
    graph.startBatch('add edge')

    associations.map(associationToEdge).forEach(newEdge => {
        try {
            const sourceCellId = newEdge.getSourceCellId()
            if (!sourceCellId || !nodeIsExist(graph, sourceCellId)) return

            const targetCellId = newEdge.getTargetCellId()
            if (!targetCellId || !nodeIsExist(graph, targetCellId)) return

            const sourcePortId = newEdge.getSourcePortId()
            if (!sourcePortId) return
            const targetPortId = newEdge.getTargetPortId()
            if (!targetPortId) return

            const isExist = searchEdgesIgnoreDirection(graph, sourcePortId, targetPortId).length > 0
            if (isExist) return

            graph.addEdge(newEdge)
        } catch (e) {
            console.warn('add edge fail', newEdge, e)
        }
    })

    graph.stopBatch('add edge')
}


export const useSwitchAssociationType = (graph: Graph) => {
    graph.on('edge:click', ({ edge }) => {
        if (!edge) return;

        if (getLabel(edge) == MANY_TO_ONE) {
            setLabel(edge, ONE_TO_ONE)
        } else {
            setLabel(edge, MANY_TO_ONE)
        }
    })
}