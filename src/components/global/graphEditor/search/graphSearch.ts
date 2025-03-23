import {Edge, Graph} from "@antv/x6";
import {SelectType} from "@/api/__generated/model/enums";

export const searchEdgesByNode = (
    graph: Graph,
    opt: {
        sourceNodeId?: string,
        targetNodeId?: string,
        selectType?: SelectType
    }
): Edge[] => {
    return graph.getEdges()
        .filter(edge => {
            let sourceFlag = true
            let targetFlag = true

            if (opt.sourceNodeId) {
                sourceFlag = edge.getSourceNode()?.id === opt.sourceNodeId
            }
            if (opt.targetNodeId) {
                targetFlag = edge.getTargetNode()?.id === opt.targetNodeId
            }

            if (!opt.selectType || opt.selectType === 'AND') {
                return targetFlag && sourceFlag
            } else {
                return targetFlag || sourceFlag
            }
        })
}