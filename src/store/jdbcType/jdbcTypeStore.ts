import {defineStore} from "pinia";
import {computed} from "vue";
import {api} from "@/api";
import {useAsyncStoreOperations} from "@/utils/useAsyncStoreOperations.ts";

export const useJdbcTypeStore = defineStore(
    'JdbcType',
    () => {
        const {
            data,
            isLoaded,
            getData,
            resetData,
            loadHooks,
        } = useAsyncStoreOperations<{ [key: string]: number }>(() => {
            return api.jdbcService.listType()
        })

        const init = async () => {
            await getData()
        }

        const list = computed<{type: string, code: number}[]>(() => {
            return Object.entries(data.value ?? {}).map(entry => {
                return {
                    type: entry[0],
                    code: entry[1]
                }
            })
        })

        const typeCodeMap = computed<Map<string, number>>(() => {
            const map = new Map<string, number>()
            list.value.forEach(({type, code}) => {
                map.set(type, code)
            })
            return map
        })

        const codeTypeMap = computed<Map<number, string>>(() => {
            const map = new Map<number, string>()
            list.value.forEach(({type, code}) => {
                map.set(code, type)
            })
            return map
        })

        return {
            init,

            isLoaded,
            list,
            typeCodeMap,
            codeTypeMap,
            resetData,

            ...loadHooks,
        }
    }
)
