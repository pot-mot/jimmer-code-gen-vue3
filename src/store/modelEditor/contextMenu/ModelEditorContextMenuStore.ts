import {defineStore} from "pinia";
import {useOpenState} from "@/components/global/dialog/OpenState.ts";

export const useModelEditorContextMenuStore = defineStore(
    'ModelEditorContextMenu',
    () => {
        return useOpenState()
    }
)
