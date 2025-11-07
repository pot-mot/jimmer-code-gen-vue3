import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";
import {createStore} from "@/utils/store/createStore.ts";

export const useModelEditDialog = createStore(() => {
    return {
        ...useDialogOpenState(),
    }
})
