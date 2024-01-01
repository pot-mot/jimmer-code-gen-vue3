import {computed, ref} from "vue";
import {useLoadHooks} from "@/utils/useLoadHooks.ts";

export const useAsyncStoreOperations = <T> (
    fn: () => Promise<T>
) => {
    const data = ref<T>()

    const isGettingData = ref(false)

    const loadHooks = useLoadHooks(() => data.value)

    const isLoaded = computed(() => {
        const isLoaded = !!data.value

        if (!isLoaded) {
            getData().then()
        }

        return isLoaded
    })

    const getData = async () => {
        if (isGettingData.value) return

        loadHooks.beforeLoad()

        isGettingData.value = true
        data.value = await fn()
        isGettingData.value = false

        loadHooks.loaded()

        return data.value
    }

    const cleanData = async () => {
        loadHooks.beforeUnload()
        data.value = undefined
        loadHooks.unloaded()
    }

    const resetData = async () => {
        await cleanData()
        return await getData()
    }

    return {
        data, isLoaded, loadHooks, getData, cleanData, resetData
    }
}
