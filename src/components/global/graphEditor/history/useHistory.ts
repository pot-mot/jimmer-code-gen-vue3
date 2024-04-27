import {Graph} from "@antv/x6";
import {History} from "@antv/x6-plugin-history";
import {sendMessage} from "@/message/message.ts";
import {Ref, ref} from "vue";

export const useHistory = (graph: Graph) => {
    graph.use(
        new History({
            enabled: true,
            beforeAddCommand: (event, args) => {
                if (event === "cell:change:*" && args && 'key' in args) {
                    // 取消记录所有变更 zIndex
                    if (args.key === 'zIndex') {
                        return false
                    }
                }

                return true
            }
        })
    )

    // 默认合并移动事件
    graph.on('node:move', () => {
        graph.startBatch('node move')
    })

    graph.on('node:moved', () => {
        graph.stopBatch('node move')
    })
}

export interface HistoryOperation {
    isUndo: Ref<Boolean>,
    isRedo: Ref<Boolean>,
    undo: () => void
    redo: () => void
}

export const useHistoryOperations = (_graph: () => Graph): HistoryOperation => {
    const isRedo = ref(false)

    const isUndo = ref(false)

    return {
        isRedo,
        isUndo,
        redo: () => {
            const graph = _graph()
            if (graph.canRedo()) {
                isRedo.value = true
                graph.redo()
                setTimeout(() => {
                    isRedo.value = false
                }, 0)
            } else {
                sendMessage('暂无可重做的操作')
            }
        },
        undo: () => {
            const graph = _graph()
            if (graph.canUndo()) {
                isUndo.value = true
                graph.undo()
                setTimeout(() => {
                    isUndo.value = false
                }, 0)
            } else {
                sendMessage('暂无可撤回的操作')
            }
        }
    }
}
