import {defineStore} from "pinia";
import {commonGraphStoreOperations} from "../../../utils/graphEditor/commonStore.ts";
import {GenAssociationMatchView, GenTableColumnView} from "../../../api/__generated/model/static";
import {ref} from 'vue'

export const useModelEditorGraphStore =
    defineStore(
        'ModelEditorGraph',
        () => {
            const commonStore = commonGraphStoreOperations()

            const tables = ref<GenTableColumnView[]>([])

            const associations = ref<GenAssociationMatchView[]>([])

            return {
                ...commonStore,

                tables,
                associations
            }
        }
    )