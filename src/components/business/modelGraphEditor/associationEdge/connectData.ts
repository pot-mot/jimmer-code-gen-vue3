import {Node, Edge} from "@antv/x6";
import {GenTableColumnsInput, GenTableColumnsView} from "@/api/__generated/model/static";
import {PortManager} from "@antv/x6/es/model/port";
import PortMetadata = PortManager.PortMetadata;
import {TABLE_NODE} from "@/components/business/modelGraphEditor/constant.ts";

export interface EdgeConnect {
    sourceNode: Node,

    sourcePortId?: string,
    sourcePort?: PortMetadata,
    sourcePortIndex: number | undefined,

    targetNode: Node,

    targetPortId?: string,
    targetPort?: PortMetadata,
    targetPortIndex: number | undefined,
}

export const getEdgeConnect = (edge: Edge): EdgeConnect | undefined => {
    const sourceNode = edge.getSourceNode()
    if (!sourceNode || sourceNode.shape != TABLE_NODE) return
    const targetNode = edge.getTargetNode()
    if (!targetNode || targetNode.shape != TABLE_NODE) return

    const sourcePortId = edge.getSourcePortId()
    const targetPortId = edge.getTargetPortId()

    const sourcePort = sourcePortId ? sourceNode.getPort(sourcePortId) : undefined
    const sourcePortIndex = sourceNode.ports.items.findIndex((value) => value.id == sourcePortId)

    const targetPort = targetPortId ? targetNode.getPort(targetPortId) : undefined
    const targetPortIndex = targetNode.ports.items.findIndex((value) => value.id == targetPortId)

    return {
        sourceNode,
        sourcePortId,
        sourcePortIndex: sourcePortIndex == -1 ? undefined : sourcePortIndex,
        sourcePort,
        targetNode,
        targetPortId,
        targetPortIndex: targetPortIndex == -1 ? undefined : targetPortIndex,
        targetPort
    }
}

export interface EdgeConnectData<
    T extends GenTableColumnsInput | GenTableColumnsView = GenTableColumnsInput,
> extends EdgeConnect {
    sourceTable: T,
    sourceColumn?: T['columns'][number],
    targetTable: T,
    targetColumn?: T['columns'][number],
}

export const getEdgeConnectData = <
    T extends GenTableColumnsInput | GenTableColumnsView = GenTableColumnsInput,
>(edge: Edge): EdgeConnectData<T> | undefined => {
    const connect = getEdgeConnect(edge)

    if (!connect) return

    const {sourceNode, sourcePortIndex, targetNode, targetPortIndex} = connect

    const sourceTable = sourceNode.getData().table as T | undefined
    if (!sourceTable) return
    const sourceColumn = sourcePortIndex != undefined ? sourceTable.columns[sourcePortIndex] : undefined

    const targetTable = targetNode.getData().table as T | undefined
    if (!targetTable) return
    const targetColumn = targetPortIndex != undefined ? targetTable.columns[targetPortIndex] : undefined

    return {
        ...connect,
        sourceTable,
        sourceColumn,
        targetTable,
        targetColumn
    }
}
