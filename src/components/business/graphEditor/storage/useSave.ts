import {onBeforeUnmount, onMounted} from "vue";

export const useSaveKeyEvent = (callback: () => any) => {
    const handleKeyEvent = async (e: KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key == 's') {
                e.preventDefault()
                await callback()
            }
        }
    }

    onMounted(() => {
        document.documentElement.addEventListener('keydown', handleKeyEvent)
    })

    onBeforeUnmount(() => {
        document.documentElement.removeEventListener('keydown', handleKeyEvent)
    })
}
