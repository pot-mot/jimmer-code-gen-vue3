import {computed, onBeforeMount, onMounted, ref} from "vue";

export const useLoading = (immediate: boolean = true) => {
    const loadingCount = ref(0)

    const loading = computed(() => {
        return loadingCount.value > 0
    })

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
        loading,
        addLoading: add,
        subLoading: sub,
        startLoading: add,
        endLoading: clear,
    }
}