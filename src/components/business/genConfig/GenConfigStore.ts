import {defineStore} from "pinia";
import {computed} from "vue";
import {api} from "@/api";
import {GenConfig} from "@/api/__generated/model/static";
import {useAsyncStoreOperations} from "@/utils/useAsyncStoreOperations.ts";

export const useGenConfigStore = defineStore(
    'GenConfig',
    () => {
        const {
            data: _genConfig,
            isLoaded,
            getData: getGenConfig,
            resetData: resetGenConfig,
            loadHooks,
        } = useAsyncStoreOperations<GenConfig>(
            () => {return api.configService.getConfig()}
        )

        getGenConfig().then()

        const genConfig = computed(() => {
            if (!_genConfig.value) {
                throw "genConfig not loaded"
            }
            return _genConfig.value
        })

        return {
            genConfig,
            isLoaded,
            reset: resetGenConfig,

            ...loadHooks,
        }
    }
)
