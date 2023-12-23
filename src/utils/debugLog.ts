import {ref, Ref} from "vue";

const debug = true

interface debugLog {
    message: string,
    data?: any
}

export const debugLogs: Ref<debugLog[]> = ref([])

export const debugLog = (message: string, data?: any) => {
    if (debug) {
        debugLogs.value.push({message, data})
        console.log(message, data)
    }
}
