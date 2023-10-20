import mitt from 'mitt'

// 定义事件和事件对应的类型
type TableDialogEvents = {
    addTableDialog: number,
    removeTableDialog: number
}

export const TableDialogEventBus = mitt<TableDialogEvents>()

