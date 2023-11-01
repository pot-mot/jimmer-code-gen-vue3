import mitt from 'mitt'

type ModelDialogEvents = {
    createTable: undefined,
    modifyTable: string
}

export const ModelDialogEventBus = mitt<ModelDialogEvents>()