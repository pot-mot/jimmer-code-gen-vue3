export interface DragDialogEmits {
    (event: "open"): void
    (event: "close"): void
    (event: "closed"): void
    (event: "update:modelValue", modelValue: boolean): void
}