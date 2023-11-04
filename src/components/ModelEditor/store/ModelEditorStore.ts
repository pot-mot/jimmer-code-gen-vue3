import {defineStore} from "pinia";
import {commonGraphStoreOperations} from "../../../utils/graphEditor/commonStore.ts";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {addModelNode} from "../node/modelNode.ts";
import {sendMessage} from "../../../utils/message.ts";

export const useModelEditorStore =
    defineStore(
        'ModelEditorGraph',
        () => {
            const commonStore = commonGraphStoreOperations()

            ModelEditorEventBus.on('createdTable', (table) => {
                const graph = commonStore._graph()

                if (!graph) return

                addModelNode(graph, table)
            })

            ModelEditorEventBus.on('modifiedTable', ({id, table}) => {
                const graph = commonStore._graph()

                if (!graph) return

                const cell = graph.getCellById(id)
                if (cell && cell.isNode()) {
                    cell.setData({...cell.getData(), table}, {overwrite: true, deep: true})
                } else {
                    sendMessage(`Node ${id} 找不到，无法被更改`, 'error')
                }
                ModelEditorEventBus.emit('closeModifiedTable', id)
            })

            ModelEditorEventBus.on('removeTable', (id) => {
                const graph = commonStore._graph()

                if (!graph) return

                graph.removeNode(id)
            })

            ModelEditorEventBus.on('removeAssociation', (id) => {
                const graph = commonStore._graph()

                if (!graph) return

                graph.removeEdge(id)
            })

            return {
                ...commonStore,
            }
        }
    )