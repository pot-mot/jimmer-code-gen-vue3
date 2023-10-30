import {nextTick, onMounted, ref} from "vue";
import {Node, Edge, Graph} from "@antv/x6";
import {getSelectedEdges, getSelectedNodes} from "./selection/selectOperation.ts";

export const useGraphReactiveState = (_graph: () => Graph) => {
    // 状态与响应式数据
    const canUndo = ref(false)
    const canRedo = ref(false)

    const isSelectionEmpty = ref(true)
    const selectedNodes = ref(<Node[]>[])
    const selectedEdges = ref(<Edge[]>[])

    onMounted(() => {
        nextTick(() => {
            const graph = _graph()

            if (!graph) return

            graph.on('selection:changed', () => {
                isSelectionEmpty.value = graph.isSelectionEmpty()
                selectedNodes.value = getSelectedNodes(graph)
                selectedEdges.value = getSelectedEdges(graph)
            })

            graph.on('history:change', () => {
                canUndo.value = graph.canUndo()
                canRedo.value = graph.canRedo()
            })

            graph.on('history:redo', () => {
                canUndo.value = graph.canUndo()
                canRedo.value = graph.canRedo()
            })

            graph.on('history:undo', () => {
                canUndo.value = graph.canUndo()
                canRedo.value = graph.canRedo()
            })
        })
    })

    return {
        isSelectionEmpty,
        selectedNodes,
        selectedEdges,
        canUndo,
        canRedo,
    }
}