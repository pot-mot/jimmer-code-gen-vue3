import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useLoadHooks} from "@/utils/asyncHooks.ts";
import {api} from "@/api";
import {GenConfig} from "@/api/__generated/model/static";

export const useGenConfigStore = defineStore(
    'GenConfig',
    () => {
        const genConfigState = ref<GenConfig>()

        const loadHooks = useLoadHooks(() => genConfigState.value)

        const isLoaded = computed(() => {
            return !!genConfigState.value
        })

        const getGenConfig = async () => {
            await loadHooks.beforeLoad()
            genConfigState.value = await api.configService.getConfig()
            await loadHooks.loaded()

            return genConfigState.value
        }

        const cleanGenConfig = async () => {
            await loadHooks.beforeUnload()
            genConfigState.value = undefined
            await loadHooks.unloaded()
        }

        const resetGenConfig = async () => {
            await cleanGenConfig()
            return await getGenConfig()
        }

        getGenConfig().then()

        const genConfig = computed(() => {
            if (!genConfigState.value) {
                throw "genConfig not loaded"
            }
            return genConfigState.value
        })

        return {
            genConfig,
            isLoaded,
            reset: resetGenConfig,

            ...loadHooks,
        }
    }
)
