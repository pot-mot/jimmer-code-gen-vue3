import {onBeforeUnmount, onMounted} from "vue";

export const useDocumentEvent = <K extends keyof HTMLElementEventMap> (
    event: K,
    handler: (e: HTMLElementEventMap[K]) => any
) => {
    onMounted(() => {
        document.documentElement.addEventListener(event, handler)
    })

    onBeforeUnmount(() => {
        document.documentElement.removeEventListener(event, handler)
    })
}
