import {computed, ref} from "vue";
import {Edge, Graph, Node} from "@antv/x6";
import {getSelectedEdges, getSelectedNodes} from "@/components/global/graphEditor/selection/selectOperation.ts";
import {arrayToMap} from "@/utils/mapOperation.ts";
import {sendMessage} from "@/message/message.ts";

export const useGraphReactiveState = (_graph: () => Graph) => {
    const nodeMap = ref<Map<string, Node>>(new Map)
    const edgeMap = ref<Map<string, Edge>>(new Map)

    const nodes = computed<Node[]>(() => {
        return [...nodeMap.value.values()]
    })

    const edges = computed<Edge[]>(() => {
        return [...edgeMap.value.values()]
    })

    const nodeIds = computed(() => {
        return [...nodeMap.value.keys()]
    })

    const edgeIds = computed(() => {
        return [...edgeMap.value.keys()]
    })

    const isSelectionEmpty = ref(true)
    const selectedNodeMap = ref<Map<string, Node>>(new Map)
    const selectedEdgeMap = ref<Map<string, Edge>>(new Map)

    const canUndo = ref(false)

    const canRedo = ref(false)

    // 判断鼠标是否在 graph 范围内
    const mouseenterState = ref(false)

    const loadReactiveState = async () => {
        const graph = _graph()

        if (!graph) return

        nodeMap.value = arrayToMap(graph.getNodes(), "id")
        edgeMap.value = arrayToMap(graph.getEdges(), "id")

        selectedNodeMap.value = arrayToMap(getSelectedNodes(graph), "id")
        selectedEdgeMap.value = arrayToMap(getSelectedEdges(graph), "id")

        await addReactiveEventListen()
    }

    const clearReactiveState = () => {
        nodeMap.value.clear()
        edgeMap.value.clear()
        isSelectionEmpty.value = true
        selectedNodeMap.value.clear()
        selectedEdgeMap.value.clear()
        mouseenterState.value = false
        canRedo.value = false
        canUndo.value = false
    }

    const addReactiveEventListen = async () => {
        const graph = _graph()

        if (!graph) {
            sendMessage('graph 获取失败，响应式数据无法正常设置', 'error')
            return
        }

        graph.on('graph:mouseenter', () => {
            mouseenterState.value = true
        })
        graph.on('graph:mouseleave', () => {
            mouseenterState.value = false
        })

        graph.on('selection:changed', () => {
            isSelectionEmpty.value = graph.isSelectionEmpty()
        })

        // 差量更新
        graph.on('node:selected', ({node}) => {
            selectedNodeMap.value.set(node.id, node)
        })

        graph.on('node:unselected', ({node}) => {
            selectedNodeMap.value.delete(node.id)
        })

        graph.on('edge:selected', ({edge}) => {
            selectedEdgeMap.value.set(edge.id, edge)
        })

        graph.on('edge:unselected', ({edge}) => {
            selectedEdgeMap.value.delete(edge.id)
        })

        graph.on('node:added', ({node}) => {
            nodeMap.value.set(node.id, node)
        })

        graph.on('node:removed', ({node}) => {
            nodeMap.value.delete(node.id)
        })

        graph.on('edge:added', ({edge}) => {
            edgeMap.value.set(edge.id, edge)
        })

        graph.on('edge:removed', ({edge}) => {
            edgeMap.value.delete(edge.id)
        })

        graph.on('history:change', () => {
            canUndo.value = graph.canUndo()
            canRedo.value = graph.canRedo()
        })
    }

    return {
        loadReactiveState,
        clearReactiveState,

        mouseenterState,

        nodeMap,
        nodes,
        nodeIds,

        edgeMap,
        edges,
        edgeIds,

        isSelectionEmpty,

        selectedNodeMap,
        selectedEdgeMap,

        canUndo,
        canRedo,
    }
}
