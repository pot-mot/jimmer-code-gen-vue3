import {defineStore} from "pinia";
import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";

export const useSubGroupDialogsStore = defineStore(
    'SubGroupDialogsStore',
    () => {
        return useDialogOpenListState<string, GenModelInput_TargetOf_subGroups>()
    }
)

export const SUB_GROUP_CREATE_PREFIX = "[[SUB_GROUP_CREATE_PREFIX]]"