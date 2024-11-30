import {computed, Ref, ref} from "vue";
import {defineStore} from "pinia";

export const DEBUG_CONSTANTS = [
    'LOADING',
    'MESSAGE',
    'HISTORY',
] as const

export type DebugType = typeof DEBUG_CONSTANTS[number]

interface DebugLog {
    type: DebugType,
    message: string,
    timestamp: number,
    data?: any,
}

export const useDebugStore = defineStore(
    'DebugStore',
    () => {
        const collectTypes: Ref<DebugType[]> = ref([
            'MESSAGE',
            'LOADING',
            'HISTORY',
        ])

        const outputTypes: Ref<DebugType[]> = ref([
            'HISTORY',
        ])

        const filterTypes: Ref<DebugType[]> = ref([
            'HISTORY',
        ])

        const debugLogs: Ref<DebugLog[]> = ref([])

        const filteredLogs = computed(() => {
            return debugLogs.value.filter(it => filterTypes.value.includes(it.type))
        })

        const log = (type: DebugType, message: string, data?: any) => {
            if (collectTypes.value.includes(type)) {
                const timestamp = Date.now()
                debugLogs.value.push({type, message, timestamp, data})
            }

            if (outputTypes.value.includes(type)) {
                console.log(message, data)
            }
        }

        const cleanLogs = () => {
            debugLogs.value = []
        }

        return {
            debugLogs,

            log,
            cleanLogs,

            collectTypes,
            outputTypes,

            filterTypes,
            filteredLogs,
        }
    }
)
