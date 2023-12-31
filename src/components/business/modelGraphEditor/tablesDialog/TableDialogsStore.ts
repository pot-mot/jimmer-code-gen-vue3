import {useDialogListState} from "@/components/global/dialog/DialogListState.ts";
import {defineStore} from "pinia";
import {GenTableModelInput} from "@/api/__generated/model/static";

export const useTableDialogsStore = defineStore(
    'TableDialogs',
    () => {
        return {
            ...useDialogListState<string, GenTableModelInput>()
        }
    }
)
