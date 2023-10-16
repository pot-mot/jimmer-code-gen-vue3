import mitt, { Emitter } from 'mitt'

// 定义事件和事件对应的类型
type MittEvent = {
    addTableDialog: number,
    removeTableDialog: number
}

export const TableDialogEventEmitter: Emitter<MittEvent> = mitt<MittEvent>()

