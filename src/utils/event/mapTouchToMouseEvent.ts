export const mapTouchToMouseEvents = (
    element: Element
): void => {
    const eventMapping = {
        touchstart: 'mousedown',
        touchmove: 'mousemove',
        touchend: 'mouseup',
    }

    Object.entries(eventMapping).forEach(([touchEvent, mouseEvent]) => {
        element.addEventListener(touchEvent as any, (e: TouchEvent) => {
            const touches = e.touches.length > 0 ? e.touches : e.changedTouches
            if (!touches[0]) return

            const touch = touches[0]
            const simulatedMouseEvent = new MouseEvent(mouseEvent, {
                bubbles: true,
                cancelable: true,
                clientX: touch.clientX,
                clientY: touch.clientY,
                screenX: touch.screenX,
                screenY: touch.screenY,
            })

            element.dispatchEvent(simulatedMouseEvent)
        })
    })
}
