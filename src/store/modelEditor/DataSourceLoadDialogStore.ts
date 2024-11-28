import {defineStore} from "pinia";
import {useDialogOpenState} from "@/components/global/dialog/DialogOpenState.ts";

export const useDataSourceLoadDialogStore = defineStore(
    'DataSourceLoadDialog', () => {
        return {
            ...useDialogOpenState()
        }
    }
)
