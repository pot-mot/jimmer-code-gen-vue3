import {computed, ComputedRef, ref, Ref} from "vue";
import {Graph} from "@antv/x6";
import {sendMessage} from "@/message/message.ts";
import {SelectOperation, useSelectOperation} from "@/components/global/graphEditor/selection/selectOperation.ts";
import {useViewOperation, ViewOperation} from "@/components/global/graphEditor/view/viewOperation.ts";
import {GraphReactiveState, useGraphReactiveState} from "./data/reactiveState.ts";
import {GraphDataOperation, useGraphDataOperation} from "@/components/global/graphEditor/data/graphData.ts";
import {LoadHooks, useLoadHooks} from "@/utils/useLoadHooks.ts";
import {HistoryOperations, useHistoryOperations} from "@/components/global/graphEditor/history/useHistory.ts";

export interface CommonGraphOperations extends GraphReactiveState,
    LoadHooks<Graph | undefined>,
    SelectOperation,
    ViewOperation,
    GraphDataOperation,
    HistoryOperations
{
    isLoaded: ComputedRef<boolean>
    _graph: () => Graph
    load: (_graph: Graph) => void
    unload: () => void

    removeAllCells: () => void
    removeAllEdges: () => void
}

export const useCommonGraphOperations = (): CommonGraphOperations => {
    const graph: Ref<Graph | undefined> = ref()

    /**
     * 获取 graph
     */
    const _graph = (): Graph => {
        if (!graph.value) {
            sendMessage("Graph 未初始化", "error")
            throw new Error("graph is not init")
        }
        return graph.value
    }

    const reactiveState = useGraphReactiveState(_graph)

    // 生命周期钩子
    const loadHooks = useLoadHooks(() => graph.value)

    /**
     * 初始化加载函数
     */
    const load = async (_graph: Graph) => {
        loadHooks.beforeLoad()

        graph.value = _graph
        await reactiveState.loadReactiveState()

        loadHooks.loaded()
    }

    /**
     * 卸载函数
     */
    const unload = async () => {
        if (!graph.value) {
            sendMessage('图在 unload 前已经不存在', 'error')
        }

        loadHooks.beforeUnload()

        reactiveState.clearReactiveState()
        graph.value = undefined

        loadHooks.unloaded()
    }

    const isLoaded = computed(() => {
        return !!graph.value
    })

    const selectOperations = useSelectOperation(_graph)

    const fitAndLayoutOperations = useViewOperation(_graph)

    const removeAllCells = () => {
        const graph = _graph()

        const cells = graph.getCells()
        graph.unselect(cells)
        graph.removeCells(cells)
    }

    const removeAllEdges = () => {
        const graph = _graph()

        const edges = graph.getEdges()
        graph.unselect(edges)
        graph.removeCells(edges)
    }

    const graphDataOperation = useGraphDataOperation(_graph)

    const historyOperations = useHistoryOperations(_graph)

    return {
        _graph,

        isLoaded,
        load,
        unload,

        ...loadHooks,

        ...selectOperations,

        ...fitAndLayoutOperations,

        ...reactiveState,

        ...graphDataOperation,

        ...historyOperations,

        removeAllCells,
        removeAllEdges,
    }
}
