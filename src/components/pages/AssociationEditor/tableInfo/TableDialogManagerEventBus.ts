import mitt from 'mitt'

// 定义事件和事件对应的类型
type TableDialogManagerEvents = {
    openTable: number,
    closeTable: number
}

export const TableDialogManagerEventBus = mitt<TableDialogManagerEvents>()

