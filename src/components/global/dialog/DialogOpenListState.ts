import {nextTick, ref} from 'vue'
import mitt from "mitt";
import {UnwrapRef} from "@vue/reactivity";

type DialogOpenOptions = {
    modal?: boolean
}

type DialogOpenListEvents<K, V, O> = {
    open: { key: K, value: UnwrapRef<V>, options?: UnwrapRef<O> },
    close: { key: K }
}

export const useDialogOpenListState = <K, V, O = DialogOpenOptions>() => {
    const eventBus = mitt<DialogOpenListEvents<K, V, O>>()

    const items = ref(new Map<K, {value: V, options?: O}>)

    eventBus.on('open', async ({key, value, options}) => {
        if (items.value.has(key)) {
            items.value.delete(key)
            await nextTick()
        }
        return items.value.set(key, {value, options})
    })

    eventBus.on('close', async ({key}) => {
        return items.value.delete(key)
    })

    return {
        items,

        has: (key: K): boolean => {
            return items.value.has(key)
        },
        get: (key: K): UnwrapRef<V> | undefined => {
            return items.value.get(key)?.value
        },
        set: (key: K, value: UnwrapRef<V>, options?: UnwrapRef<O>) => {
            return items.value.set(key, {value, options})
        },

        open: (key: K, value: UnwrapRef<V>, options?: UnwrapRef<O>) => {
            eventBus.emit('open', {key, value, options})
        },
        close: (key: K) => {
            eventBus.emit('close', {key})
        },
        closeAll: () => {
            for (const key of items.value.keys()) {
                eventBus.emit('close', {key})
            }
            items.value.clear()
        },
        ...eventBus
    }
}
