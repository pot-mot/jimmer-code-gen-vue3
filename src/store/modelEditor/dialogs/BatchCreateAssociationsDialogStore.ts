import {defineStore} from "pinia";
import {useOpenState} from "@/components/global/dialog/OpenState.ts";

export const useBatchCreateAssociationsDialogStore = defineStore(
    'BatchCreateAssociationsDialog',
    () => {
        return useOpenState()
    }
)
