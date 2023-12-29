import {defineStore} from "pinia";
import {computed} from "vue";
import {api} from "@/api";
import {GenColumnDefaultView} from "@/api/__generated/model/static";
import {DataSourceType} from "@/api/__generated/model/enums";
import {useGenContextStore} from "@/components/business/context/GenContextStore.ts";
import {useAsyncStoreOperations} from "@/utils/useAsyncStoreOperations.ts";

export const useColumnDefaultStore = defineStore(
    'GenColumnDefault',
    () => {
        const {
            data: _columnDefaults,
            isLoaded,
            getData: getGenColumnDefaults,
            resetData: resetGenColumnDefaults,
            loadHooks,
        } = useAsyncStoreOperations<GenColumnDefaultView[]>(
            () => {
                return api.columnDefaultService.list({})
            }
        )

        getGenColumnDefaults().then()

        const columnDefaults = computed(() => {
            if (!_columnDefaults.value) {
                throw "columnDefaults Not Loaded"
            }
            return _columnDefaults.value
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
