import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {defineStore} from "pinia";
import {GenModelInput_TargetOf_enums} from "@/api/__generated/model/static";

export const useEnumDialogsStore = defineStore(
    'EnumDialogs',
    () => {
        return {
            ...useDialogOpenListState<string, GenModelInput_TargetOf_enums>()
        }
    }
)

export const ENUM_CREATE_PREFIX = "[[ENUM_CREATE_PREFIX]]"
