import {Graph} from "@antv/x6";
import {useLocalStorageSave} from "./localStorage.ts";
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

export const useAutoSave = (_graph: () => Graph, name: string) => {
    const localStorageOperation = useLocalStorageSave(_graph, name)

    const handleAutoSave = () => {
        const graph = _graph()

        if (!graph) return

        localStorageOperation.saveGraph()
    }

    onMounted(() => {
        window.addEventListener('popstate', handleAutoSave)
        window.addEventListener('unload', handleAutoSave)
    })

    onUnmounted(() => {
        window.removeEventListener('unload', handleAutoSave)
        /** popstate 这个事件的卸载需要在卸载后略微延迟，使正在执行的 popstate 事件被触发 */
        setTimeout(() => {
            window.removeEventListener('popstate', handleAutoSave)
        }, 0)
    })

    return {
        ...localStorageOperation
    }
}

export const useSave = (_graph: () => Graph, name: string, otherSaveFns?: Array<{
    auto: boolean,
    fn: (graph: Graph, name: string) => any
}>) => {
    const localStorageOperation = useLocalStorageSave(_graph, name)

    const handleSaveEditor = () => {
        const graph = _graph()

        if (!graph) return

        localStorageOperation.saveGraph()
    }

    const handleAutoSave = async () => {
        const graph = _graph()

        if (!graph) return

        localStorageOperation.saveGraph()

        otherSaveFns?.forEach(({auto, fn}) => {
            if (auto) {
                fn(graph, name)
            }
        })
    }

    const handleSaveAll = async () => {
        const graph = _graph()

        if (!graph) return

        localStorageOperation.saveGraph()

        otherSaveFns?.forEach(({fn}) => {
            fn(graph, name)
        })
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