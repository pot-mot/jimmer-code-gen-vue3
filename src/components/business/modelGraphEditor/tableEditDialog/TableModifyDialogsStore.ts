import {useDialogListState} from "@/components/global/dialog/DialogListState.ts";
import {defineStore} from "pinia";
import {GenTableColumnsInput} from "@/api/__generated/model/static";

export const useTableModifyDialogsStore = defineStore(
    'TableModifyDialogs',
    () => {
        return {
            ...useDialogListState<string, GenTableColumnsInput>()
        }
    }
)