import {defineStore} from "pinia";
import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {EntityFormType} from "@/components/business/entity/EntityFormType.ts";

export const useEntityDialogsStore = defineStore(
    'EntityDialogs',
    () => {
        return useDialogOpenListState<number, EntityFormType>()
    }
)