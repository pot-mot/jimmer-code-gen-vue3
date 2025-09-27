export const layoutPosition = (
    startPosition: Position,
    withPositions: {position: Position}[]
) => {
    if (withPositions.length === 0) return

    let minX = Infinity
    let minY = Infinity

    for (const {position} of withPositions) {
        minX = Math.min(minX, position.x)
        minY = Math.min(minY, position.y)
    }
    const offsetX = startPosition.x - minX
    const offsetY = startPosition.y - minY
    for (const {position} of withPositions) {
        position.x += offsetX
        position.y += offsetY
    }
}