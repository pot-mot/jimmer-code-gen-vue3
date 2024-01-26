import {defineStore} from "pinia";
import {computed} from "vue";
import {api} from "@/api";
import {useAsyncStoreOperations} from "@/utils/useAsyncStoreOperations.ts";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";

export const useJdbcTypeStore = defineStore(
    'JdbcType',
    () => {
        const {
            data,
            isLoaded,
            getData,
            resetData,
            loadHooks,
        } = useAsyncStoreOperations<{[key:string]: number}>(() => {
            return api.jdbcService.listType()
        })

        const loadingStore = useGlobalLoadingStore()
        const flag = loadingStore.start('JdbcTypeStore init')
        getData().then(() => {
            loadingStore.stop(flag)
        })

        const jdbcTypes = computed<{[key:string]: number}>(() => {
            if (!data.value) {
                throw "jdbcTypes Not Loaded"
            }
            return data.value
        })

        const jdbcTypeList = computed(() => {
            return Object.entries(jdbcTypes.value).map(entry => {
                return {
                    type: entry[0],
                    typeCode: entry[1]
                }
            })
        })

        const jdbcTypeMap = computed(() => {
            const map = new Map<number, string>()
            jdbcTypeList.value.forEach(({type, typeCode}) => {
                map.set(typeCode, type)
            })
            return map
        })

        return {
            isLoaded,
            jdbcTypes,
            jdbcTypeList,
            jdbcTypeMap,
            resetData,

            ...loadHooks,
        }
    }
)
