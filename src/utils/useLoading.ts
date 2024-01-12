import {onBeforeMount, onMounted, ref} from "vue";

export const useLoading = (immediate: boolean = false) => {
    const loadingCount = ref(0)

    const isLoading = () => {
        return loadingCount.value > 0
    }

    const add = () => loadingCount.value++

    const sub = () => loadingCount.value--

    const clear = () => loadingCount.value = 0

    if (immediate) {
        onBeforeMount(() => {
            add()
        })
        onMounted(() => {
            sub()
        })
    }

    return {
        isLoading,
        count: loadingCount,
        add: add,
        sub: sub,
        start: add,
        end: clear,
    }
}
