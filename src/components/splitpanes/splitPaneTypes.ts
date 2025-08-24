import type {ComputedRef, InjectionKey, Ref} from 'vue';

export type Pane = {
    id: number
    el: HTMLElement | null
    min: number
    max: number
    givenSize?: number
    size: number
    index: number
}

export type SplitpanesProps = {
    horizontal?: boolean
    pushOtherPanes?: boolean
    maximizePanes?: boolean
    rtl?: boolean
    firstSplitter?: boolean

    zoom?: number
}

export type EmitPaneData = {
    max: number; min: number, size: number
}

export type SplitpanesEmits = {
    (evt: 'ready'): void
    (evt: 'resize', event: MouseEvent | TouchEvent, panes: EmitPaneData[]): void
    (evt: 'resized', event: MouseEvent | TouchEvent | undefined, panes: EmitPaneData[], index?: number, prevPane?: Pane, nextPane?: Pane): void
    (evt: 'pane-click', event: MouseEvent | TouchEvent, panes: EmitPaneData[], index: number, pane: Pane): void
    (evt: 'pane-maximize', event: MouseEvent | TouchEvent, panes: EmitPaneData[], index: number, pane: Pane): void
    (evt: 'pane-add', pane: Pane, panes: EmitPaneData[]): void
    (evt: 'pane-remove', pane: Pane, panes: EmitPaneData[]): void
    (evt: 'splitter-click', event: MouseEvent | TouchEvent, panes: EmitPaneData[], index: number, prevPane?: Pane, nextPane?: Pane): void
    (evt: 'splitter-dblclick', event: MouseEvent | TouchEvent, panes: EmitPaneData[], index: number, prevPane?: Pane, nextPane?: Pane): void
}

export type DragInfo = {
    x: number,
    y: number,
}

export type RequestUpdatePayload = {
    uid: number
    size?: number
    min?: number
    max?: number
}

export type ChangedPanes = {
    addedPane?: Pane,
    removedPane?: Pane
}

export const injectKey = {
    panes: Symbol() as InjectionKey<Ref<Pane[]>>,
    indexedPanes: Symbol() as InjectionKey<ComputedRef<Record<number, Pane>>>,
    horizontal: Symbol() as InjectionKey<ComputedRef<boolean>>,
    requestUpdate: Symbol() as InjectionKey<(payload: RequestUpdatePayload) => void>,
    onPaneAdd: Symbol() as InjectionKey<(pane: Omit<Pane, 'index'>) => void>,
    onPaneRemove: Symbol() as InjectionKey<(uid: number) => void>,
    onPaneClick: Symbol() as InjectionKey<(event: MouseEvent | TouchEvent, uid: number) => void>
}