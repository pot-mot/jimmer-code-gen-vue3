export interface FormEmits<T> {
    (event: "submit", data: T): void
    (event: "cancel", data: T): void
}