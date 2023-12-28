import {defineStore} from "pinia";
import {useCommonGraphOperations} from "@/components/business/graphEditor";
import {ModelEditorEventBus} from "./ModelEditorEventBus.ts";
import {sendMessage} from "@/utils/message.ts";
import {computed, nextTick, ref} from "vue";
import {api} from "@/api";
import {loadByTableViews} from "../graph/loadData.ts";
import {GenModelInput, GenModelView, GenTableColumnsView} from "@/api/__generated/model/static";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {
    useTableCreateDialogStore
} from "@/components/business/modelGraphEditor/tableEditDialog/TableCreateDialogStore.ts";
import {
    useTableModifyDialogsStore
} from "@/components/business/modelGraphEditor/tableEditDialog/TableModifyDialogsStore.ts";
import {importTables} from "@/components/pages/ModelEditor/graph/tableNode.ts";
import {useGenContextStore} from "@/components/business/context/GenContextStore.ts";

export const useModelEditorStore =
    defineStore(
        'ModelEditorGraph',
        () => {
            const commonOperations = useCommonGraphOperations()

            const {_graph} = commonOperations

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
                const contextStore = useGenContextStore()

                contextStore.dataSourceType = model.dataSourceType
                contextStore.language = model.language
                contextStore.packagePath = model.packagePath

                currentModel.value = model

                if (!model.graphData || model.graphData.length == 0) {
                    sendMessage('当前模型为空', 'info')
                    return
                }

                if (commonOperations.isLoaded) {
                    loadGraphByJSONStr(model.graphData)
                } else {
                    commonOperations.onLoaded(() => {
                        loadGraphByJSONStr(model.graphData)
                    })
                }
            }

            const modelEditDialogOpenState = ref(false)

            const handleEditModel = () => {
                _currentModel().graphData = commonOperations.toDataJSONStr()
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
                const tables = await api.tableService.queryColumnsView({query: {modelIds: [id]}})
                await importTableIntoGraph(tables)
            }

            /**
             * 向画布导入 schema
             * @param id schema id
             */
            const importSchema = async (id: number) => {
                const tables = await api.tableService.queryColumnsView({query: {schemaIds: [id]}})
                await importTableIntoGraph(tables)
            }

            /**
             * 向画布导入 table，如果表已存在则仅更新关联
             * @param id tableId
             */
            const importTable = async (id: number) => {
                const tables = await api.tableService.queryColumnsView({query: {ids: [id]}})
                await importTableIntoGraph(tables)
            }

            const importTableIntoGraph = async (tables: GenTableColumnsView[]) => {
                const graph = _graph()

                const {nodes, edges} = await loadByTableViews(graph, tables)

                await nextTick()

                setTimeout(() => {
                    if (nodes.length == 1) {
                        commonOperations.focus(nodes[0])
                    } else {
                        graph.resetSelection([...nodes, ...edges])
                        commonOperations.layoutAndFit()
                    }
                }, 200)
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
                    cell.setData({wrapper: cell.getData().wrapper, table}, {deep: true})
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

                importTableIntoGraph,
                importModel,
                importSchema,
                importTable,
            }
        }
    )
