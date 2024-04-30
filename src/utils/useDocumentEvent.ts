import {onBeforeUnmount, onMounted} from "vue";

export const useDocumentEvent = <K extends keyof HTMLElementEventMap> (
    event: K,
    handler: (e: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
) => {
    onMounted(() => {
        document.documentElement.addEventListener(event, handler, options)
    })

    onBeforeUnmount(() => {
        document.documentElement.removeEventListener(event, handler, options)
    })
}
