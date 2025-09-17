export interface ListEmits<T> {
    (event: 'clickItem', item: T, index: number): void
}

export interface EditListEmits<T> {
    (event: "delete", deletedLines: T[]): void
}
