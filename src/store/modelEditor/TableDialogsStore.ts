import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {defineStore} from "pinia";
import {GenTableModelInput} from "@/api/__generated/model/static";

export const useTableDialogsStore = defineStore(
    'TableDialogs',
    () => {
        return {
            ...useDialogOpenListState<string, GenTableModelInput>()
        }
    }
)

export const TABLE_CREATE_PREFIX = "[[TABLE_CREATE_PREFIX]]"
