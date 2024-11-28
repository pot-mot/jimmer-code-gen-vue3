import {ref} from "vue";
import mitt from "mitt";

type DialogOpenEvents = {
    open: undefined,
    close: undefined
}

export const useDialogOpenState = () => {
    const eventBus = mitt<DialogOpenEvents>()

    const openState = ref<boolean>(false)

    eventBus.on('open', () => {
        return openState.value = true
    })

    eventBus.on('close', () => {
        return openState.value = false
    })

    const open = () => {
        eventBus.emit('open')
    }

    const close = () => {
        eventBus.emit('close')
    }

    return {
        openState,
        open,
        close,
        ...eventBus
    }
}
