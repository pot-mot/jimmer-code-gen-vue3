import mitt from 'mitt'

type AssociationEditorGraphEvents = {
    redo: undefined,
    undo: undefined,

    selectAll: undefined,
    removeAllCells: undefined,
    removeAllAssociations: undefined,
    removeSelectedCells: undefined,
    removeSelectedAssociations: undefined,

    deleteAssociations: {sourceColumnId: number, targetColumnId: number},
    deletedAssociations: {sourceColumnId: number, targetColumnId: number},

    fit: {direction: "LR" | "TB" | "RL" | "BT"},
    layout: {direction: "LR" | "TB" | "RL" | "BT"},
}

export const AssociationEditorGraphEventBus = mitt<AssociationEditorGraphEvents>()