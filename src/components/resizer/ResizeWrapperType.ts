export type ResizeOrigin = {
    clientX: number,
    clientY: number,
    width: number,
    height: number,
}

export const resizeBorderKeys = ['top', 'left', 'right', 'bottom']

export const resizeHandleKeys = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

export type ResizeDirection = typeof resizeBorderKeys[number] | typeof resizeHandleKeys[number]

export type ResizeStartEventArgs = {
    origin: ResizeOrigin,
    direction: ResizeDirection
}

export type ResizeEventArgs = {
    origin: ResizeOrigin,
    direction: ResizeDirection,
    currentSize: { width: number, height: number },
    totalSizeDiff: { x: number, y: number },
    currentSizeDiff: { x: number, y: number },
    totalPositionDiff: { x: number, y: number },
    currentPositionDiff: { x: number, y: number }
}

export type ResizeStopEventArgs = {
    origin: ResizeOrigin,
    direction: ResizeDirection,
    currentSize: { width: number, height: number },
    totalSizeDiff: { x: number, y: number }
}
