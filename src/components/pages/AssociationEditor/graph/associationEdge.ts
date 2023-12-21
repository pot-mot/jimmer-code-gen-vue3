import {Edge, Graph, Shape} from "@antv/x6";
import {GenAssociationMatchView} from "@/api/__generated/model/static";
import {columnIdToPortId, portIdToColumnId} from "./columnPort.ts";
import {nodeIdToTableId, tableIdToNodeId} from "./tableNode.ts";

import {baseAssociationEdge} from "@/components/business/model/associationEdge/define.ts";
import {getAssociationType, setAssociationType} from "@/components/business/model/associationEdge/associationType.ts";
import {getAssociationFake, setAssociationFake} from "@/components/business/model/associationEdge/associationFake.ts";

/** 转换关联为 Edge */
export const associationToEdge = (association: GenAssociationMatchView): Edge | undefined => {
    if (association.columnReferences.length > 1) return

    const columnReference = association.columnReferences[0]

    const edge: Edge = new Shape.Edge<Edge.Properties>({
        ...baseAssociationEdge,
        source: {
            cell: tableIdToNodeId(association.sourceTableId),
            port: columnIdToPortId(columnReference.sourceColumnId)
        },
        target: {
            cell: tableIdToNodeId(association.targetTableId),
            port: columnIdToPortId(columnReference.targetColumnId)
        },
    })
    if (association.associationType) {
        setAssociationType(edge, association.associationType)
    }
    setAssociationFake(edge, association.fake)

    return edge
}

/** 转换 Edge 为关联 */
export const edgeToAssociation = (edge: Edge): GenAssociationMatchView => {
    const name = edge.getData()?.association.name
    const associationType = getAssociationType(edge)
    const fake = getAssociationFake(edge)

    return {
        name: name ? name : edge.id,
        sourceTableId: nodeIdToTableId(edge.getSourceNode()!.id),
        targetTableId: nodeIdToTableId(edge.getTargetNode()!.id),

        columnReferences: [
            {
                sourceColumnId: portIdToColumnId(edge.getSourcePortId()!),
                targetColumnId: portIdToColumnId(edge.getTargetPortId()!)
            }
        ],
        associationType: associationType ? associationType : 'MANY_TO_MANY',
        fake
    }
}

export const getAssociations = (graph: Graph): GenAssociationMatchView[] => {
    return graph.getEdges().map(edgeToAssociation)
}
