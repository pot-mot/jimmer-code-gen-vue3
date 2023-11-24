import {Edge, Graph, Shape} from "@antv/x6";
import {
    ASSOCIATION_LABEL_TEXT_SELECTOR,
    COMMON_COLOR,
    MANY_TO_MANY,
    MANY_TO_ONE,
    ONE_TO_MANY,
    ONE_TO_ONE
} from "@/components/business/graphEditor/constant.ts";
import {AssociationType} from "@/api/__generated/model/enums";
import {GenAssociationMatchView} from "@/api/__generated/model/static";
import {columnIdToPortId, portIdToColumnId} from "../node/ColumnPort.ts";
import {nodeIdToTableId, tableIdToNodeId} from "../node/TableNode.ts";
import {Options} from "@antv/x6/es/graph/options";
import {erRouter, orthRouter} from "@/components/business/graphEditor/edgeRouter.ts";
import {sendMessage} from "@/utils/message.ts";
import {judgeClickBox} from "@/utils/clickBox.ts";
import Connecting = Options.Connecting;

const baseLabel = {
    markup: [
        {
            tagName: 'text',
            selector: ASSOCIATION_LABEL_TEXT_SELECTOR,
        },
    ],
    attrs: {
        ASSOCIATION_LABEL_TEXT_SELECTOR: {
            text: MANY_TO_ONE,
        },
    },
}

export const baseAssociationEdge = {
    attrs: {
        line: {
            stroke: COMMON_COLOR,
            strokeWidth: 1,
        },
    },
    labels: [
        {...baseLabel}
    ],
    data: {
        selectFlag: false
    }
}

export const AssociationEdgeConnecting: Partial<Connecting> = {
    // @ts-ignore
    createEdge() {
        return new Shape.Edge({
            ...baseAssociationEdge,
            router: erRouter
        })
    },
    validateEdge({edge}) {
        const targetPort = edge.getTargetNode()?.getPort(edge.getTargetPortId()!)
        if (!targetPort) return false

        const sourcePort = edge.getSourceNode()?.getPort(edge.getSourcePortId()!)
        if (!sourcePort) return false

        if (targetPort.data.column.typeCode != sourcePort.data.column.typeCode) {
            sendMessage('关联两端类型不一致', 'warning')
            return false
        }

        // 在连接建立后调整 router
        if (edge.getTargetCellId() == edge.getSourceCellId()) {
            edge.router = orthRouter
        }
        return true
    },

    allowMulti: 'withPort',
    allowBlank: false,
    allowNode: false,
    allowEdge: false,
}

export const setLabel = (edge: Edge, label: string) => {
    edge.setLabelAt(0, {...baseLabel, attrs: {ASSOCIATION_LABEL_TEXT_SELECTOR: {text: label}}})
}

export const getAssociationType = (edge: Edge): AssociationType => {
    return edge.getLabelAt(0)!.attrs![ASSOCIATION_LABEL_TEXT_SELECTOR].text as AssociationType;
}

/** 转换关联为 Edge */
export const associationToEdge = (association: GenAssociationMatchView): Edge => {
    const edge: Edge = new Shape.Edge<Edge.Properties>({
        ...baseAssociationEdge,
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
        associationType: getAssociationType(edge),
    }
}

export const getAssociations = (graph: Graph): GenAssociationMatchView[] => {
    return graph.getEdges().map(edgeToAssociation)
}

export const useSwitchAssociationType = (graph: Graph) => {
    graph.on('edge:unselected', ({edge}) => {
        edge.getData().selectFlag = false
    })

    graph.on('edge:click', ({edge, e}) => {
        if (!edge || e.ctrlKey) return

        if (!edge.getData().selectFlag) {
            edge.getData().selectFlag = true
            return
        }

        const edgeSvg = document.documentElement.querySelector(`[data-cell-id="${edge.id}"]`)! as SVGGElement

        const label = edgeSvg.querySelector('.x6-edge-label') as SVGGElement

        const labelBox = label.getBoundingClientRect()

        if (judgeClickBox(labelBox, e.clientX, e.clientY)) {
            if (getAssociationType(edge) == MANY_TO_ONE) {
                setLabel(edge, ONE_TO_ONE)
            } else if (getAssociationType(edge) == ONE_TO_ONE) {
                setLabel(edge, MANY_TO_MANY)
            } else if (getAssociationType(edge) == MANY_TO_MANY) {
                setLabel(edge, ONE_TO_MANY)
            } else if (getAssociationType(edge) == ONE_TO_MANY) {
                setLabel(edge, MANY_TO_ONE)
            }

            e.preventDefault()
            e.stopPropagation()
        }
    })
}