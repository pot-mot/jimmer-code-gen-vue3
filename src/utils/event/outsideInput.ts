import {checkIsInputOrTextarea} from "@/utils/event/judgeEventTarget.ts";

export const outsideInput = (target: Element | EventTarget | null | undefined, value: string) => {
    if (target === null || target === undefined) return

    if (checkIsInputOrTextarea(target)) {
        const start = target.selectionStart ?? target.value.length
        const end = target.selectionEnd ?? target.value.length

        target.setRangeText(value, start, end, 'end')

        const inputEvent = new Event('input', { bubbles: true })
        target.dispatchEvent(inputEvent)

        const changeEvent = new Event('change')
        target.dispatchEvent(changeEvent)
    }
}