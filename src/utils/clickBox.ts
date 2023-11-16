export const judgeClickBox = (box: DOMRect, x: number, y: number) => {
    return box.x < x && box.x + box.width > x &&
        box.y < y && box.y + box.height > y
}