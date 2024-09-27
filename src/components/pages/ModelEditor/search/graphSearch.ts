import {Edge, Graph} from "@antv/x6";
import {SelectType} from "@/api/__generated/model/enums";
import {matchByKeywords} from "@/components/global/match/matchByKeywords.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";

export const searchNodesByKeywords = (graph: Graph, keywords: string[]) => {
    return graph.getNodes()
        .filter(node => node.shape === TABLE_NODE)
        .filter(node => {
            const table = node.getData().table
            if (table && Object.keys(table).includes('name') && Object.keys(table).includes('comment')) {
                return matchByKeywords(node.getData().table, keywords)
            }
            return false
        })
}

export const searchNodesByTableName = (graph: Graph, tableName: string) => {
    return graph.getNodes()
        .filter(node => node.shape === TABLE_NODE)
        .filter(node => {
            const table = node.getData().table
            if (table && Object.keys(table).includes('name') && Object.keys(table).includes('comment')) {
                return matchByKeywords(node.getData().table, [tableName], ['name'])
            }
            return false
        })
}

export const searchEdgesByNode = (
    graph: Graph,
    opt: {
        sourceNodeId?: string,
        targetNodeId?: string,
        selectType?: SelectType
    }
): Edge[] => {
    return graph.getEdges()
        .filter(edge => edge.shape === ASSOCIATION_EDGE)
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
