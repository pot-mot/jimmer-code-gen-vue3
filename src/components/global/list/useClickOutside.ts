import {onBeforeUnmount, onMounted} from "vue";

export const useClickOutside = (_target: () => HTMLElement | undefined, callback: (e: MouseEvent) => void) => {
    const handler = (e: MouseEvent) => {
        const target = _target()

        if (target) {
            if (!target.contains(e.target as HTMLElement)) {
                callback(e)
            }
        }
    }

    onMounted(() => {
        document.documentElement.addEventListener('click', handler)
    })

    onBeforeUnmount(() => {
        document.documentElement.removeEventListener('click', handler)
    })
}
