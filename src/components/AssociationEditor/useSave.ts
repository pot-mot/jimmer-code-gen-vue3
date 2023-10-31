import {Graph} from "@antv/x6";
import {useLocalStorageOperation} from "./store/localStorage.ts";
import {onBeforeUnmount, onMounted, onUnmounted} from "vue";
import {saveAssociations} from "./api.ts";

export const useSave = (_graph: () => Graph, name: string = "AssociationEditorGraph") => {
    const localStorageOperation = useLocalStorageOperation(_graph, name)

    const handleSave = async () => {
        const graph = _graph()

        if (!graph) return

        localStorageOperation.saveGraph()
        await saveAssociations(graph)
    }

    const handleKeyEvent = async (e: KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key == 's') {
                e.preventDefault()
                await handleSave()
            }
        }
    }

    const handleSaveEditor = () => {
        const graph = _graph()

        if (!graph) return

        localStorageOperation.saveGraph()
    }

    const handleSaveAssociation = async () => {
        const graph = _graph()

        if (!graph) return

        await saveAssociations(graph)
    }

    onMounted(() => {
        document.documentElement.addEventListener('keydown', handleKeyEvent)

        window.addEventListener('popstate', handleSaveEditor)
        window.addEventListener('unload', handleSaveEditor)
    })

    onBeforeUnmount(() => {
        document.documentElement.removeEventListener('keydown', handleKeyEvent)
    })

    onUnmounted(() => {
        window.removeEventListener('unload', handleSaveEditor)
        /** popstate 这个事件的卸载需要在卸载后略微延迟，使正在执行的 popstate 事件被触发 */
        setTimeout(() => {
            window.removeEventListener('popstate', handleSaveEditor)
        }, 0)
    })

    return {
        handleSave,
        handleSaveEditor,
        handleSaveAssociation,

        ...localStorageOperation
    }
}