export interface ModelValueEmits<T> {
    (event: "update:modelValue", modelValue: T): void
}

export interface DragDialogEmits{
    (event: "opened"): void
    (event: "close"): void
    (event: "closed"): void
}