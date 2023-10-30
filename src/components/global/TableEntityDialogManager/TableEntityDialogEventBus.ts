import mitt from 'mitt'

// 定义事件和事件对应的类型
type TableEntityDialogEvents = {
    addTableEntityDialog: number,
    removeTableEntityDialog: number
}

export const TableEntityDialogEventBus = mitt<TableEntityDialogEvents>()

