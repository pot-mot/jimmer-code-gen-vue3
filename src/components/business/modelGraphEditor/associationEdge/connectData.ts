import {Node, Edge} from "@antv/x6";
import {GenTableColumnsInput, GenTableColumnsView} from "@/api/__generated/model/static";
import {PortManager} from "@antv/x6/es/model/port";
import PortMetadata = PortManager.PortMetadata;
import {TABLE_NODE} from "@/components/business/modelGraphEditor/constant.ts";

export interface EdgeConnect {
    sourceNode: Node,

    sourcePortId: string,
    sourcePortIndex: number,
    sourcePort: PortMetadata,

    targetNode: Node,

    targetPortId: string,
    targetPortIndex: number,
    targetPort: PortMetadata,
}

export const getEdgeConnect = (edge: Edge): EdgeConnect | undefined => {
    const sourceNode = edge.getSourceNode()
    if (!sourceNode || sourceNode.shape != TABLE_NODE) return
    const targetNode = edge.getTargetNode()
    if (!targetNode || targetNode.shape != TABLE_NODE) return

    const sourcePortId = edge.getSourcePortId()
    if (!sourcePortId) return
    const targetPortId = edge.getTargetPortId()
    if (!targetPortId) return

    const sourcePort = sourceNode.getPort(sourcePortId)
    if (!sourcePort) return
    const sourcePortIndex = sourceNode.ports.items.findIndex((value) => value.id == sourcePortId)

    const targetPort = targetNode.getPort(targetPortId)
    if (!targetPort) return
    const targetPortIndex = targetNode.ports.items.findIndex((value) => value.id == targetPortId)

    return {
        sourceNode,
        sourcePortId,
        sourcePortIndex,
        sourcePort,
        targetNode,
        targetPortId,
        targetPortIndex,
        targetPort
    }
}

export interface EdgeConnectData<
    T extends GenTableColumnsInput | GenTableColumnsView = GenTableColumnsInput,
> extends EdgeConnect {
    sourceTable: T,
    sourceColumn: T['columns'][number],
    targetTable: T,
    targetColumn: T['columns'][number],
}

export const getEdgeConnectData = <
    T extends GenTableColumnsInput | GenTableColumnsView = GenTableColumnsInput,
>(edge: Edge): EdgeConnectData<T> | undefined => {
    const connect = getEdgeConnect(edge)

    if (!connect) return

    const {sourceNode, sourcePortIndex, targetNode, targetPortIndex} = connect

    const sourceTable = sourceNode.getData().table as T | undefined
    if (!sourceTable) return
    const sourceColumn = sourceTable.columns[sourcePortIndex]
    if (!sourceColumn) return

    const targetTable = targetNode.getData().table as T | undefined
    if (!targetTable) return
    const targetColumn = targetTable.columns[targetPortIndex]
    if (!targetColumn) return

    return {
        ...connect,
        sourceTable,
        sourceColumn,
        targetTable,
        targetColumn
    }
}
