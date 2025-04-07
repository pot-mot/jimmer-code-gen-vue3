import {defineStore} from "pinia";
import {useOpenState} from "@/components/global/dialog/OpenState.ts";
import {DeepReadonly, ref} from "vue";
import type {TableLoadOptions} from "@/components/pages/ModelEditor/load/loadTableNode.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";
import {TableCombineData} from "@/components/business/table/TableCombineData.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";

export const useTableCombineDialogStore = defineStore(
    'TableCombineDialog',
    () => {
        const dialogState = useOpenState()

        const tableCombineOptions = ref<TableLoadOptions>()

        const {MODEL_EDITOR, VIEW} = useModelEditorStore()

        const open = (options: TableLoadOptions) => {
            tableCombineOptions.value = options
            dialogState.open()
        }

        const submit = (tableCombineData: DeepReadonly<TableCombineData>) => {
            const {superTable, inheritTableNodePairs} = tableCombineData

            MODEL_EDITOR.startBatchSync("combinedTable", async () => {
                const node = MODEL_EDITOR.loadInput({
                    tables: [superTable],
                    baseTableOptions: tableCombineOptions.value
                }).nodes[0]

                if (node) {
                    for (const {first, second} of inheritTableNodePairs) {
                        updateTableNodeData(second, first)
                    }

                    dialogState.close()

                    setTimeout(() => {
                        VIEW.focus(node)
                    }, 200)
                }
            }).then()

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        return {
            ...dialogState,
            open,
            submit
        }
    }
)
