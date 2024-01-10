export interface ListEmits<T> {
    (event: 'clickItem', item: T, index: number): void
}

export interface EditListEmits<T extends { [key: string]: any }> {
    (event: "update:lines", lines: T[]): void
}
