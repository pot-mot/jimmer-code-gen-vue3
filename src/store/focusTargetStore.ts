import {createStore} from "@/store/createStore.ts";
import {onBeforeUnmount, onMounted, shallowRef} from "vue";

export const useFocusTargetStore = createStore(() => {
    const focusTarget = shallowRef<EventTarget | Element | null>(null)

    const handleFocus = (e: FocusEvent) => {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        if (e.target !== window && (e.target instanceof HTMLElement || e.target instanceof SVGElement)) {
            e.target.focus({preventScroll: true})
            focusTarget.value = e.target
        }
        return false
    }

    const handleFocusIn = (e: FocusEvent) => {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        return false
    }

    const handleBlur = (e: FocusEvent) => {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        if (focusTarget.value === e.target) {
            focusTarget.value = null
        }
        return false
    }

    const handleFocusOut = (e: FocusEvent) => {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        return false
    }


    onMounted(() => {
        window.addEventListener('focus', handleFocus, {capture: true})
        window.addEventListener('focusin', handleFocusIn, {capture: true})
        window.addEventListener('blur', handleBlur, {capture: true})
        window.addEventListener('focusout', handleFocusOut, {capture: true})
    })
    onBeforeUnmount(() => {
        window.removeEventListener('focus', handleFocus)
        window.removeEventListener('focusin', handleFocusIn)
        window.removeEventListener('blur', handleBlur)
        window.addEventListener('focusout', handleFocusOut)
        focusTarget.value = null
    })

    return {
        focusTarget,
    }
})