import {ref} from "vue";

export const useLoadHooks = <T> (getProps: () => T | Promise<T>) => {
    const batchExe = async (fns: ((props: T) => any)[]) => {
        const props = await getProps()

        fns.forEach(fn => {
            fn(props)
        })
    }

    const beforeLoadFns = ref<((props: T) => any)[]>([])

    const onBeforeLoad = (callback: (props: T) => any) => {
        beforeLoadFns.value.push(callback)
    }

    const loadedFns = ref<((props: T) => any)[]>([])

    const onLoaded = (callback: (props: T) => any) => {
        loadedFns.value.push(callback)
    }

    const beforeUnloadFns = ref<((props: T) => any)[]>([])

    const onBeforeUnload = (callback: ((props: T) => any)) => {
        beforeUnloadFns.value.push(callback)
    }

    const unloadedFns = ref<((props: T) => any)[]>([])

    const onUnloaded = (callback: (() => any)) => {
        unloadedFns.value.push(callback)
    }

    return {
        beforeLoadFns,
        onBeforeLoad,
        beforeLoad: () => batchExe(beforeLoadFns.value),

        loadedFns,
        onLoaded,
        loaded: () => batchExe(loadedFns.value),

        beforeUnloadFns,
        onBeforeUnload,
        beforeUnload: () => batchExe(beforeUnloadFns.value),

        unloadedFns,
        onUnloaded,
        unloaded: () => batchExe(unloadedFns.value)
    }
}
