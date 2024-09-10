import {defineStore} from "pinia";
import {computed} from "vue";
import {api} from "@/api";
import {GenConfig} from "@/api/__generated/model/static";
import {useAsyncStoreOperations} from "@/utils/useAsyncStoreOperations.ts";

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
            () => {
                return api.configService.getConfig()
            }
        )

        const init = async () => {
            await getData()
        }


        const genConfig = computed(() => {
            if (!data.value) {
                throw "genConfig not loaded"
            }
            return data.value
        })

        return {
            init,

            genConfig,
            isLoaded,
            reset: resetData,

            ...loadHooks,
        }
    }
)
