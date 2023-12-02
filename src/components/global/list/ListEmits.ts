export interface ListItemEmits<T> {
    (event: 'clickItem', item: T): void
}