import mitt from 'mitt'

type AssociationEditorGraphEvents = {
    loadSchema: undefined,
    loadTable: undefined,

    deleteAssociations: {sourceColumnId: number, targetColumnId: number},
    deletedAssociations: {sourceColumnId: number, targetColumnId: number},
}

export const AssociationEditorGraphEventBus = mitt<AssociationEditorGraphEvents>()