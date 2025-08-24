import type { DirectiveBinding } from 'vue';

export const vTapInput = {
    mounted: (el: HTMLElement, _: DirectiveBinding) => {
        let input: HTMLInputElement | HTMLTextAreaElement | undefined

        if (el.tagName === 'INPUT') {
            input = el as HTMLInputElement
        } else if (el.tagName === 'TEXTAREA') {
            input = el as HTMLTextAreaElement
        } else {
            const firstInput = el.querySelector('input')
            if (firstInput !== null) {
                input = firstInput
            } else {
                const firstTextArea = el.querySelector('textarea')
                if (firstTextArea !== null) {
                    input = firstTextArea
                }
            }
        }

        if (!input) return

        input.addEventListener('keydown', (event: Event) => {
            if ('key' in event && event.key === 'Tab') {
                event.preventDefault()
                const start = input.selectionStart
                const end = input.selectionEnd

                if (start !== null && end !== null) {
                    const text = input.value
                    const before = text.substring(0, start)
                    const after = text.substring(end, text.length)

                    input.value = before + '    ' + after
                    input.selectionStart = start + 4
                    input.selectionEnd = input.selectionStart
                }
            }
        })
    }
}
