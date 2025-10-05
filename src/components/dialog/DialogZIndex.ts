import {ref} from "vue";

let currentDialogZIndex = 3000000

export const useDialogZIndex = () => {
    const zIndex = ref(currentDialogZIndex)
    const toFront = () => {
        currentDialogZIndex++
        zIndex.value = currentDialogZIndex
    }

    return {
        zIndex,
        toFront,
    }
}