import {defineStore} from "pinia";
import {useDialogOpenState} from "@/components/global/dialog/DialogOpenState.ts";

export const useTableCombineDialogStore = defineStore(
    'TableCombineDialog',
    () => {
        return useDialogOpenState()
    }
)
