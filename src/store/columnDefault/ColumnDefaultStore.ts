import {defineStore} from "pinia";
import {computed} from "vue";
import {api} from "@/api";
import {GenColumnDefaultView} from "@/api/__generated/model/static";
import {DataSourceType} from "@/api/__generated/model/enums";
import {useGenConfigContextStore} from "@/store/config/ContextGenConfigStore.ts";
import {useAsyncStoreOperations} from "@/utils/useAsyncStoreOperations.ts";

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

        const init = async () => {
            await getData()
        }

        const columnDefaults = computed(() => {
            if (!data.value) {
                throw "columnDefaults Not Loaded"
            }
            return data.value
        })

        /**
         * 获取列默认
         * @param jdbcTypeCode
         * @param dataSourceType 如果为 undefined，则设置为当前 context 中的 dataSourceType
         */
        const getColumnDefaults = (jdbcTypeCode: number, dataSourceType?: DataSourceType | undefined): GenColumnDefaultView[] => {
            if (!columnDefaults.value) return []

            const typeCodeMatchedDefaults = columnDefaults.value.filter(it => it.typeCode === jdbcTypeCode)

            if (!dataSourceType) {
                const contextStore = useGenConfigContextStore()
                dataSourceType = contextStore.context.dataSourceType
            }

            const dataSourceMatchedDefaults = typeCodeMatchedDefaults.filter(it => it.dataSourceType === dataSourceType)

            if (dataSourceMatchedDefaults.length > 0) {
                return dataSourceMatchedDefaults
            } else {
                return typeCodeMatchedDefaults.filter(it => !it.dataSourceType)
            }
        }

        return {
            init,

            columnDefaults,
            isLoaded,
            reset: resetData,
            get: getColumnDefaults,

            ...loadHooks,
        }
    }
)
