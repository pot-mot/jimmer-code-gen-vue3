import {defineStore} from "pinia";
import {useDialogOpenState} from "@/components/global/dialog/DialogOpenState.ts";
import {DeepReadonly} from "vue";
import {GraphData} from "@/components/global/graphEditor/data/graphData.ts";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {api} from "@/api";
import {MODEL_VALID_NOT_PASS, saveModel} from "@/components/pages/ModelEditor/save/saveModel.ts";
import {GenModelInput} from "@/api/__generated/model/static";
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";

export const useModelEditDialogStore = defineStore(
    'ModelEditDialog', () => {
        const dialogState = useDialogOpenState()

        const loadingStore = useGlobalLoadingStore()

        const {MODEL, MODEL_LOAD, MODEL_EDITOR} = useModelEditorStore()

        // 在获取数据时调整
        const getClearGraphData = (): DeepReadonly<GraphData> => {
            const graphData = cloneDeepReadonly<GraphData>(MODEL_EDITOR.getGraphData())

            graphData.json.cells.forEach(cell => {
                if (cell.shape === TABLE_NODE) {
                    cell.data = {table: cell.data.table}
                }
                if (cell.shape === ASSOCIATION_EDGE) {
                    cell.tools = undefined
                    cell.data = {association: cell.data.association}
                }
            })
            return graphData
        }

        const handleEdit = () => {
            MODEL._model().graphData = JSON.stringify(getClearGraphData())
            dialogState.open()
        }

        const handleCancel = () => {
            dialogState.close()
        }

        const handleSubmit = loadingStore.withLoading(
            'ModelEditorStore.handleSubmitModelEdit',
            async (model: GenModelInput) => {
                try {
                    MODEL.isLoaded = false

                    const id = await saveModel(model)

                    const savedModel = await api.modelService.get({id})

                    if (!savedModel) {
                        sendI18nMessage("MESSAGE_ModelEditorStore_modelSaveFail_ResultNotFound", 'error')
                        return
                    }

                    handleCancel()

                    // 同步数据
                    MODEL_LOAD.load(savedModel)

                    sendI18nMessage("MESSAGE_ModelEditorStore_modelSaveSuccess", "success")
                } catch (e) {
                    if (e === MODEL_VALID_NOT_PASS) return

                    sendI18nMessage("MESSAGE_ModelEditorStore_modelSaveFail", 'error', e)
                }
            }
        )

        return {
            ...dialogState,
            handleEdit,
            handleCancel,
            handleSubmit,
        }
    }
)
