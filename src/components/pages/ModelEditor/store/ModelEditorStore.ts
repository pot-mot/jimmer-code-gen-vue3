import {defineStore} from "pinia";
import {useCommonGraphOperations} from "@/components/business/graphEditor";
import {ModelEditorEventBus} from "./ModelEditorEventBus.ts";
import {importTables} from "../graph/tableNode.ts";
import {sendMessage} from "@/utils/message.ts";
import {computed, nextTick, ref} from "vue";
import {api} from "@/api";
import {loadTables} from "../graph/loadTables.ts";
import {GenModelInput, GenModelView} from "@/api/__generated/model/static";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {
    useTableCreateDialogStore
} from "@/components/business/modelGraphEditor/tableEditDialog/TableCreateDialogStore.ts";
import {
    useTableModifyDialogsStore
} from "@/components/business/modelGraphEditor/tableEditDialog/TableModifyDialogsStore.ts";

export const useModelEditorStore =
    defineStore(
        'ModelEditorGraph',
        () => {
            const commonOperations = useCommonGraphOperations()

            const {_graph} = commonOperations

            commonOperations.onLoaded(() => {
                const graph = _graph()
                if (graph) {
                    graph.on('blank:dblclick', ({e}) => {
                        ModelEditorEventBus.emit('createTable', {x: e.offsetX, y: e.offsetY})
                    })
                }
            })

            const currentModel = ref<GenModelView>()

            const isModelLoaded = computed(() => {
                return !!currentModel.value
            })

            const _currentModel = (): GenModelView => {
                if (!currentModel.value) {
                    sendMessage('当前模型不存在', 'error')
                    throw currentModel
                }
                return currentModel.value
            }


            const loadGraphByJSONStr = (jsonStr: string) => {
                try {
                    commonOperations.loadGraphByJSONStr(jsonStr)
                } catch (e) {
                    sendMessage(`图加载错误: ${e}`, "error", {
                        error: e,
                        jsonStr
                    })
                }
            }

            const loadCurrentModel = (model: GenModelView) => {
                currentModel.value = model

                if (!model.value || model.value.length == 0 || model.value == '{}') {
                    sendMessage('当前模型为空', 'info')
                    return
                }

                if (commonOperations.isLoaded) {
                    loadGraphByJSONStr(model.value)
                } else {
                    commonOperations.onLoaded(() => {
                        loadGraphByJSONStr(model.value)
                    })
                }
            }

            const modelEditDialogOpenState = ref(false)

            const handleEditModel = () => {
                _currentModel().value = commonOperations.toDataJSONStr()
                modelEditDialogOpenState.value = true
            }

            const handleCancelModelEdit = () => {
                modelEditDialogOpenState.value = false
            }

            const handleSubmitModelEdit = async (model: GenModelInput) => {
                const loadingStore = useGlobalLoadingStore()

                loadingStore.add()

                try {
                    if (!model) {
                        sendMessage(`模型保存失败，临时编辑模型不存在`, 'error')
                        return
                    }

                    // 尽可能规避编辑 json value
                    if (model.value && model.value == commonOperations.toDataJSONStr()) {
                        model.value = undefined
                    }

                    const id = await api.modelService.save({body: model})
                    const savedModel = (await api.modelService.get({id}))!

                    if (!savedModel) {
                        sendMessage(`模型保存失败，保存返回模型不存在`, 'error')
                        return
                    }

                    // 同步数据
                    loadCurrentModel(savedModel)

                    handleCancelModelEdit()
                    sendMessage("模型保存成功", "success")
                } catch (e) {
                    sendMessage(`模型保存失败，原因：${e}`, 'error', e)
                }

                loadingStore.sub()
            }

            const dataSourceLoadMenuOpenState = ref(false)

            /**
             * 向画布导入 model
             * @param id model id
             */
            const importModel = async (id: number) => {
                const graph = _graph()

                const tables = await api.tableService.queryColumnsView({query: {modelIds: [id]}})

                const {nodes, edges} = await loadTables(graph, tables)

                await nextTick()

                setTimeout(() => {
                    graph.resetSelection([
                        ...nodes.map(it => it.id),
                        ...edges.map(it => it.id)
                    ])

                    commonOperations.layoutAndFit()
                }, 500)
            }

            /**
             * 向画布导入 schema
             * @param id schema id
             */
            const importSchema = async (id: number) => {
                const graph = _graph()

                const tables = await api.tableService.queryColumnsView({query: {schemaIds: [id]}})

                const {nodes, edges} = await loadTables(graph, tables)

                await nextTick()

                setTimeout(() => {
                    graph.resetSelection([
                        ...nodes.map(it => it.id),
                        ...edges.map(it => it.id)
                    ])

                    commonOperations.layoutAndFit()
                }, 500)
            }

            /**
             * 向画布导入 table，如果表已存在则仅更新关联
             * @param id tableId
             */
            const importTable = async (id: number) => {
                const graph = _graph()
                const tables = await api.tableService.queryColumnsView({query: {ids: [id]}})
                const {nodes} = await loadTables(graph, tables)

                if (nodes.length > 0) {
                    setTimeout(() => {
                        commonOperations.focus(nodes[0])
                    }, 200)
                }
            }

            const modelLoadMenuOpenState = ref(false)

            const createDialogStore = useTableCreateDialogStore()

            ModelEditorEventBus.on('createTable', (props) => {
                createDialogStore.dialogOpenState = true

                if (props) {
                    createDialogStore.nodeX = props.x
                    createDialogStore.nodeY = props.y
                }
            })

            ModelEditorEventBus.on('createdTable', ({table, x, y}) => {
                const graph = commonOperations._graph()

                if (!graph) return

                const node = importTables(graph, [table], x, y).nodes[0]

                if (node) {
                    createDialogStore.dialogOpenState = false

                    setTimeout(() => {
                        commonOperations.select(node)
                    }, 200)
                }
            })


            const modifyDialogStore = useTableModifyDialogsStore()

            ModelEditorEventBus.on('modifyTable', ({id, table}) => {
                modifyDialogStore.open(id, table)
            })

            ModelEditorEventBus.on('modifiedTable', ({id, table}) => {
                const graph = commonOperations._graph()

                if (!graph) return

                const cell = graph.getCellById(id)
                if (cell && cell.isNode()) {
                    cell.setData({wrapper: cell.getData().wrapper, table}, {overwrite: true, deep: true})
                } else {
                    sendMessage(`Node ${id} 找不到，无法被更改`, 'error')
                }
                modifyDialogStore.close(id)
            })

            ModelEditorEventBus.on('removeTable', (id) => {
                const graph = commonOperations._graph()

                if (!graph) return

                graph.removeNode(id)
            })

            ModelEditorEventBus.on('removeAssociation', (id) => {
                const graph = commonOperations._graph()

                if (!graph) return

                graph.removeEdge(id)
            })

            return {
                ...commonOperations,
                loadGraphByJSONStr,

                _currentModel,
                isModelLoaded,
                loadCurrentModel,

                modelEditDialogOpenState,
                handleEditModel,
                handleCancelModelEdit,
                handleSubmitModelEdit,

                dataSourceLoadMenuOpenState,
                modelLoadMenuOpenState,

                loadModel: importModel,
                loadSchema: importSchema,
                loadTable: importTable,
            }
        }
    )
