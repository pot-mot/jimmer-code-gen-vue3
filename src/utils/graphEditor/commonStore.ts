import {computed, ref, Ref} from "vue";
import {Graph} from "@antv/x6";
import {sendMessage} from "../message.ts";
import {useSelectOperation} from "./selectOperation.ts";
import {useViewOperation} from "./viewOperation.ts";
import {useGraphReactiveState} from "./reactiveState.ts";

export const commonGraphStoreOperations = () => {
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

        /**
         * 加载 graph，初始化
         */
        const load = (_graph: Graph) => {
            graph.value = _graph
        }

        const unload = () => {
            if (graph.value) {
                graph.value = null
            }
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

        return {
            isLoaded,
            load,
            unload,
            _graph,

            removeAllCells,
            removeAllEdges,

            undo: () => _graph().undo(),
            redo: () => _graph().redo(),

            ...selectOperations,

            ...fitAndLayoutOperations,

            ...useGraphReactiveState(_graph)
        }
    })()
}