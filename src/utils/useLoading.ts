import {computed, ref} from "vue";

export const useLoading = (prefix: string) => {
    const loadingSet = ref<Set<string>>(new Set())

    const isLoading = computed(() => {
        return loadingSet.value.size > 0
    })

    const add = (name: string) => {
        const flag = `${prefix} ${name} ${Date.now()}`
        loadingSet.value.add(flag)
        return flag
    }

    const sub = (flag: string) => {
        loadingSet.value.delete(flag)
    }

    const clear = () => {
        loadingSet.value.clear()
    }

    return {
        isLoading,
        loadingSet,
        add,
        sub,
        clear
    }
}
