import mitt from 'mitt'

type AssociationEditorEvents = {
    loadSchema: undefined,
    loadTable: undefined,

    deletedAssociations: {sourceColumnId: number, targetColumnId: number},
}

export const AssociationEditorEventBus = mitt<AssociationEditorEvents>()