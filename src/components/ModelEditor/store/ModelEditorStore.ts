import {defineStore} from "pinia";
import {commonGraphStoreOperations} from "../../../utils/graphEditor/commonStore.ts";

export const useModelEditorStore =
    defineStore(
        'ModelEditorGraph',
        () => {
            const commonStore = commonGraphStoreOperations()

            return {
                ...commonStore,
            }
        }
    )