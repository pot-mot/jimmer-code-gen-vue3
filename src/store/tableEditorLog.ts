import {defineStore} from "pinia";
import {Ref, ref} from "vue";

interface TableEditorLog {
    time: Date
    msg: string
    type: string
    level: 'info' | 'warning' | 'error'
}

export const useTableEditorLogStore =
    defineStore(
        'tableEditorLog',
        () => {
            const logs: Ref<TableEditorLog[]> = ref([])

            const push = (input: TableEditorLog) => {
                logs.value.push(input)
            }

            const getLogs = (): TableEditorLog[] => {
                return logs.value
            }

            return {
                push,
                getLogs
            }
        }
    )