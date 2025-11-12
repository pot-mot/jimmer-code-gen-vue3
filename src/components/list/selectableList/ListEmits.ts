export interface ListEmits<T> {
    (event: 'clickItem', item: DeepReadonly<T>, index: number): void
}

export interface EditListEmits<T> {
    (event: 'clickItem', item: T, index: number): void
    (event: "delete", deletedLines: T[]): void
}
