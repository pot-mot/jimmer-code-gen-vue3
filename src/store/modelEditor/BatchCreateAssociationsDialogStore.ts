import {defineStore} from "pinia";
import {ref} from "vue";

export const useBatchCreateAssociationsDialogStore = defineStore(
    'BatchCreateAssociationsDialog',
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
