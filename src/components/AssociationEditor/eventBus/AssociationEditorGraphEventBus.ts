import mitt from 'mitt'

type AssociationEditorGraphEvents = {
    loadSchema: undefined,
    loadTable: undefined,

    deletedAssociations: {sourceColumnId: number, targetColumnId: number},
}

export const AssociationEditorGraphEventBus = mitt<AssociationEditorGraphEvents>()