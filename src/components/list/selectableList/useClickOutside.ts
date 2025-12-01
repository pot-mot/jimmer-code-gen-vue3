import {onBeforeUnmount, onMounted} from "vue";

const clickOutsideHandlers = new Map<
    () => Element | null | undefined,
    (e: MouseEvent) => void
>()

const handleClickOutside = (e: MouseEvent) => {
    if (e.target instanceof Element) {
        for (const [target, handler] of clickOutsideHandlers) {
            const targetElement = target()
            if (targetElement && !targetElement.contains(e.target)) {
                handler(e)
            }
        }
    }
}

export const mountClickOutside = () => {
    document.documentElement.addEventListener('click', handleClickOutside, {capture: true})
}

export const umountClickOutside = () => {
    document.documentElement.removeEventListener('click', handleClickOutside)
    clickOutsideHandlers.clear()
}

export const useClickOutside = (
    _target: () => Element | null | undefined,
    callback: (e: MouseEvent) => void,
) => {
    onMounted(() => {
        clickOutsideHandlers.set(_target, callback)
    })

    onBeforeUnmount(() => {
        clickOutsideHandlers.delete(_target)
    })
}
