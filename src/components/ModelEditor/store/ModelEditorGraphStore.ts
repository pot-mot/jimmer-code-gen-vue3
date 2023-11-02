import {defineStore} from "pinia";
import {commonGraphStoreOperations} from "../../../utils/graphEditor/commonStore.ts";

export const useModelEditorGraphStore =
    defineStore(
        'ModelEditorGraph',
        () => {
            const commonStore = commonGraphStoreOperations()

            return {
                ...commonStore,
            }
        }
    )