import mitt from 'mitt'

type AssociationEditorGraphEvents = {
    loadSchema: {id: number, select?: boolean},
    loadTable: {id: number, focus?: boolean},

    redo: {},
    undo: {},

    removeAllOrSelectedCells: {},
    removeAllOrSelectedAssociations: {},

    selectAll: {},

    fit: {direction: "LR" | "TB" | "RL" | "BT"},
    layout: {direction: "LR" | "TB" | "RL" | "BT"},
}

export const AssociationEditorGraphEventBus = mitt<AssociationEditorGraphEvents>()