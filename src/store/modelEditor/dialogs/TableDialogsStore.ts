import {useDialogOpenListState} from "@/components/global/dialog/DialogOpenListState.ts";
import {defineStore} from "pinia";
import {GenTableModelInput} from "@/api/__generated/model/static";
import type {TableLoadOptions} from "@/components/pages/ModelEditor/load/loadTableNode.ts";
import {getDefaultTable} from "@/components/business/table/defaultTable.ts";
import {DeepReadonly} from "vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {syncSuperTableNameForTables} from "@/components/pages/ModelEditor/sync/syncSuperTable.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {useModelEditorStore} from "@/store/modelEditor/ModelEditorStore.ts";

const TABLE_CREATE_PREFIX = "[[TABLE_CREATE_PREFIX]]"

export type TableCreateOptions = TableLoadOptions & {
    subGroupName?: string | undefined,
}

export const useTableDialogsStore = defineStore(
    'TableDialogs',
    () => {
        const dialogs = useDialogOpenListState<string, GenTableModelInput>()

        const {MODEL_EDITOR, GRAPH, SELECT} = useModelEditorStore()

        const createOptionsMap = new Map<string, TableCreateOptions>

        const create = (options: TableCreateOptions) => {
            const createKey = TABLE_CREATE_PREFIX + Date.now()
            const table = getDefaultTable()
            if (options.subGroupName !== undefined) {
                table.subGroup = {name: options.subGroupName}
            }
            dialogs.open(createKey, table, {modal: false})
            createOptionsMap.set(createKey, options)
        }

        const created = (createKey: string, table: DeepReadonly<GenTableModelInput>) => {
            const options = createOptionsMap.get(createKey)

            MODEL_EDITOR.startBatchSync('createdTable', () => {
                const node = MODEL_EDITOR.loadInput({
                    tables: [table],
                    baseTableOptions: options
                }).nodes[0]

                createOptionsMap.delete(createKey)

                if (node) {
                    dialogs.close(createKey, true)

                    setTimeout(() => {
                        SELECT.select(node)
                    }, 200)
                }
            })

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        const edit = (id: string, table: DeepReadonly<GenTableModelInput>) => {
            dialogs.open(id, cloneDeepReadonly<GenTableModelInput>(table), {modal: false})
        }

        const edited = (id: string, table: DeepReadonly<GenTableModelInput>) => {
            const graph = GRAPH._graph()

            const cell = graph.getCellById(id)
            if (!cell || !cell.isNode()) {
                sendI18nMessage({
                    key: "MESSAGE_ModelEditorStore_tableEditFail_nodeNotFound",
                    args: [id]
                }, 'error')
                return
            }

            MODEL_EDITOR.startBatchSync('editedTable', () => {
                const oldTable = cell.data.table

                // 当上级表被修改时，调整其他表中的 superTables
                if (oldTable.type === "SUPER_TABLE") {
                    if (table.type === "SUPER_TABLE") {
                        syncSuperTableNameForTables(graph, oldTable.name, table.name)
                    } else {
                        syncSuperTableNameForTables(graph, oldTable.name, undefined)
                    }
                }

                updateTableNodeData(cell, table)
            })

            dialogs.close(id, true)

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        const remove = (id: string) => {
            const graph = GRAPH._graph()

            const cell = graph.getCellById(id)
            if (!cell || !cell.isNode()) {
                sendI18nMessage({
                    key: "MESSAGE_ModelEditorStore_tableDeleteFail_nodeNotFound",
                    args: [id]
                }, 'error')
                return
            }

            MODEL_EDITOR.startBatchSync('removeTable', () => {
                if (cell.shape === TABLE_NODE && cell.data.table) {
                    const table = cell.data.table as GenTableModelInput
                    // 当上级表被删除时，调整其他表中的 superTables
                    if (table.type === "SUPER_TABLE") {
                        syncSuperTableNameForTables(graph, table.name, undefined)
                    }
                }
                graph.removeNode(id)
            })

            MODEL_EDITOR.waitRefreshModelAndCode()
        }

        const submit = (key: string, table: DeepReadonly<GenTableModelInput>) => {
            if (createOptionsMap.has(key)) {
                created(key, table)
            } else {
                edited(key, table)
            }
        }
        
        return {
            ...dialogs,

            create,
            edit,
            submit,
            remove,
        }
    }
)
