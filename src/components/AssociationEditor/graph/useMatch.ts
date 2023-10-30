import {Graph} from "@antv/x6";
import {onMounted, ref, Ref} from "vue";
import {AssociationMatchType} from "../../../api/__generated/model/enums";
import {api} from "../../../api";
import {nodeIdToTableId} from "../node/TableNode.ts";
import {importAssociationEdges} from "../edge/AssociationEdge.ts";
import {getSelectedNodes} from "./useSelection.ts";

export const useTableEditorMatch = (_graph: () => Graph) => {
    const matchTypes: Ref<ReadonlyArray<AssociationMatchType>> = ref([])

    const matchType: Ref<AssociationMatchType> = ref('SIMPLE_PK')

    onMounted(() => {
        api.associationService.listMatchType().then(res => {
            matchTypes.value = res
            matchType.value = res[0]
        })
    })

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
        matchTypes,
        matchType,
        handleMatch
    }
}