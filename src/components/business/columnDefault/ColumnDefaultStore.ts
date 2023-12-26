import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {api} from "@/api";
import {useLoadHooks} from "@/utils/asyncHooks.ts";
import {GenColumnDefaultView} from "@/api/__generated/model/static";
import {DataSourceType} from "@/api/__generated/model/enums";
import {useGenContextStore} from "@/components/business/context/GenContextStore.ts";

export const useColumnDefaultStore = defineStore(
    'GenColumnDefault',
    () => {
        const columnDefaultsState = ref<GenColumnDefaultView[]>()

        const loadHooks = useLoadHooks(() => columnDefaultsState.value)

        const isLoaded = computed(() => {
            return !!columnDefaultsState.value
        })

        const getGenColumnDefaults = async () => {
            await loadHooks.beforeLoad()

            columnDefaultsState.value = await api.columnDefaultService.list({})

            await loadHooks.loaded()

            return columnDefaultsState.value
        }

        const cleanGenColumnDefaults = async () => {
            await loadHooks.beforeUnload()
            columnDefaultsState.value = undefined
            await loadHooks.unloaded()
        }

        const resetGenColumnDefaults = async () => {
            await cleanGenColumnDefaults()
            return await getGenColumnDefaults()
        }

        getGenColumnDefaults().then()

        const columnDefaults = computed(() => {
            if (!columnDefaultsState.value) {
                throw "columnDefaults Not Loaded"
            }
            return columnDefaultsState.value
        })

        const getColumnDefaults = (jdbcTypeCode: number, dataSourceType?: DataSourceType) => {
            const contextStore = useGenContextStore()

            if (!dataSourceType) {
                dataSourceType = contextStore.dataSourceType
            }
            return columnDefaults.value?.filter(it => it.dataSourceType == dataSourceType && it.typeCode == jdbcTypeCode)
        }

        return {
            columnDefaults,
            isLoaded,
            reset: resetGenColumnDefaults,
            get: getColumnDefaults,

            ...loadHooks,
        }
    }
)
