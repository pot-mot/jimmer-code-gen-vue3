import {computed, ref} from "vue";
import {useDebugStore} from "@/store/debug/debugStore.ts";
import {functionWrapper, type WrapperFunction} from "@/utils/functionWrapper.ts";

export type WithLoading = <F extends (...args: any) => any> (name: string, fn: F) => WrapperFunction<F>

export const useLoading = (prefix: string) => {
    const loadingSet = ref<Set<string>>(new Set())

    const isLoading = computed(() => {
        return loadingSet.value.size > 0
    })

    const debugStore = useDebugStore()

    const start = (name: string) => {
        const flag = `${prefix} ${name}`
        loadingSet.value.add(flag)
        debugStore.log('LOADING', `start [${flag}]`)
        return flag
    }

    const stop = (flag: string) => {
        loadingSet.value.delete(flag)
        debugStore.log('LOADING', `stop [${flag}]`)
    }

    const clear = () => {
        loadingSet.value.clear()
    }

    const withLoading: WithLoading = <F extends (...args: any) => any>(
        name: string,
        fn: F,
    ): WrapperFunction<F> => {
        let flag: string
        return functionWrapper(
            fn,
            (_) => {
                flag = start(name)
            },
            (_1, _2) => {
                stop(flag)
            }
        )
    }

    return {
        isLoading,
        loadingSet,
        start,
        stop,
        clear,
        withLoading,
    }
}
