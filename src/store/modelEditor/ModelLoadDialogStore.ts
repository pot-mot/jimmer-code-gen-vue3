import {defineStore} from "pinia";
import {useDialogOpenState} from "@/components/global/dialog/DialogOpenState.ts";

export const useModelLoadDialogStore = defineStore(
    'ModelLoadDialog', () => {
        return {
            ...useDialogOpenState()
        }
    }
)
