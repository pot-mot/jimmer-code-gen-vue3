import mitt from 'mitt'

type AssociationEditorMenuEvents = {
    loadDateSource: {},
    editDataSource: {id: number},
    deleteDataSource: {id: number},

    loadSchema: {id: number},
    deleteSchema: {id: number},
}

export const AssociationEditorMenuEventBus = mitt<AssociationEditorMenuEvents>()