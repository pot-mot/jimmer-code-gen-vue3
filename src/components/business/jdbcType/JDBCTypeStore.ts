import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {api} from "@/api";
import {useLoadHooks} from "@/utils/asyncHooks.ts";

export const useJDBCTypeStore = defineStore(
    'JDBCType',
    () => {
        const jdbcTypesState = ref<{[key:string]: number}>()

        const loadHooks = useLoadHooks(() => jdbcTypesState.value)

        const isLoaded = computed(() => {
            return !!jdbcTypesState.value
        })

        const getJDBCTypes = async () => {
            await loadHooks.beforeLoad()

            jdbcTypesState.value = await api.jdbcservice.listType()

            await loadHooks.loaded()

            return jdbcTypesState.value
        }

        const cleanJDBCTypes = async () => {
            await loadHooks.beforeUnload()
            jdbcTypesState.value = undefined
            await loadHooks.unloaded()
        }

        const resetJDBCTypes = async () => {
            await cleanJDBCTypes()
            await getJDBCTypes()
        }

        getJDBCTypes().then()

        const jdbcTypes = computed(() => {
            if (!jdbcTypesState.value) {
                throw "jdbcTypes Not Loaded"
            }
            return jdbcTypesState.value
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
            jdbcTypeList.value.forEach(type => {
                map.set(type.typeCode, type.type)
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
