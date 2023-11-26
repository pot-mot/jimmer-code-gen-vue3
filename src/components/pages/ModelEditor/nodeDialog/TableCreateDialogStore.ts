import {defineStore} from "pinia";
import {ref} from "vue";

export const useTableCreateDialogStore = defineStore(
    'TableCreateDialogs',
    () => {
        const dialogOpenState = ref(false)

        const nodeX = ref(0)

        const nodeY = ref(0)

        return {
            dialogOpenState,
            nodeX,
            nodeY
        }
    }
)