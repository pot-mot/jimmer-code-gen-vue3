import {ref} from "vue";
import mitt from "mitt";

type OpenEvents = {
    open: undefined,
    close: undefined
}

export const useOpenState = () => {
    const eventBus = mitt<OpenEvents>()

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

    const toggle = () => {
        if (openState.value) {
            eventBus.emit('close')
        } else {
            eventBus.emit('open')
        }
    }

    return {
        openState,
        open,
        close,
        toggle,
        ...eventBus
    }
}
