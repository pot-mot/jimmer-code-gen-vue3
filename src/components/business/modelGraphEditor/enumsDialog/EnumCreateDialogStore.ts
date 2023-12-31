import {defineStore} from "pinia";
import {ref} from "vue";

export const useEnumCreateDialogStore = defineStore(
    'EnumCreateDialogs',
    () => {
        const dialogOpenState = ref(false)

        return {
            dialogOpenState,
        }
    }
)
