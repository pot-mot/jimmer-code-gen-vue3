import {computed, ref} from "vue";
import {useDebugStore} from "@/store/debug/debugStore.ts";

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

    return {
        isLoading,
        loadingSet,
        start,
        stop,
        clear
    }
}
