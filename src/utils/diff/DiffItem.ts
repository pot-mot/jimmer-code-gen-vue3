import type {Diff} from "@donedeal0/superdiff";

export type AddedItem<T> = {
    data: T,
    nextIndex: number,
}

export type UpdatedItem<T> = {
    prevData: T,
    prevIndex: number,
    nextData: T,
    nextIndex: number,
    diff: Diff[]
}

export type DeletedItem<T> = {
    data: T,
    prevIndex: number,
}

export type MovedItem<T> = {
    data: T,
    prevIndex: number,
    nextIndex: number,
}

export type EqualsItem<T> = {
    data: T,
    index: number,
}
