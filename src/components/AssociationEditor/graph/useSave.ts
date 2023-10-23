import {Graph} from "@antv/x6";
import {saveGraph} from "./localStorage";
import {onBeforeUnmount, onMounted, onUnmounted} from "vue";
import {saveAssociations} from "../edge/AssociationEdge.ts";

export const useSave = (_graph: () => Graph) => {
    const handleSave = async () => {
        const graph = _graph()

        if (!graph) return

        await saveAssociations(graph)
        saveGraph(graph)
    }

    const handleKeyEvent = (e: KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key == 's') {
                e.preventDefault()
                handleSave()
            }
        }
    }

    onMounted(() => {
        document.documentElement.addEventListener('keydown', handleKeyEvent)

        window.addEventListener('popstate', handleSave)
        window.addEventListener('unload', handleSave)
    })

    onBeforeUnmount(() => {
        document.documentElement.removeEventListener('keydown', handleKeyEvent)
    })

    /** 需要在卸载后略微延迟 */
    onUnmounted(() => {
        window.removeEventListener('unload', handleSave)
        setTimeout(() => {
            window.removeEventListener('popstate', handleSave)
        }, 0)
    })
}