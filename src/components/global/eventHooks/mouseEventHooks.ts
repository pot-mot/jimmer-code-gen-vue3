import {onBeforeUnmount, onMounted} from "vue";

export const useKeyEvent = (handler: (e: KeyboardEvent) => void) => {
    onMounted(() => {
        document.documentElement.addEventListener('keydown', handler)
    })

    onBeforeUnmount(() => {
        document.documentElement.removeEventListener('keydown', handler)
    })
}
