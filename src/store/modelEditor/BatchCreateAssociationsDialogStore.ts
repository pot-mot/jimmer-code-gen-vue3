import {defineStore} from "pinia";
import {useDialogOpenState} from "@/components/global/dialog/DialogOpenState.ts";

export const useBatchCreateAssociationsDialogStore = defineStore(
    'BatchCreateAssociationsDialog',
    () => {
        return {
            ...useDialogOpenState()
        }
    }
)
