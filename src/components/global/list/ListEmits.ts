export interface ListItemEmits<T> {
    (event: 'item:click', item: T): void
}