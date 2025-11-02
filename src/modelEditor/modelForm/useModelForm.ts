import {useDialogOpenState} from "@/components/dialog/DialogOpenState.ts";

export const useModelForm = () => {
    return {
        ...useDialogOpenState(),
    }
}