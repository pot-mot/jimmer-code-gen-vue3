import {Graph} from "@antv/x6";
import {History} from "@antv/x6-plugin-history";
import {sendMessage} from "@/message/message.ts";

export const useHistory = (graph: Graph) => {
    graph.use(
        new History({
            enabled: true,
            beforeAddCommand: (event, args) => {
                if (event == "cell:change:*" && args && 'key' in args) {
                    // 取消记录所有变更 zIndex
                    if (args.key == 'zIndex') {
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

export const undo = (graph: Graph) => {
    if (graph.canUndo()) {
        graph.undo()
    } else {
        sendMessage('暂无可撤回的操作')
    }
}

export const redo = (graph: Graph) => {
    if (graph.canRedo()) {
        graph.redo()
    } else {
        sendMessage('暂无可重做的操作')
    }
}

export const handleHistoryKeyEvent = (graph: Graph) => {
    graph.bindKey(["ctrl+z", "command+z"], () => undo(graph))

    graph.bindKey(["ctrl+shift+z", "command+shift+z"], () => redo(graph))
}
