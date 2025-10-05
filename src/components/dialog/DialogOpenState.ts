import {ref, watch} from "vue";
import mitt from "mitt";

type OpenEvents = {
    open: undefined,
    close: undefined
}

export const useDialogOpenState = (initOpen: boolean = false) => {
    const eventBus = mitt<OpenEvents>()

    const openState = ref<boolean>(initOpen)

    const open = () => {
        openState.value = true
    }

    const close = () => {
        openState.value = false
    }

    const toggle = () => {
        if (openState.value) {
            close()
        } else {
            open()
        }
    }

    watch(() => openState.value, (value) => {
        if (value) {
            eventBus.emit('open')
        } else {
            eventBus.emit('close')
        }
    })

    return {
        openState,
        open,
        close,
        toggle,
        ...eventBus
    }
}
