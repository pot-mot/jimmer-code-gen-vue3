import {Edge, Graph, Shape} from "@antv/x6";
import {COMMON_COLOR, MANY_TO_ONE, ONE_TO_ONE} from "../constant";
import {AssociationType} from "../../../api/__generated/model/enums";
import {GenAssociationMatchView} from "../../../api/__generated/model/static";
import {columnIdToPortId, portIdToColumnId} from "../port/ColumnPort.ts";
import {nodeIdToTableId, tableIdToNodeId} from "../node/TableNode.ts";
import {Options} from "@antv/x6/es/graph/options";
import Connecting = Options.Connecting;
import {searchEdgesIgnoreDirection} from "../../../utils/graphEditor/search.ts";
import {erRouter, orthRouter} from "../../../utils/graphEditor/router.ts";

const baseColumnEdge = {
    attrs: {
        line: {
            stroke: COMMON_COLOR,
            strokeWidth: 1,
        },
    },
    labels: [{
        markup: [
            {
                tagName: 'text',
                selector: 'label',
            },
        ],
        attrs: {
            label: {
                text: MANY_TO_ONE
            },
        }
    }],
    data: {
        selectFlag: false
    }
}

export const AssociationEdgeConnecting: Partial<Connecting> = {
    validateConnection({sourcePort, targetPort}) {
        if (!sourcePort || !targetPort) return false
        return searchEdgesIgnoreDirection(<any>this, sourcePort, targetPort).length == 0
    },

    // @ts-ignore
    createEdge() {
        return new Shape.Edge({
            ...baseColumnEdge,
            router: erRouter
        })
    },
    // 在连接建立后调整 router
    validateEdge(edge) {
        if (edge.edge.getTargetCellId() == edge.edge.getSourceCellId()) {
            edge.edge.router = orthRouter
        }
        return true
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

/** 转换关联为 Edge */
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
    if (association.associationType) {
        setLabel(edge, association.associationType)
    }
    return edge
}

/** 转换 Edge 为关联 */
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

export const useSwitchAssociationType = (graph: Graph) => {
    graph.on('edge:unselected', (cell) => {
        if (!cell) return
        cell.edge.getData().selectFlag = false
    })

    graph.on('edge:click', ({edge, e}) => {
        if (!edge || e.ctrlKey) return

        if (!edge.getData().selectFlag) {
            edge.getData().selectFlag = true
            return
        }

        if (getLabel(edge) == MANY_TO_ONE) {
            setLabel(edge, ONE_TO_ONE)
        } else {
            setLabel(edge, MANY_TO_ONE)
        }
    })
}