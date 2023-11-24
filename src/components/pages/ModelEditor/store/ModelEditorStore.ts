import {defineStore} from "pinia";
import {createCommonGraphOperations} from "@/components/business/graphEditor";
import {ModelEditorEventBus} from "../eventBus/ModelEditorEventBus.ts";
import {importModelNodes} from "../graph/node/modelNode.ts";
import {sendMessage} from "@/utils/message.ts";
import {nextTick, ref} from "vue";
import {api} from "@/api";
import {loadModelNodes} from "../graph/node/loadModelNodes.ts";

export const useModelEditorStore =
    defineStore(
        'ModelEditorGraph',
        () => {
            const commonStore = createCommonGraphOperations()

            const {_graph} = commonStore


            const openDataSourceLoadMenu = ref(false)

            commonStore.onLoaded(() => {
                const graph = _graph()
                if (graph) {
                    graph.on('blank:dblclick', ({e}) => {
                        ModelEditorEventBus.emit('createTable', {x: e.offsetX, y: e.offsetY})
                    })
                }
            })

            /**
             * 向画布导入 schema
             * @param id schema id
             */
            const loadSchema = async (id: number) => {
                const graph = _graph()

                const tables = await api.tableService.queryColumnsView({query: {schemaIds: [id]}})

                const {nodes, edges} = await loadModelNodes(graph, tables)

                await nextTick()

                setTimeout(() => {
                    graph.resetSelection([
                        ...nodes.map(it => it.id),
                        ...edges.map(it => it.id)
                    ])

                    commonStore.layoutAndFit()
                }, 500)
            }

            /**
             * 向画布导入 table，如果表已存在则仅更新关联
             * @param id tableId
             */
            const loadTable = async (id: number) => {
                const graph = _graph()
                const tables = await api.tableService.queryColumnsView({query: {ids: [id]}})
                const {nodes} = await loadModelNodes(graph, tables)
                if (nodes.length > 0) {
                    setTimeout(() => {
                        commonStore.focus(nodes[0])
                    }, 200)
                }
            }

            ModelEditorEventBus.on('createdTable', ({table, x, y}) => {
                const graph = commonStore._graph()

                if (!graph) return

                const node = importModelNodes(graph, [table], x, y)[0]

                if (node) {
                    setTimeout(() => {
                        commonStore.select(node)
                    }, 200)
                }
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

                openDataSourceLoadMenu,

                loadSchema,
                loadTable
            }
        }
    )