import {Edge, Shape} from "@antv/x6";
import {GenAssociationMatchView} from "@/api/__generated/model/static";
import {columnIdToPortId, portIdToColumnId} from "./columnPort.ts";
import {nodeIdToTableId, tableIdToNodeId} from "./tableNode.ts";

import {baseAssociationEdge} from "@/components/business/model/associationEdge/define.ts";
import {
    getAssociationType,
    setAssociationType
} from "@/components/business/model/associationEdge/associationType.ts";

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
        setAssociationType(edge, association.associationType)
    }
    return edge
}

/** 转换 Edge 为关联 */
export const edgeToAssociation = (edge: Edge): GenAssociationMatchView => {
    const associationType = getAssociationType(edge)

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
        associationType: associationType ? associationType : 'MANY_TO_MANY',
    }
}

