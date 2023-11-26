export interface ModelValueEmits<T> {
    (event: "update:modelValue", modelValue: T): void
}

export interface DragDialogEmits extends ModelValueEmits<boolean>{
    (event: "open"): void
    (event: "close"): void
    (event: "closed"): void
}