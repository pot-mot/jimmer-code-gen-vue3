export const getTouchRect = (e: TouchEvent, start: { x: number, y: number }): {
    x: number,
    y: number,
    width: number,
    height: number,
} => {
    if (e.touches.length === 0) {
        return {x: start.x, y: start.y, width: 0, height: 0}
    }
    let minX = start.x
    let minY = start.y
    let maxX = start.x
    let maxY = start.y

    for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i]
        if (!touch) continue

        const touchX = touch.clientX
        const touchY = touch.clientY

        minX = Math.min(minX, touchX)
        minY = Math.min(minY, touchY)
        maxX = Math.max(maxX, touchX)
        maxY = Math.max(maxY, touchY)
    }

    return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
    }
}