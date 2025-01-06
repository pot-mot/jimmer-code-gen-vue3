import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {defineStore} from "pinia";
import {GenAssociationModelInput} from "@/api/__generated/model/static";

export const useAssociationDialogsStore = defineStore(
    'AssociationDialogs',
    () => {
        return useDialogOpenListState<string, GenAssociationModelInput>()
    }
)

export const ASSOCIATION_CREATE_PREFIX = "[[ASSOCIATION_CREATE_PREFIX]]"
