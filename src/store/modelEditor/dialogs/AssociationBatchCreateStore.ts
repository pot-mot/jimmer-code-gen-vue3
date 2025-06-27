import {defineStore} from "pinia";
import {useOpenState} from "@/components/global/dialog/OpenState.ts";
import {DeepReadonly} from "vue";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

export const useAssociationBatchCreateStore = defineStore(
    'AssociationBatchCreate',
    () => {
        const dialogState = useOpenState()

        const {MODEL_EDITOR, GRAPH, SELECT} = useModelEditorStore()

        const submit = async (associations: DeepReadonly<GenAssociationModelInput[]>) => {
            const graph = GRAPH._graph()

            graph.startBatch("batchCreatedAssociations")

            const {edges} = MODEL_EDITOR.loadInput({
                associations
            })

            dialogState.close()

            graph.stopBatch("batchCreatedAssociations")

            setTimeout(() => {
                SELECT.select(edges)
            }, 200)

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        return {
            ...dialogState,
            submit,
        }
    }
)
