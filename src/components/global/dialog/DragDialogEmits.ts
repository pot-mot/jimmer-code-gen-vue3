export interface ModelValueEmits<T> {
    (event: "update:modelValue", modelValue: T): void
}

export interface DragDialogEmits {
    (event: "open"): void

    (event: "opened"): void

    (event: "close"): void

    (event: "closed"): void
}
