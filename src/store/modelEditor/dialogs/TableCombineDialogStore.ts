import {defineStore} from "pinia";
import {useOpenState} from "@/components/global/dialog/OpenState.ts";

export const useTableCombineDialogStore = defineStore(
    'TableCombineDialog',
    () => {
        return useOpenState()
    }
)
