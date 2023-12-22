import {computed, ref, Ref} from "vue";
import {Graph} from "@antv/x6";
import {sendMessage} from "@/utils/message.ts";
import {useSelectOperation} from "@/components/business/graphEditor/selection/selectOperation.ts";
import {useViewOperation} from "@/components/business/graphEditor/common/viewOperation.ts";
import {useGraphReactiveState} from "./common/reactiveState.ts";
import {useGraphDataOperation} from "@/components/business/graphEditor/storage/graphData.ts";

export const useCommonGraphOperations = () => {
    return (() => {
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

        const beforeLoadFns = ref<(() => any)[]>([])

        const onBeforeLoad = (callback: (() => any)) => {
            beforeLoadFns.value.push(callback)
        }

        const loadedFns = ref<((props: { graph: Graph }) => any)[]>([])

        const onLoaded = (callback: (props: { graph: Graph }) => any) => {
            loadedFns.value.push(callback)
        }

        const beforeUnloadFns = ref<((props: { graph: Graph }) => any)[]>([])

        const onBeforeUnload = (callback: ((props: { graph: Graph }) => any)) => {
            beforeUnloadFns.value.push(callback)
        }

        const unloadedFns = ref<(() => any)[]>([])

        const onUnloaded = (callback: (() => any)) => {
            unloadedFns.value.push(callback)
        }

        /**
         * 初始化加载函数
         */
        const load = async (_graph: Graph) => {
            beforeLoadFns.value.forEach(cb => {
                cb()
            })

            graph.value = _graph
            await reactiveState.loadReactiveState()

            loadedFns.value.forEach(cb => {
                cb({graph: _graph})
            })
        }

        /**
         * 卸载函数
         */
        const unload = () => {
            if (!graph.value) {
                sendMessage('图未加载，无法卸载', 'error')
                return
            }

            beforeUnloadFns.value.forEach(cb => {
                cb({graph: graph.value!})
            })

            graph.value = null

            unloadedFns.value.forEach(cb => {
                cb()
            })
        }

        // 判断鼠标是否在 graph 范围内
        const mouseenterState = ref(false)

        const handleMouseenter = () => {
            mouseenterState.value = true
        }

        const handleMouseleave = () => {
            mouseenterState.value = false
        }

        onLoaded(({graph}) => {
            graph.container.addEventListener('mouseenter', handleMouseenter)

            graph.container.addEventListener('mouseleave', handleMouseleave)
        })

        onBeforeUnload(({graph}) => {
            graph.container.removeEventListener('mouseenter', handleMouseenter)

            graph.container.removeEventListener('mouseleave', handleMouseleave)
        })

        onUnloaded(() => {
            mouseenterState.value = false
        })

        /**
         * 添加事件绑定
         * !! 只能在初始化前 (beforeLoad) 进行设置
         */
        const addEventListener = <K extends keyof HTMLElementEventMap>(
            eventType: K,
            callback: (graph: Graph, e: HTMLElementEventMap[K]) => any,
            opt?: {
                global: boolean
            }
        ) => {
            const callbackWrapper = (e: HTMLElementEventMap[K]) => {
                const graph = _graph()

                if (!graph) {
                    sendMessage('图不存在，无法执行事件', 'error')
                }

                if (opt?.global) {
                    callback(graph, e)
                } else if (mouseenterState.value) {
                    callback(graph, e)
                }
            }

            onLoaded(() => {
                document.documentElement.addEventListener(eventType, callbackWrapper)
            })

            onBeforeUnload(() => {
                document.documentElement.removeEventListener(eventType, callbackWrapper)
            })
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

            onBeforeLoad,
            onLoaded,
            onBeforeUnload,
            onUnloaded,

            addEventListener,

            removeAllCells,
            removeAllEdges,

            undo: () => _graph().undo(),
            redo: () => _graph().redo(),

            ...selectOperations,

            ...fitAndLayoutOperations,

            ...reactiveState,

            ...graphDataOperation
        }
    })()
}
