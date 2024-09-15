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

export const TABLE_CREATE_PREFIX = "TABLE_CREATE_PREFIX"
