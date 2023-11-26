import {computed, nextTick, ref} from 'vue'
import mitt from "mitt";

type DialogManageEvents<K, V> = {
    open: {key: K, value?: V},
    close: {key: K}
}

export const useDialogListState = <K, V>() => {
    const eventBus = mitt<DialogManageEvents<K, V>>()

    const items = ref<Map<K, V | undefined>>(new Map)

    eventBus.on('open', async ({key, value}) => {
        if (items.value.has(key)) {
            items.value.delete(key)
            await nextTick(() => {
                items.value.set(key, value)
            })
        } else {
            items.value.set(key, value)
        }
    })

    eventBus.on('close', async ({key}) => {
        items.value.delete(key)
    })

    return {
        keys: computed(() => {
            return [...items.value.keys()]
        }),
        values: computed(() => {
            return [...items.value.values()]
        }),
        get: (key: K): V | undefined => {
            return items.value.get(key)
        },
        items: computed(() => {
            return [...items.value.entries()]
        }),
        open: (key: K, value?: V) => {
            eventBus.emit('open', {key, value})
        },
        close: (key: K) => {
            eventBus.emit('close', {key})
        },
        ...eventBus
    }
}