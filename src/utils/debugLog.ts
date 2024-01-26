import {ref, Ref} from "vue";

interface debugLog {
    message: string,
    data?: any
}

export const debugLogs: Ref<debugLog[]> = ref([])

export const debugLog = (message: string, data?: any) => {
    debugLogs.value.push({message, data})
    console.log(message, data)
}
