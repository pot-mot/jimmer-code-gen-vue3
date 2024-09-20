import {ref, Ref} from "vue";
import {Graph} from "@antv/x6";
import {sendMessage} from "@/message/message.ts";
import {GraphReactiveState, useGraphReactiveState} from "../data/reactiveState.ts";
import {LoadHooks, useLoadHooks} from "@/utils/useLoadHooks.ts";

export interface GraphState {
    _graph: () => Graph,
    isLoaded: Readonly<Ref<boolean>>,
}

export interface GraphLoadOperation extends LoadHooks<Graph | undefined> {
    load: (_graph: Graph) => void
    unload: () => void
}

export const useGraph = (): {
    graphState: GraphState,
    graphReactiveState: GraphReactiveState,
    graphLoadOperation: GraphLoadOperation,
} => {
    const graph = ref<Graph>()

    const isLoaded = ref(false)

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

        isLoaded.value = true
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

        isLoaded.value = false
    }

    return {
        graphState: {
            _graph,
            isLoaded,
        },

        graphReactiveState: reactiveState,

        graphLoadOperation: {
            load,
            unload,

            ...loadHooks,
        }
    }
}
