import {defineStore} from "pinia";
import {computed, DeepReadonly} from "vue";
import {api} from "@/api";
import {GenDataSourceTemplateView, Pair} from "@/api/__generated/model/static";
import {useAsyncStoreOperations} from "@/utils/useAsyncStoreOperations.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";

export const useDataSourceDefaultStore = defineStore(
    'DataSourceDefault',
    () => {
        const {
            data,
            isLoaded,
            getData,
            resetData,
            loadHooks,
        } = useAsyncStoreOperations<Array<Pair<string, DeepReadonly<GenDataSourceTemplateView>>>>(
            () => {
                return api.dataSourceService.getDefaults()
            }
        )

        const loadingStore = useGlobalLoadingStore()
        const flag = loadingStore.start('DataSourceDefaultStore init')
        getData().then(() => {
            loadingStore.stop(flag)
        })

        const dataSourceDefaults = computed<Array<Pair<string, DeepReadonly<GenDataSourceTemplateView>>>>(() => {
            if (!data.value) {
                throw "jdbcTypes Not Loaded"
            }
            return data.value
        })

        const getDataSourceDefault = (dataSourceType: string): DeepReadonly<GenDataSourceTemplateView> | undefined => {
            return dataSourceDefaults.value.filter(it => it.first === dataSourceType)[0]?.second
        }

        return {
            dataSourceDefaults,
            isLoaded,
            reset: resetData,
            get: getDataSourceDefault,

            ...loadHooks,
        }
    }
)
