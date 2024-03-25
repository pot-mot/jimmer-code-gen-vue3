import {computed, ComputedRef, ref, Ref} from "vue";
import {Graph} from "@antv/x6";
import {sendMessage} from "@/message/message.ts";
import {GraphReactiveState, useGraphReactiveState} from "../data/reactiveState.ts";
import {LoadHooks, useLoadHooks} from "@/utils/useLoadHooks.ts";

export interface GraphLoadState extends GraphReactiveState,
    LoadHooks<Graph | undefined>
{
    isLoaded: ComputedRef<boolean>
    _graph: () => Graph
    load: (_graph: Graph) => void
    unload: () => void
}

export const useGraphLoadState = (): GraphLoadState => {
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

    return {
        _graph,

        isLoaded,
        load,
        unload,

        ...loadHooks,

        ...reactiveState,
    }
}
