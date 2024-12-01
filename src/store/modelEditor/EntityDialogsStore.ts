import {defineStore} from "pinia";
import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {GenEntityDetailView} from "@/api/__generated/model/static";

export const useEntityDialogsStore = defineStore(
    'EntityDialogs',
    () => {
        return {
            ...useDialogOpenListState<number, GenEntityDetailView>()
        }
    }
)