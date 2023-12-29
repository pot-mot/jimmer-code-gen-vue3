import {defineStore} from "pinia";
import {computed} from "vue";
import {api} from "@/api";
import {useAsyncStoreOperations} from "@/utils/useAsyncStoreOperations.ts";

export const useJDBCTypeStore = defineStore(
    'JDBCType',
    () => {
        const {
            data: _jdbcTypes,
            isLoaded,
            getData: getJDBCTypes,
            resetData: resetJDBCTypes,
            loadHooks,
        } = useAsyncStoreOperations<{[key:string]: number}>(() => {
            return api.jdbcservice.listType()
        })

        getJDBCTypes().then()

        const jdbcTypes = computed<{[key:string]: number}>(() => {
            if (!_jdbcTypes.value) {
                throw "jdbcTypes Not Loaded"
            }
            return _jdbcTypes.value
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
            jdbcTypes,
            list: jdbcTypeList,
            map: jdbcTypeMap,
            isLoaded,
            reset: resetJDBCTypes,

            ...loadHooks,
        }
    }
)
