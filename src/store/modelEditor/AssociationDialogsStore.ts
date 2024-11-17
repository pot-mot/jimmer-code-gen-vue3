import {useDialogListState} from "@/components/global/dialog/DialogListState.ts";
import {defineStore} from "pinia";
import {GenAssociationModelInput} from "@/api/__generated/model/static";

export const useAssociationDialogsStore = defineStore(
    'AssociationDialogs',
    () => {
        return {
            ...useDialogListState<string, GenAssociationModelInput>()
        }
    }
)

export const ASSOCIATION_CREATE_PREFIX = "[[ASSOCIATION_CREATE_PREFIX]]"
