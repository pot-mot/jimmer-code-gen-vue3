import {useDialogListState} from "@/components/global/dialog/DialogListState.ts";
import {defineStore} from "pinia";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";

export const useEnumModifyDialogsStore = defineStore(
    'EnumModifyDialogs',
    () => {
        return {
            ...useDialogListState<string, GenModelInput_TargetOf_enums>()
        }
    }
)
