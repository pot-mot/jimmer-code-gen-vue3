import {computed, ref, Ref} from "vue";
import {Graph} from "@antv/x6";
import {sendMessage} from "@/message/message.ts";
import {useSelectOperation} from "@/components/global/graphEditor/selection/selectOperation.ts";
import {useViewOperation} from "@/components/global/graphEditor/common/viewOperation.ts";
import {useGraphReactiveState} from "./common/reactiveState.ts";
import {useGraphDataOperation} from "@/components/global/graphEditor/common/graphData.ts";
import {useLoadHooks} from "@/utils/useLoadHooks.ts";

export const useCommonGraphOperations = () => {
    const graph: Ref<Graph | undefined | null> = ref()

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
        graph.value = null

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

    return {
        isLoaded,
        load,
        unload,
        _graph,

        ...loadHooks,

        removeAllCells,
        removeAllEdges,

        ...selectOperations,

        ...fitAndLayoutOperations,

        ...reactiveState,

        ...graphDataOperation
    }
}
