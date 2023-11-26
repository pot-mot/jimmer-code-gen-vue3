import {Graph} from "@antv/x6";
import {useGraphLocalStorage} from "./localStorage.ts";
import {onBeforeUnmount, onMounted, onUnmounted} from "vue";

export const useSaveKeyEvent = (callback: () => any) => {
    const handleKeyEvent = async (e: KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key == 's') {
                e.preventDefault()
                await callback()
            }
        }
    }

    onMounted(() => {
        document.documentElement.addEventListener('keydown', handleKeyEvent)
    })

    onBeforeUnmount(() => {
        document.documentElement.removeEventListener('keydown', handleKeyEvent)
    })
}

export const useSaveOperation = (_graph: () => Graph, name: string, otherSaveFns?: Array<{
    auto: boolean,
    fn: (graph: Graph, name: string) => any
}>) => {
    const localStorageOperation = useGraphLocalStorage(_graph, name)

    const {saveGraph} = localStorageOperation

    const handleSaveEditor = () => {
        const graph = _graph()
        if (!graph) return
        saveGraph()
    }

    const handleAutoSave = async () => {
        const graph = _graph()
        if (!graph) return
        saveGraph()

        if (!otherSaveFns) return

        for (let {fn, auto} of otherSaveFns) {
            if (auto) {
                await fn(graph, name)
            }
        }
    }

    const handleSaveAll = async () => {
        const graph = _graph()
        if (!graph) return
        saveGraph()

        if (!otherSaveFns) return

        for (let {fn} of otherSaveFns) {
            await fn(graph, name)
        }
    }

    const handleKeyEvent = async (e: KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key == 's') {
                e.preventDefault()
                await handleSaveAll()
            }
        }
    }

    onMounted(() => {
        document.documentElement.addEventListener('keydown', handleKeyEvent)

        window.addEventListener('popstate', handleAutoSave)
        window.addEventListener('unload', handleAutoSave)
    })

    onBeforeUnmount(() => {
        document.documentElement.removeEventListener('keydown', handleKeyEvent)
    })

    onUnmounted(() => {
        window.removeEventListener('unload', handleAutoSave)
        /** popstate 这个事件的卸载需要在卸载后略微延迟，使正在执行的 popstate 事件被触发 */
        setTimeout(() => {
            window.removeEventListener('popstate', handleAutoSave)
        }, 0)
    })

    return {
        handleSaveEditor,
        handleAutoSave,
        handleSaveAll,
        ...localStorageOperation
    }
}