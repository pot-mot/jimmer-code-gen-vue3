import {computed, ref} from "vue";
import {Edge, Graph, Node} from "@antv/x6";
import {getSelectedEdges, getSelectedNodes} from "@/components/business/graphEditor/selection/selectOperation.ts";
import {arrayToMap} from "@/utils/mapOperation.ts";
import {sendMessage} from "@/utils/message.ts";

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

    const loadReactiveState = async () => {
        const graph = _graph()

        if (!graph) return

        nodeMap.value = arrayToMap(graph.getNodes(), "id")
        edgeMap.value = arrayToMap(graph.getEdges(), "id")

        selectedNodeMap.value = arrayToMap(getSelectedNodes(graph), "id")
        selectedEdgeMap.value = arrayToMap(getSelectedEdges(graph), "id")

        await addReactiveEventListen()
    }

    const addReactiveEventListen = async () => {
        const graph = _graph()

        if (!graph) {
            sendMessage('graph 无法获取，响应式数据无法正常设置', 'error')
            return
        }

        graph.on('selection:changed', () => {
            isSelectionEmpty.value = graph.isSelectionEmpty()
        })

        // 全量更新
        // graph.on('node:selected', () => {
        //     selectedNodeMap.value = arrayToMap(getSelectedNodes(graph), "id")
        // })
        //
        // graph.on('node:unselected', () => {
        //     selectedNodeMap.value = arrayToMap(getSelectedNodes(graph), "id")
        // })
        //
        // graph.on('edge:selected', () => {
        //     selectedEdgeMap.value = arrayToMap(getSelectedEdges(graph), "id")
        // })
        //
        // graph.on('edge:unselected', () => {
        //     selectedEdgeMap.value = arrayToMap(getSelectedEdges(graph), "id")
        // })
        //
        // graph.on('node:added', () => {
        //     nodeMap.value = arrayToMap(graph.getNodes(), "id")
        // })
        //
        // graph.on('node:removed', () => {
        //     nodeMap.value = arrayToMap(graph.getNodes(), "id")
        // })
        //
        // graph.on('edge:added', () => {
        //     edgeMap.value = arrayToMap(graph.getEdges(), "id")
        // })
        //
        // graph.on('edge:removed', () => {
        //     edgeMap.value = arrayToMap(graph.getEdges(), "id")
        // })

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

        graph.on('history:redo', () => {
            canUndo.value = graph.canUndo()
            canRedo.value = graph.canRedo()
        })

        graph.on('history:undo', () => {
            canUndo.value = graph.canUndo()
            canRedo.value = graph.canRedo()
        })
    }

    return {
        loadReactiveState,

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
