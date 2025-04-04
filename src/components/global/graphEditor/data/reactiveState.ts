import {computed, ComputedRef, Ref, ref} from "vue";
import {Edge, Graph, Node} from "@antv/x6";
import {getSelectedEdges, getSelectedNodes} from "@/components/global/graphEditor/selection/selectOperation.ts";
import {arrayToMap} from "@/utils/mapOperation.ts";
import {sendMessage} from "@/message/message.ts";
import {getCenterPoint} from "@/components/global/graphEditor/view/viewOperation.ts";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import debounce from "lodash/debounce";

export interface GraphReactiveState {
    loadReactiveState: () => any
    clearReactiveState: () => any

    nodeMap: Ref<Map<string, UnwrapRefSimple<Node>>>
    edgeMap: Ref<Map<string, UnwrapRefSimple<Edge>>>
    nodes: ComputedRef<UnwrapRefSimple<Node>[]>
    nodeIds: ComputedRef<string[]>
    edges: ComputedRef<UnwrapRefSimple<Edge>[]>
    edgeIds: ComputedRef<string[]>

    isSelectionEmpty: Ref<boolean>
    selectedNodeMap: Ref<Map<string, UnwrapRefSimple<Node>>>
    selectedEdgeMap: Ref<Map<string, UnwrapRefSimple<Edge>>>

    canUndo: Ref<boolean>
    canRedo: Ref<boolean>

    mouseenterState: Ref<boolean>
    mousePagePosition: Ref<{ x: number, y: number }>
    mousePosition: Ref<{ x: number, y: number }>
}

export const useGraphReactiveState = (_graph: () => Graph): GraphReactiveState => {
    const nodeMap = ref<Map<string, Node>>(new Map)
    const edgeMap = ref<Map<string, Edge>>(new Map)

    const nodes = computed(() => {
        return [...nodeMap.value.values()]
    })

    const edges = computed(() => {
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

    // 鼠标的 position
    const mousePagePosition = ref({x: 0, y: 0})
    const mousePosition = ref({x: 0, y: 0})
    const setMousePosition = debounce((e: MouseEvent) => {
        const graph = _graph()

        const pagePosition = {
            x: e.pageX,
            y: e.pageY
        }
        mousePagePosition.value = pagePosition
        mousePosition.value = graph.pageToLocal(pagePosition)
    }, 50)

    const loadReactiveState = async () => {
        const graph = _graph()

        nodeMap.value = arrayToMap(graph.getNodes(), "id")
        edgeMap.value = arrayToMap(graph.getEdges(), "id")

        selectedNodeMap.value = arrayToMap(getSelectedNodes(graph), "id")
        selectedEdgeMap.value = arrayToMap(getSelectedEdges(graph), "id")

        mousePosition.value = getCenterPoint(graph)

        await addReactiveEventListener()
    }

    const addReactiveEventListener = async () => {
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

        graph.container.addEventListener('mousemove', setMousePosition, {passive: true})

        graph.on('selection:changed', () => {
            isSelectionEmpty.value = graph.isSelectionEmpty()
        })

        // 响应式更新
        graph.on('node:added', ({node}) => {
            nodeMap.value.set(node.id, node)
        })

        graph.on('node:removed', ({node}) => {
            nodeMap.value.delete(node.id)
        })

        graph.on('node:selected', ({node}) => {
            selectedNodeMap.value.set(node.id, node)
        })

        graph.on('node:unselected', ({node}) => {
            selectedNodeMap.value.delete(node.id)
        })

        graph.on('edge:added', ({edge}) => {
            edgeMap.value.set(edge.id, edge)
        })

        graph.on('edge:removed', ({edge}) => {
            edgeMap.value.delete(edge.id)
        })

        graph.on('edge:selected', ({edge}) => {
            selectedEdgeMap.value.set(edge.id, edge)
        })

        graph.on('edge:unselected', ({edge}) => {
            selectedEdgeMap.value.delete(edge.id)
        })

        graph.on('history:change', () => {
            canUndo.value = graph.canUndo()
            canRedo.value = graph.canRedo()
        })
    }

    const clearReactiveState = () => {
        nodeMap.value.clear()
        edgeMap.value.clear()
        isSelectionEmpty.value = true
        selectedNodeMap.value.clear()
        selectedEdgeMap.value.clear()
        mouseenterState.value = false
        _graph().container.removeEventListener('mousemove', setMousePosition)
        canRedo.value = false
        canUndo.value = false
    }

    return {
        loadReactiveState,
        clearReactiveState,

        mouseenterState,
        mousePagePosition,
        mousePosition,

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
