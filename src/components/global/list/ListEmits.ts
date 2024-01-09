export interface ListEmits<T> {
    (event: 'clickItem', item: T): void
}

export interface EditListEmits<T extends { [key: string]: any }> {
    (event: "update:lines", lines: T[]): void
}
