import {Graph} from "@antv/x6";
import {sendI18nMessage} from "@/message/message.ts";
import {Ref, ref} from "vue";
import {CustomHistory} from "@/components/global/graphEditor/history/CustomHistory.ts";

export const useHistory = <CommandMap extends {execute: {value: string}}> (graph: Graph): CustomHistory<CommandMap> => {
    const customHistory = new CustomHistory<CommandMap>({
        enabled: true,
        beforeAddCommand(event, args) {
            if (event === "cell:change:*" && args && 'key' in args) {
                // 取消记录所有变更 zIndex
                if (args.key === 'zIndex') {
                    return false
                }
            }

            return true
        }
    })

    graph.use(customHistory)

    // 默认合并移动事件
    graph.on('node:move', () => {
        graph.startBatch('node move')
    })

    graph.on('node:moved', () => {
        graph.stopBatch('node move')
    })

    customHistory.registerCommand("execute", {
        applyAction: (options) => {
            console.log(options.value)
        },
        revertAction: (options) => {
            console.log(options.value, "rollback")
        }
    })

    setTimeout(() => {
        customHistory.pushCommand("execute", {value: "world"})
    }, 1000)

    return customHistory
}

export interface GraphHistoryOperation {
    isUndo: Ref<Boolean>,
    isRedo: Ref<Boolean>,
    undo: () => void
    redo: () => void
}

export const useHistoryOperations = (_graph: () => Graph): GraphHistoryOperation => {
    const isRedo = ref(false)

    const isUndo = ref(false)

    return {
        isRedo,
        isUndo,
        undo: () => {
            const graph = _graph()
            if (graph.canUndo()) {
                isUndo.value = true
                graph.undo()
                setTimeout(() => {
                    isUndo.value = false
                }, 0)
            } else {
                sendI18nMessage("MESSAGE_ModelEditorGraph_history_cannotUndo")
            }
        },
        redo: () => {
            const graph = _graph()
            if (graph.canRedo()) {
                isRedo.value = true
                graph.redo()
                setTimeout(() => {
                    isRedo.value = false
                }, 0)
            } else {
                sendI18nMessage("MESSAGE_ModelEditorGraph_history_cannotRedo")
            }
        },
    }
}
