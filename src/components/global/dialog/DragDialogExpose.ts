export type DragDialogExpose = {
    toFront: () => void
    initSizePosition: () => void
    open: () => Promise<void>
    close: () => Promise<void>
    toggleFullScreen: () => void
    syncDialogHeight: () => void
}