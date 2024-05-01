export interface DragDialogEmits {
    (event: "open"): void

    (event: "opened"): void

    (event: "close"): void

    (event: "closed"): void

    (event: "fullScreenToggle"): void

    (event: "fullScreenToggled"): void
}
