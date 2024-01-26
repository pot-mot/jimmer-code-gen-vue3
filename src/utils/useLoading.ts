import {computed, ref} from "vue";
import {DEBUG_LOG__LOADING} from "@/config/debug.ts";
import {debugLog} from "@/utils/debugLog.ts";

export const useLoading = (prefix: string) => {
    const loadingSet = ref<Set<string>>(new Set())

    const isLoading = computed(() => {
        return loadingSet.value.size > 0
    })

    const start = (name: string) => {
        const flag = `${prefix} ${name} ${Date.now()}`
        loadingSet.value.add(flag)
        if (DEBUG_LOG__LOADING) {
            debugLog(`loading start [${flag}]`)
        }
        return flag
    }

    const stop = (flag: string) => {
        loadingSet.value.delete(flag)
        if (DEBUG_LOG__LOADING) {
            debugLog(`loading stop [${flag}]`)
        }
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
