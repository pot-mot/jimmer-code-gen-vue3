import {createStore} from "@/utils/store/createStore.ts";
import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";

export const useDiagnoseDialog = createStore(() => {
    return {
        ...useDialogOpenState()
    }
})