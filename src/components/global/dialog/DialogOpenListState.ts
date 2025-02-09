import {computed, ref} from 'vue'
import mitt from "mitt";
import {UnwrapRef} from "@vue/reactivity";
import {DragDialogExpose} from "@/components/global/dialog/DragDialogExpose.ts";

type DialogOpenOptions = {
    modal?: boolean
}

type IfExistType = 'KeepCurrent' | 'ForceReplace'

type DialogOpenListEvents<K, V, O> = {
    open: { key: K, value: UnwrapRef<V>, options?: UnwrapRef<O>, ifExistType: IfExistType },
    close: { key: K, changed: boolean },
}

export const useDialogOpenListState = <K, V, O = DialogOpenOptions>() => {
    const eventBus = mitt<DialogOpenListEvents<K, V, O>>()

    const map = ref(new Map<K, { value: V, options?: O }>)

    const dialogRefMap = ref(new Map<K, DragDialogExpose>)

    const items = computed<Array<{ key: K, value: UnwrapRef<V>, options?: UnwrapRef<O> }>>({
        get(): Array<{ key: K, value: UnwrapRef<V>, options?: UnwrapRef<O> }> {
            const data: Array<{ key: K, value: UnwrapRef<V>, options?: UnwrapRef<O> }> = []
            for (const [key, {value, options}] of map.value.entries()) {
                data.push({key, value, options})
            }
            return data
        },
        set(newValue: Array<{ key: K, value: UnwrapRef<V>, options?: UnwrapRef<O> }>) {
            const newMap = new Map<K, { value: UnwrapRef<V>, options?: UnwrapRef<O> }>
            for (const {key, value, options} of newValue) {
                newMap.set(key, {value, options})
            }
            map.value = newMap
        }
    })

    eventBus.on('open', async ({key, value, options, ifExistType}) => {
        if (map.value.has(key)) {
            const dialog = dialogRefMap.value.get(key)
            if (dialog === undefined) {
                map.value.set(key, {value, options})
            } else {
                dialog.toFront()
                dialog.initSizePosition()
                if (ifExistType === 'ForceReplace') {
                    map.value.set(key, {value, options})
                }
            }
        } else {
            map.value.set(key, {value, options})
        }
    })

    eventBus.on('close', async ({key}) => {
        map.value.delete(key)
    })

    return {
        items,

        has: (key: K): boolean => {
            return map.value.has(key)
        },
        get: (key: K): UnwrapRef<V> | undefined => {
            return map.value.get(key)?.value
        },
        set: (key: K, value: UnwrapRef<V>, options?: UnwrapRef<O>) => {
            return map.value.set(key, {value, options})
        },
        setDialogRef: (key: K, dialogRef: DragDialogExpose | null) => {
            if (dialogRef === null) {
                return dialogRefMap.value.delete(key)
            } else {
                return dialogRefMap.value.set(key, dialogRef)
            }
        },

        open: (key: K, value: UnwrapRef<V>, options?: UnwrapRef<O>, ifExistType: IfExistType = 'KeepCurrent') => {
            eventBus.emit('open', {key, value, options, ifExistType})
        },
        close: (key: K, changed: boolean) => {
            eventBus.emit('close', {key, changed})
        },
        closeAll: () => {
            for (const key of map.value.keys()) {
                eventBus.emit('close', {key, changed: false})
            }
            map.value.clear()
        },
        ...eventBus
    }
}
