import {defineStore} from "pinia";
import {computed} from "vue";
import {api} from "@/api";
import {GenConfig} from "@/api/__generated/model/static";
import {useAsyncStoreOperations} from "@/utils/useAsyncStoreOperations.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";

export const useGlobalGenConfigStore = defineStore(
    'GlobalGenConfig',
    () => {
        const {
            data,
            isLoaded,
            getData,
            resetData,
            loadHooks,
        } = useAsyncStoreOperations<GenConfig>(
            () => {return api.configService.getConfig()}
        )

        const loadingStore = useGlobalLoadingStore()
        const flag = loadingStore.start('GlobalGenConfigStore init')
        getData().then(() => {
            loadingStore.stop(flag)
        })

        const genConfig = computed(() => {
            if (!data.value) {
                throw "genConfig not loaded"
            }
            return data.value
        })

        return {
            genConfig,
            isLoaded,
            reset: resetData,

            ...loadHooks,
        }
    }
)
