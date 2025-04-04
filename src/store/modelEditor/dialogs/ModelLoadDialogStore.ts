import {defineStore} from "pinia";
import {useOpenState} from "@/components/global/dialog/OpenState.ts";

export const useModelLoadDialogStore = defineStore(
    'ModelLoadDialog', () => {
        return useOpenState()
    }
)
