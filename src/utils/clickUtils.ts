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

const interactionTagClassList = ["el-input", "el-input-number", "el-checkbox", "el-switch", "el-select", "monaco-editor", "code-preview", "splitpanes__splitter"]

const containInteractionTagClassList = (e: HTMLElement) => {
    for (let className of interactionTagClassList) {
        if (e.classList.contains(className)) {
            return true
        }
    }
    return false
}

export const judgeTargetIsInteraction = (e: MouseEvent) => {
    const target = (e.target as HTMLElement | undefined)

    if (target) {
        const tagName = target.tagName
        if (interactionTagNames.includes(tagName)) {
            return true
        }
        if ('contenteditable' in target) {
            return true
        }
        if (containInteractionTagClassList(target)) {
            return true
        }
        let parent = target.parentElement
        while (parent) {
            if (containInteractionTagClassList(parent)) {
                return true
            } else {
                parent = parent.parentElement
            }
        }
    }
    return false
}
