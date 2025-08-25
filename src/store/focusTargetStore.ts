import {createStore} from "@/utils/store/createStore.ts";
import {onBeforeUnmount, readonly, shallowRef} from "vue";

const focusTarget = shallowRef<EventTarget | Element | null>(null)
const setActiveElementByActiveElement = () => {
    focusTarget.value = document.activeElement
}
const setActiveElementByFocusIn = (e: Event) => {
    focusTarget.value = e.target
}
const cleanActiveElement = () => {
    focusTarget.value = null
}

export const initFocusTargetStore = () => {
    document.addEventListener('focusin', setActiveElementByFocusIn)
    document.addEventListener('focusout', cleanActiveElement)
    window.addEventListener('resize', setActiveElementByActiveElement)

    onBeforeUnmount(() => {
        document.removeEventListener('focusin', setActiveElementByFocusIn)
        document.removeEventListener('focusout', cleanActiveElement)
        window.removeEventListener('resize', setActiveElementByActiveElement)
        cleanActiveElement()
    })
}

export const useFocusTargetStore = createStore(() => {
    return {
        focusTarget: readonly(focusTarget),
    }
})