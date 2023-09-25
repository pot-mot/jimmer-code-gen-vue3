import {Graph} from "@antv/x6";
import {History} from "@antv/x6-plugin-history";
import {onBeforeUnmount, onMounted} from "vue";

export const useHistory = (graph: Graph) => {
    graph.use(
        new History({
            enabled: true,
            beforeAddCommand: (event, args) => {
                if (event == "cell:change:*" && args && 'key' in args) {
                    if (args.key == 'zIndex') {
                        return false
                    } else if (args.key == 'target') {
                        return false
                    } else if (args.key == 'attrs') {
                        return false
                    }
                }

                return true
            }
        })
    )

    graph.on('node:move', () => {
        graph.startBatch('node move')
    })

    graph.on('node:moved', () => {
        graph.stopBatch('node move')
    })
}

export const useHistoryKeyEvent = (_graph: () => Graph) => {
    const handleKeyEvent = (e: KeyboardEvent) => {
        const graph = _graph()

        if (!graph) return

        if (e.ctrlKey || e.metaKey) {
            if (e.key == 'z') {
                e.preventDefault()
                graph.undo()
            } else if (e.key == 'Z') {
                e.preventDefault()
                graph.redo()
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