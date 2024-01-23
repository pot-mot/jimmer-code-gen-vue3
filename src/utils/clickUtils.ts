/**
 * 处理双击时不触发单击
 *
 * @param clickFn 单击回调函数
 * @param dblClickFn 双击回调函数
 * @param timeout 单击触发延迟
 */
export const processClickFunction = (
    clickFn: any,
    dblClickFn: any,
    timeout: number = 150
) => {
    let timer: NodeJS.Timeout

    const click = (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(
            () => {
                clickFn(...args)
            },
            timeout
        )
    }

    const dblClick = async (...args: any[]) => {
        clearTimeout(timer)
        return await dblClickFn(...args)
    }

    return {
        click,
        dblClick
    }
}

/**
 * 规避可能存在交互的 DOM 元素
 */

const interactionTagNames = ["INPUT", "TEXTAREA", "BUTTON"]

export const interactionTagClassList = ["el-input", "el-input-number", "el-checkbox", "el-switch", "el-select", "monaco-editor", "code-preview", "splitpanes__splitter"]

export const containsClassList = (e: HTMLElement, classNames: string[]) => {
    for (let className of classNames) {
        if (e.classList.contains(className)) {
            return true
        }
    }
    return false
}

export const judgeTarget = (
    e: MouseEvent,
    judge: (el: HTMLElement) => boolean | undefined
) => {
    let target = (e.target as HTMLElement | undefined | null)

    while (target) {
        const result = judge(target)
        if (result) return result
        target = target.parentElement
    }
    return false
}

export const judgeTargetIsInteraction = (
    e: MouseEvent
) => {
    return judgeTarget(e, (el) => {
        if ('contenteditable' in el) {
            return true
        }
        if (interactionTagNames.includes(el.tagName)) {
            return true
        }
        if (containsClassList(el, interactionTagClassList)) {
            return true
        }
    })
}
