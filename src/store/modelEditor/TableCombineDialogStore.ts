import {defineStore} from "pinia";
import {ref} from "vue";

export const useTableCombineDialogStore = defineStore(
    'TableCombineDialog',
    () => {
        const openState = ref<boolean>(false)

        const open = () => {
            openState.value = true
        }

        const close = () => {
            openState.value = false
        }

        return {
            openState,
            open,
            close,
        }
    }
)
