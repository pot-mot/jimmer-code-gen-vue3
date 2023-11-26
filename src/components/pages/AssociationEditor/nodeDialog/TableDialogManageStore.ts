import {useDialogListState} from "@/components/global/dialog/DialogListState.ts";
import {defineStore} from "pinia";

export const useTableDialogsStore = defineStore(
    'TableDialogs',
    () => {
        return {
            ...useDialogListState<number, any>()
        }
    }
)