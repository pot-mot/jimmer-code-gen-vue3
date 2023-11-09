import {Edge, Graph} from "@antv/x6";
import {AssociationType} from "../../../api/__generated/model/enums";
import {getAssociationType} from "../../AssociationEditor/edge/AssociationEdge.ts";
import {searchNodeByTableName, searchPortByColumnName} from "../../../utils/graphEditor/search.ts";

export interface EdgeData {
    sourceTableName: string,
    targetTableName: string,
    sourceColumnName: string,
    targetColumnName: string,
    associationType: AssociationType,
    edge: Edge
}

export const mapEdgeToData = (edge: Edge): EdgeData => {
    return {
        sourceTableName: edge.getSourceNode()?.getData().table.name,
        targetTableName: edge.getTargetNode()?.getData().table.name,
        sourceColumnName: edge.getSourceNode()?.getPort(edge.getSourcePortId()!)?.data.column.name,
        targetColumnName: edge.getTargetNode()?.getPort(edge.getTargetPortId()!)?.data.column.name,
        associationType: getAssociationType(edge),
        edge,
    }
}

export const mapDataToEdge = (graph: Graph, data: EdgeData): Edge | undefined => {
    const sourceNode = searchNodeByTableName(graph, data.sourceTableName)
    const targetNode = searchNodeByTableName(graph, data.targetTableName)

    if (!sourceNode || !targetNode) return

    const sourcePort = searchPortByColumnName(sourceNode, data.sourceColumnName)
    const targetPort = searchPortByColumnName(targetNode, data.targetColumnName)

    if (!sourcePort || !targetPort) return

    data.edge.setSource({cell: sourceNode.id, port: sourcePort.id})
    data.edge.setTarget({cell: targetNode.id, port: targetPort.id})

    return data.edge
}