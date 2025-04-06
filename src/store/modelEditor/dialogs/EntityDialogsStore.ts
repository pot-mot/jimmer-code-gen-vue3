import {defineStore} from "pinia";
import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {EntityConfigInput, EntityConfigView} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {api} from "@/api";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

export const useEntityDialogsStore = defineStore(
    'EntityDialogs',
    () => {
        const dialogs = useDialogOpenListState<number, EntityConfigView>()

        const {MODEL_EDITOR} = useModelEditorStore()

        const edit = (entity: DeepReadonly<EntityConfigView>) => {
            dialogs.open(entity.tableConvertedEntity.id, cloneDeepReadonly<EntityConfigView>(entity))
        }

        const edited = async (entity: DeepReadonly<EntityConfigInput>) => {
            await api.entityService.config({body: cloneDeepReadonly<EntityConfigInput>(entity)})
            dialogs.close(entity.tableConvertedEntity.id, true)

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        return {
            ...dialogs,
            edit,
            edited,
        }
    }
)