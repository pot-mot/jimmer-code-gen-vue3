import {nextTick, ref} from 'vue'
import mitt from "mitt";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple";

type DialogManageEvents<K, V> = {
    open: { key: K, value: UnwrapRefSimple<V> },
    close: { key: K }
}

export const useDialogListState = <K, V>() => {
    const eventBus = mitt<DialogManageEvents<K, V>>()

    const items = ref(new Map<K, V>)

    eventBus.on('open', async ({key, value}) => {
        if (items.value.has(key)) {
            items.value.delete(key)
            await nextTick()
        }
        return items.value.set(key, value)
    })

    eventBus.on('close', async ({key}) => {
        return items.value.delete(key)
    })

    return {
        items,

        has: (key: K): boolean => {
            return items.value.has(key)
        },
        get: (key: K): UnwrapRefSimple<V> | undefined => {
            return items.value.get(key)
        },
        set: (key: K, value: UnwrapRefSimple<V>) => {
            return items.value.set(key, value)
        },

        open: (key: K, value: UnwrapRefSimple<V>) => {
            eventBus.emit('open', {key, value})
        },
        close: (key: K) => {
            eventBus.emit('close', {key})
        },
        ...eventBus
    }
}
