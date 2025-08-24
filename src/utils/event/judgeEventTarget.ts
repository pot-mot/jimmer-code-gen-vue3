const interactionTagNames = ["INPUT", "TEXTAREA", "BUTTON"]

export const interactionTagClassList = ["markdown-editor", "markdown-preview"]

export const checkIsElement = (e: any): e is Element => {
    return (e instanceof Element)
}

export const checkIsInputOrTextarea = (e: any): e is HTMLInputElement | HTMLTextAreaElement => {
    return (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement)
}

export const containsClassList = (e: Element, classNames: string[]) => {
    for (let className of classNames) {
        if (e.classList.contains(className)) {
            return true
        }
    }
    return false
}

export const judgeElement = (
    el: Element | null,
    judge: (el: Element) => boolean | undefined
) => {
    let current: Element | null = el

    while (current) {
        const result = judge(current)
        if (result) return result
        current = current.parentElement
    }
    return false
}

export const judgeTarget = (
    e: UIEvent,
    judge: (el: Element) => boolean | undefined
) => {
    let current = e.target
    if (checkIsElement(current)) {
        return judgeElement(current, judge)
    }
    return false
}

/**
 * 判断元素是否是一个交互用元素
 */
export const judgeInteraction = (el: Element): boolean => {
    if ('contenteditable' in el) {
        return true
    }
    if (interactionTagNames.includes(el.tagName)) {
        return true
    }
    return containsClassList(el, interactionTagClassList);


}

export const judgeElementIsInteraction = (
    el: Element | null
) => {
    return judgeElement(el, judgeInteraction)
}

export const judgeTargetIsInteraction = (
    e: UIEvent
) => {
    return judgeTarget(e, judgeInteraction)
}

export const checkElementParent = (el: Element | null, parent: Element) => {
    while (el) {
        if (el === parent) {
            return true
        }
        el = el.parentElement
    }
    return false
}

export const getMatchedElementOrParent = (el: Element | null, match: (el: Element) => boolean) => {
    while (el) {
        if (match(el)) {
            return el
        }
        el = el.parentElement
    }
    return null
}

export const blurActiveElement = () => {
    if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
    }
}
