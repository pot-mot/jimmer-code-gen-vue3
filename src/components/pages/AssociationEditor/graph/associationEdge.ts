import {Edge, Graph, Shape} from "@antv/x6";
import {
    ASSOCIATION_LABEL_TEXT_SELECTOR,
    MANY_TO_MANY,
    MANY_TO_ONE,
    ONE_TO_MANY,
    ONE_TO_ONE
} from "@/components/business/graphEditor/constant.ts";
import {cloneDeep} from 'lodash'
import {AssociationType} from "@/api/__generated/model/enums";
import {GenAssociationMatchView} from "@/api/__generated/model/static";
import {columnIdToPortId, portIdToColumnId} from "./columnPort.ts";
import {nodeIdToTableId, tableIdToNodeId} from "./tableNode.ts";
import {judgeClickBox} from "@/utils/clickBox.ts";

import {baseAssociationEdge, baseLabel} from "@/components/business/model/associationEdge/define.ts";

export const setLabel = (edge: Edge, label: string) => {
    edge.setLabelAt(0, {...cloneDeep(baseLabel), attrs: {ASSOCIATION_LABEL_TEXT_SELECTOR: {text: label}}})
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
