import {onBeforeUnmount, onMounted} from "vue";

export const useClickOutside = (
    _target: () => HTMLElement | undefined,
    callback: (e: MouseEvent) => void,
    options?: boolean | AddEventListenerOptions
) => {
    const handler = (e: MouseEvent) => {
        const target = _target()

        if (target) {
            if (!target.contains(e.target as HTMLElement)) {
                callback(e)
            }
        }
    }

    onMounted(() => {
        document.documentElement.addEventListener('click', handler, options)
    })

    onBeforeUnmount(() => {
        document.documentElement.removeEventListener('click', handler, options)
    })
}
