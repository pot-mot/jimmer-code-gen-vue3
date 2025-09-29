import {onUnmounted, readonly, ref, watch} from "vue";
import {createStore} from "@/utils/store/createStore.ts";

const ctrlKey = ref(false)
const shiftKey = ref(false)
const altKey = ref(false)

watch(() => ctrlKey.value, (value) => {
    if (value) {
        document.documentElement.classList.add('ctrl-down')
    } else {
        document.documentElement.classList.remove('ctrl-down')
    }
}, {immediate: true})
watch(() => shiftKey.value, (value) => {
    if (value) {
        document.documentElement.classList.add('shift-down')
    } else {
        document.documentElement.classList.remove('shift-down')
    }
}, {immediate: true})
watch(() => altKey.value, (value) => {
    if (value) {
        document.documentElement.classList.add('alt-down')
    } else {
        document.documentElement.classList.remove('alt-down')
    }
}, {immediate: true})

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) ctrlKey.value = true
    if (event.shiftKey) shiftKey.value = true
    if (event.altKey) altKey.value = true
}

const handleKeyUp = (event: KeyboardEvent) => {
    if (!event.ctrlKey) ctrlKey.value = false
    if (!event.shiftKey) shiftKey.value = false
    if (!event.altKey) altKey.value = false
}

export const initKeyboardStore = () => {
    window.addEventListener('keydown', handleKeyDown, {capture: true})
    window.addEventListener('keyup', handleKeyUp, {capture: true})

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('keyup', handleKeyUp)
    })
}

export const useKeyboardStore = createStore(() => {
    return {
        ctrlKey: readonly(ctrlKey),
        shiftKey: readonly(shiftKey),
        altKey: readonly(altKey),
    }
})
