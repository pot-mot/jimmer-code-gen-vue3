import {defineStore} from "pinia";
import {computed} from "vue";
import {api} from "@/api";
import {GenColumnDefaultView} from "@/api/__generated/model/static";
import {DataSourceType} from "@/api/__generated/model/enums";
import {useGenConfigContextStore} from "@/components/business/genConfig/ContextGenConfigStore.ts";
import {useAsyncStoreOperations} from "@/utils/useAsyncStoreOperations.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";

export const useColumnDefaultStore = defineStore(
    'GenColumnDefault',
    () => {
        const {
            data,
            isLoaded,
            getData,
            resetData,
            loadHooks,
        } = useAsyncStoreOperations<GenColumnDefaultView[]>(
            () => {
                return api.columnDefaultService.list({})
            }
        )

        const loadingStore = useGlobalLoadingStore()
        const flag = loadingStore.start('getColumnDefault')
        getData().then(() => {
            loadingStore.stop(flag)
        })

        const columnDefaults = computed(() => {
            if (!data.value) {
                throw "columnDefaults Not Loaded"
            }
            return data.value
        })

        const getColumnDefaults = (jdbcTypeCode: number, dataSourceType?: DataSourceType): GenColumnDefaultView[] => {
            const contextStore = useGenConfigContextStore()

            if (!dataSourceType) {
                dataSourceType = contextStore.context.dataSourceType
            }

            if (!columnDefaults.value) return []

            return columnDefaults.value.filter(it => it.dataSourceType == dataSourceType && it.typeCode == jdbcTypeCode)
        }

        return {
            columnDefaults,
            isLoaded,
            reset: resetData,
            get: getColumnDefaults,

            ...loadHooks,
        }
    }
)
