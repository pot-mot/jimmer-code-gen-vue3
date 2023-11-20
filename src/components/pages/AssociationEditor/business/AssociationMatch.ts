import {Graph} from "@antv/x6";
import {ref, Ref} from "vue";
import {AssociationMatchType} from "@/api/__generated/model/enums";
import {getSelectedNodes} from "@/components/global/graphEditor/operations/selectOperation.ts";
import {api} from "@/api";
import {nodeIdToTableId} from "../graph/node/TableNode.ts";
import {importAssociationEdges} from "./graphOperation.ts";

export const useAssociationMatch = (_graph: () => Graph) => {
    const matchType: Ref<AssociationMatchType> = ref('SIMPLE_PK')

    /** 匹配关联 */
    const handleMatch = async () => {
        const graph = _graph()

        if (!graph) return

        let nodes = getSelectedNodes(graph)

        if (nodes.length == 0) {
            nodes = graph.getNodes()
        }

        const res = await api.associationService.match({
            body: nodes.map(node => nodeIdToTableId(node.id)),
            matchType: matchType.value
        })

        importAssociationEdges(graph, res)
    }

    return {
        matchType,
        handleMatch
    }
}