export interface ListEmits<T> {
    (event: 'clickItem', item: T, index: number): void
}

export interface EditListEmits<T> {
    (event: "update:lines", lines: T[]): void
    (event: "delete", deletedLines: T[]): void
}
