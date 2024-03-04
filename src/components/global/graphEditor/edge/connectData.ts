import {Node, Edge} from "@antv/x6";
import {PortManager} from "@antv/x6/es/model/port";
import PortMetadata = PortManager.PortMetadata;

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
    if (!sourceNode) return
    const targetNode = edge.getTargetNode()
    if (!targetNode) return

    const sourcePortId = edge.getSourcePortId()
    const targetPortId = edge.getTargetPortId()

    const sourcePort = sourcePortId ? sourceNode.getPort(sourcePortId) : undefined
    const sourcePortIndex = sourceNode.ports.items.findIndex((value) => value.id === sourcePortId)

    const targetPort = targetPortId ? targetNode.getPort(targetPortId) : undefined
    const targetPortIndex = targetNode.ports.items.findIndex((value) => value.id === targetPortId)

    return {
        sourceNode,
        sourcePortId,
        sourcePortIndex: sourcePortIndex === -1 ? undefined : sourcePortIndex,
        sourcePort,
        targetNode,
        targetPortId,
        targetPortIndex: targetPortIndex === -1 ? undefined : targetPortIndex,
        targetPort
    }
}
