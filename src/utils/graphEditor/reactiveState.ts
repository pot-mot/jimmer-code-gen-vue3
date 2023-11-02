import {computed, nextTick, onMounted, ref} from "vue";
import {Node, Edge, Graph} from "@antv/x6";
import {getSelectedEdges, getSelectedNodes} from "./selectOperation.ts";
import {arrayToMap} from "../mapOperation.ts";

export const useGraphReactiveState = (_graph: () => Graph) => {
    // 状态与响应式数据
    const canUndo = ref(false)
    const canRedo = ref(false)

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

    const selectedNodes = computed<Node[]>(() => {
        return [...selectedNodeMap.value.values()]
    })

    const selectedEdges = computed<Edge[]>(() => {
        return [...selectedEdgeMap.value.values()]
    })

    const selectedNodeIds = computed(() => {
        return [...nodeMap.value.keys()]
    })

    const selectedEdgeIds = computed(() => {
        return [...edgeMap.value.keys()]
    })

    onMounted(async () => {
        await nextTick()

        const graph = _graph()

        if (!graph) return

        nodeMap.value = arrayToMap(graph.getNodes(), "id")
        edgeMap.value = arrayToMap(graph.getEdges(), "id")

        selectedNodeMap.value = arrayToMap(getSelectedNodes(graph), "id")
        selectedEdgeMap.value = arrayToMap(getSelectedEdges(graph), "id")

        graph.on('selection:changed', () => {
            isSelectionEmpty.value = graph.isSelectionEmpty()
        })

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

        graph.on('history:redo', () => {
            canUndo.value = graph.canUndo()
            canRedo.value = graph.canRedo()
        })

        graph.on('history:undo', () => {
            canUndo.value = graph.canUndo()
            canRedo.value = graph.canRedo()
        })
    })

    return {
        nodeMap,
        nodes,
        nodeIds,

        edgeMap,
        edges,
        edgeIds,

        isSelectionEmpty,

        selectedNodeMap,
        selectedNodes,
        selectedNodeIds,

        selectedEdgeMap,
        selectedEdges,
        selectedEdgeIds,

        canUndo,
        canRedo,
    }
}