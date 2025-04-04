import {defineStore} from "pinia";
import {useOpenState} from "@/components/global/dialog/OpenState.ts";

export const useDataSourceLoadDialogStore = defineStore(
    'DataSourceLoadDialog', () => {
        return useOpenState()
    }
)
