import {Ref, ref} from "vue";

export interface LoadHooks<T> {
    beforeLoadFns: Ref<((props: T) => any)[]>,
    onBeforeLoad: (callback: (props: T) => any) => void
    beforeLoad: () => void,

    loadedFns: Ref<((props: T) => any)[]>,
    onLoaded: (callback: (props: T) => any) => void
    loaded: () => void,

    beforeUnloadFns: Ref<((props: T) => any)[]>,
    onBeforeUnload: (callback: (props: T) => any) => void
    beforeUnload: () => void,

    unloadedFns: Ref<((props: T) => any)[]>,
    onUnloaded: (callback: (props: T) => any) => void
    unloaded: () => void,
}

export const useLoadHooks = <T> (getProps: () => T): LoadHooks<T> => {
    const batchExe = (fns: ((props: T) => any)[]) => {
        const props = getProps()

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

    const onUnloaded = (callback: ((props: T) => any)) => {
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
