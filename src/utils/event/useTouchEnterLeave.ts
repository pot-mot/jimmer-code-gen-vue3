export const useTouchEnterLeave = () => {
    let currentTouchEnterTarget: Element | undefined = undefined

    const emitTouchLeave = () => {
        if (currentTouchEnterTarget) {
            const touchLeaveEvent = new CustomEvent('touchleave', {
                bubbles: true,
                cancelable: true,
                detail: null
            })

            currentTouchEnterTarget.dispatchEvent(touchLeaveEvent)
        }
    }

    const emitTouchEnter = () => {
        if (currentTouchEnterTarget) {
            const touchEnterEvent = new CustomEvent('touchenter', {
                bubbles: true,
                cancelable: true,
                detail: null
            })

            currentTouchEnterTarget.dispatchEvent(touchEnterEvent)
        }
    }

    const handleTouchMove = (elements: Element[], clientXY: { x: number, y: number }) => {
        const target = elements.find(el => {
            const rect = el.getBoundingClientRect()
            return (
                clientXY.x >= rect.left &&
                clientXY.x <= rect.right &&
                clientXY.y >= rect.top &&
                clientXY.y <= rect.bottom
            )
        })

        if (target) {
            if (target !== currentTouchEnterTarget) {
                emitTouchLeave()
                currentTouchEnterTarget = target
                emitTouchEnter()
            }
        }

        // 如果没有找到目标，重置当前状态
        if (!target) {
            emitTouchLeave()
            currentTouchEnterTarget = undefined
        }
    }

    return {
        handleTouchMove
    }
}
