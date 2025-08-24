import type {Emitter} from "mitt";

type FullAnyHistoryEventsArgs = {
    beforeChangeInput: any
    changeInput: any
    beforeUndoInput: any,
    undoInput: any,
    beforeRedoInput: any,
    redoInput: any
}

export type FullUndefinedHistoryEventsArgs = {
    beforeChangeInput: undefined
    changeInput: undefined
    beforeUndoInput: undefined,
    undoInput: undefined,
    beforeRedoInput: undefined,
    redoInput: undefined
}

export type HistoryEvents<HistoryEventsArgs extends FullAnyHistoryEventsArgs = FullAnyHistoryEventsArgs> = {
    beforeChange: HistoryEventsArgs["beforeChangeInput"],
    change: HistoryEventsArgs["changeInput"],

    beforeUndo: HistoryEventsArgs["beforeUndoInput"],
    undo: HistoryEventsArgs["undoInput"],

    beforeRedo: HistoryEventsArgs["beforeRedoInput"],
    redo: HistoryEventsArgs["redoInput"],
}

export type BaseHistory<Events extends HistoryEvents = HistoryEvents<FullUndefinedHistoryEventsArgs>> = {
    eventBus: Emitter<Events>

    canUndo(): boolean
    undo(): void

    canRedo(): boolean
    redo(): void
}
