import {GraphLoadState, useGraphLoadState} from "@/components/global/graphEditor/load/GraphLoadState.ts";
import {ModelEditorEventBus} from "./ModelEditorEventBus.ts";
import {sendMessage} from "@/message/message.ts";
import {Ref, ref} from "vue";
import {api} from "@/api";
import {loadModelInputs, produceTableViewsToInputs, TableLoadOptions} from "../graph/loadData.ts";
import {GenModelInput, GenModelView, GenTableColumnsView, GenTableModelInput} from "@/api/__generated/model/static";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {loadTableModelInputs} from "@/components/pages/ModelEditor/graph/tableNode/load.ts";
import {useGenConfigContextStore} from "@/components/business/genConfig/ContextGenConfigStore.ts";
import {validateGraphData} from "@/shape/GraphData.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/business/modelEditor/constant.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {useEnumDialogsStore} from "@/components/pages/ModelEditor/dialogs/enum/EnumDialogsStore.ts";
import {cloneDeep} from "lodash";
import {getDefaultTable} from "@/components/business/table/defaultTable.ts";
import {getDefaultEnum} from "@/components/business/enum/defaultEnum.ts";
import {
    TABLE_CREATE_PREFIX,
    useTableDialogsStore
} from "@/components/pages/ModelEditor/dialogs/table/TableDialogsStore.ts";
import {unStyleAll} from "@/components/pages/ModelEditor/graph/highlight.ts";
import {
    GraphDataOperation,
    GraphEditorData,
    useGraphDataOperation
} from "@/components/global/graphEditor/data/graphData.ts";
import {useDebugStore} from "@/debug/debugStore.ts";
import {syncTimeout} from "@/utils/syncTimeout.ts";
import {Edge, Node} from '@antv/x6';
import {getCenterPoint, useViewOperation, ViewOperation} from "@/components/global/graphEditor/view/viewOperation.ts";
import {syncEnumNameForTables} from "@/components/pages/ModelEditor/sync/syncEnum.ts";
import {syncSuperTableNameForTables} from "@/components/pages/ModelEditor/sync/syncSuperTable.ts";
import {SelectOperation, useSelectOperation} from "@/components/global/graphEditor/selection/selectOperation.ts";
import {HistoryOperation, useHistoryOperations} from "@/components/global/graphEditor/history/useHistory.ts";
import {RemoveOperation, useRemoveOperation} from "@/components/global/graphEditor/remove/removeOperation.ts";
import {defineStore} from "pinia";
import {
    useAssociationDialogsStore
} from "@/components/pages/ModelEditor/dialogs/association/AssociationDialogsStore.ts";
import {updateAssociationEdgeData} from "@/components/pages/ModelEditor/graph/associationEdge/updateData.ts";

interface CurrentModelState {
    _model: () => GenModelView
    isLoaded: Ref<boolean>
    load: (model: GenModelView) => void
}

interface ModelLoadOperation {
    loadModel: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
    loadSchema: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
    loadTable: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
}

interface ModelEditDialogState {
    modelEditDialogOpenState: Ref<boolean>
    handleEdit: () => void
    handleCancel: () => void
    handleSubmit: (model: GenModelInput) => void
}

interface DataSourceLoadDialogState {
    dataSourceLoadMenuOpenState: Ref<boolean>,
}

interface ModelLoadDialogState {
    modelLoadMenuOpenState: Ref<boolean>,
}

export interface ModelEditorStore {
    GRAPH: GraphLoadState

    MODEL: CurrentModelState
    EDIT: ModelEditDialogState
    LOAD: ModelLoadOperation & DataSourceLoadDialogState & ModelLoadDialogState

    SELECT: SelectOperation
    VIEW: ViewOperation
    GRAPH_DATA: GraphDataOperation
    HISTORY: HistoryOperation
    REMOVE: RemoveOperation
}

export const useModelEditorStore = defineStore(
    'ModelEditor',
    (): ModelEditorStore => {
        const GRAPH = useGraphLoadState()

        const {_graph} = GRAPH

        const GRAPH_DATA = useGraphDataOperation(_graph)

        const SELECT = useSelectOperation(_graph)

        const VIEW = useViewOperation(_graph)

        const HISTORY = useHistoryOperations(_graph)

        const REMOVE = useRemoveOperation(
            _graph,
            (_, cells, target) => {
                startBatchSync(target, () => {
                    cells.forEach(cell => {
                        if (cell.isNode() && cell.shape === TABLE_NODE) {
                            ModelEditorEventBus.emit('removeTable', cell.id)
                        } else if (cell.isEdge() && cell.shape === ASSOCIATION_EDGE) {
                            ModelEditorEventBus.emit('removeAssociation', cell.id)
                        }
                    })
                })
            }
        )

        // 在获取数据时调整
        const getGraphData = () => {
            const graphData =
                JSON.parse(GRAPH_DATA.getGraphData()) as GraphEditorData
            graphData.json.cells.forEach(cell => {
                if (cell.shape === TABLE_NODE) {
                    cell.data = {table: cell.data.table}
                }
                if (cell.shape === ASSOCIATION_EDGE) {
                    cell.tools = undefined
                    cell.data = {association: cell.data.association}
                }
            })
            return JSON.stringify(graphData)
        }

        const loadGraphData = (jsonStr: string, reset: boolean = false) => {
            let validateErrors
            try {
                if (jsonStr && validateGraphData(JSON.parse(jsonStr), e => validateErrors = e)) {
                    unStyleAll(_graph())
                    return GRAPH_DATA.loadGraphData(jsonStr, reset)
                } else {
                    const graph = _graph()
                    graph.removeCells(graph.getCells())
                    return {nodes: [], edges: []}
                }
            } catch (e) {
                sendMessage(`图加载错误: ${e}`, "error", validateErrors ? validateErrors : {
                    error: e,
                    jsonStr
                })
                return {nodes: [], edges: []}
            }
        }

        const OVERRIDE_GRAPH_DATA: GraphDataOperation = {
            getGraphData,
            loadGraphData
        }

        const currentModel = ref<GenModelView>()

        const isLoaded = ref(false)

        const _model = (): GenModelView => {
            if (!currentModel.value) {
                sendMessage('当前模型不存在', 'error')
                throw currentModel
            }
            return currentModel.value
        }

        const load = (model: GenModelView) => {
            const contextStore = useGenConfigContextStore()

            contextStore.merge(model)

            currentModel.value = model

            isLoaded.value = true

            if (GRAPH.isLoaded) {
                loadGraphData(model.graphData, true)
            } else {
                GRAPH.onLoaded(() => {
                    loadGraphData(model.graphData, true)
                })
            }
        }

        const MODEL: CurrentModelState = {
            _model,
            isLoaded,
            load,
        }


        const loadingStore = useGlobalLoadingStore()

        const debugStore = useDebugStore()


        /**
         * 模型编辑对话框相关
         */

        const modelEditDialogOpenState = ref(false)

        const handleEdit = () => {
            _model().graphData = getGraphData()
            modelEditDialogOpenState.value = true
        }

        const handleCancel = () => {
            modelEditDialogOpenState.value = false
        }

        const handleSubmit = async (model: GenModelInput) => {
            const flag = loadingStore.start('ModelEditorStore.handleSubmitModelEdit')

            try {
                const id = await api.modelService.save({body: model})

                isLoaded.value = false

                const savedModel = (await api.modelService.get({id}))!

                if (!savedModel) {
                    sendMessage(`模型保存失败，保存返回模型不存在`, 'error')
                    return
                }

                handleCancel()

                // 同步数据
                MODEL.load(savedModel)

                sendMessage("模型保存成功", "success")
            } catch (e) {
                sendMessage(`模型保存失败，原因：${e}`, 'error', e)
            }

            loadingStore.stop(flag)
        }

        const EDIT: ModelEditDialogState = {
            modelEditDialogOpenState,
            handleEdit,
            handleCancel,
            handleSubmit,
        }


        /**
         * 外部数据导入相关
         */

        const dataSourceLoadMenuOpenState = ref(false)

        const modelLoadMenuOpenState = ref(false)

        /**
         * 导入表的基本函数，接收 tableView 并查询获得 association
         */
        const loadTableViews = async (tableViews: GenTableColumnsView[]) => {
            const graph = _graph()

            const {tables, associations} =
                await produceTableViewsToInputs(tableViews)

            const {nodes, edges} =
                loadModelInputs(
                    graph,
                    tables,
                    associations,
                    getCenterPoint(graph)
                )

            debugStore.log('HISTORY', 'loadTableViews', {tables, associations, nodes, edges})

            await syncTimeout(100 + nodes.length * 30 + edges.length * 20)

            if (nodes.length === 1) {
                VIEW.focus(nodes[0])
            } else {
                graph.resetSelection([
                    ...nodes.map(it => it.id),
                    ...edges.map(it => it.id)
                ])
                VIEW.layout()
                VIEW.fit()
            }

            return {nodes, edges}
        }

        /**
         * 向画布导入 model
         * @param id model id
         */
        const loadModel = async (id: number) => {
            const flag = loadingStore.start('ModelEditorStore.loadModel')

            const tables = await api.tableService.queryColumnsView({
                body: {
                    modelIds: [id]
                }
            })
            const res = await loadTableViews(tables)

            loadingStore.stop(flag)

            return res
        }

        /**
         * 向画布导入 schema
         * @param id schema id
         */
        const loadSchema = async (id: number) => {
            const flag = loadingStore.start('ModelEditorStore.loadSchema')

            const tables = await api.tableService.queryColumnsView({
                body: {
                    schemaIds: [id]
                }
            })
            const res = await loadTableViews(tables)

            loadingStore.stop(flag)

            return res
        }

        /**
         * 向画布导入 table
         * @param id tableId
         */
        const loadTable = async (id: number) => {
            const flag = loadingStore.start('ModelEditorStore.loadTables')

            const tables = await api.tableService.queryColumnsView({
                body: {
                    ids: [id]
                }
            })
            const res = await loadTableViews(tables)

            loadingStore.stop(flag)

            return res
        }

        const LOAD = {
            dataSourceLoadMenuOpenState,
            modelLoadMenuOpenState,
            loadModel,
            loadSchema,
            loadTable,
        }

        /**
         * 在 ModelEditorEventBus 发生变更时，记录入 debugStore
         */
        ModelEditorEventBus.on('*', (type, event) => {
            debugStore.log('EVENT', type, event)
        })


        /**
         * 历史记录同步
         */
        const waitBatches: string[] = []

        const startBatchSync = <T> (name: string, callback: () => T): T => {
            const graph = _graph()

            graph.startBatch(name)
            waitBatches.push(name)

            const result = callback()

            if (syncTableIds.length === 0) {
                graph.stopBatch(name)
            }

            return result
        }

        let syncTableIds: string[] = []

        ModelEditorEventBus.on('syncTable', ({id}) => {
            syncTableIds.push(id)
        })

        ModelEditorEventBus.on('syncedTable', ({id}) => {
            const graph = _graph()
            if (!graph) return

            const index = syncTableIds.indexOf(id)
            syncTableIds.splice(index, 1)

            if (syncTableIds.length === 0) {
                while(waitBatches.length !== 0) {
                    const name = waitBatches.pop()!
                    graph.stopBatch(name)
                }
            }
        })


        /**
         * 表编辑对话框相关
         */

        const tableDialogsStore = useTableDialogsStore()

        const tableCreateOption = ref<TableLoadOptions>()

        ModelEditorEventBus.on('createTable', (option) => {
            tableDialogsStore.open(TABLE_CREATE_PREFIX + Date.now(), getDefaultTable())
            tableCreateOption.value = option
        })

        ModelEditorEventBus.on('createdTable', ({id, table}) => {
            const graph = _graph()
            if (!graph) return

            const node = loadTableModelInputs(
                graph,
                [table],
                tableCreateOption.value
            ).nodes[0]

            tableCreateOption.value = undefined

            if (node) {
                tableDialogsStore.close(id)

                setTimeout(() => {
                    SELECT.select(node)
                }, 200)
            }
        })

        ModelEditorEventBus.on('editTable', ({id, table}) => {
            tableDialogsStore.open(id, cloneDeep(table))
        })

        ModelEditorEventBus.on('editedTable', ({id, table}) => {
            const graph = _graph()
            if (!graph) return

            const cell = graph.getCellById(id)
            if (!cell || !cell.isNode()) {
                sendMessage(`更改节点【${id}】失败，无法被找到`, 'error')
                return
            }

            tableDialogsStore.close(id)

            startBatchSync('editedTable', () => {
                const oldTable = cell.getData().table

                // 当高级表被修改时，调整其他表中的 superTables
                if (oldTable.type === "SUPER_TABLE") {
                    if (table.type === "SUPER_TABLE") {
                        syncSuperTableNameForTables(graph, oldTable.name, table.name)
                    } else {
                        syncSuperTableNameForTables(graph, oldTable.name, undefined)
                    }
                }

                updateTableNodeData(cell, table)
            })
        })

        ModelEditorEventBus.on('removeTable', (id) => {
            const graph = _graph()

            const cell = graph.getCellById(id)
            if (!cell || !cell.isNode()) {
                sendMessage(`删除节点【${id}】失败，节点不存在或目标不是节点`, 'error')
                return
            }

            startBatchSync('removeTable', () => {
                if (cell.shape === TABLE_NODE && cell.getData().table) {
                    const table = cell.getData().table as GenTableModelInput
                    // 当高级表被删除时，调整其他表中的 superTables
                    if (table.type === "SUPER_TABLE") {
                        syncSuperTableNameForTables(graph, table.name, undefined)
                    }
                }
                graph.removeNode(id)
            })
        })


        /**
         * 关联编辑对话框相关
         */
        const associationDialogsStore = useAssociationDialogsStore()

        ModelEditorEventBus.on('editAssociation', ({id, association}) => {
            associationDialogsStore.open(id, cloneDeep(association))
        })

        ModelEditorEventBus.on('editedAssociation', ({id, association}) => {
            const graph = _graph()
            if (!graph) return

            const cell = graph.getCellById(id)
            if (!cell || !cell.isEdge()) {
                sendMessage(`更改边【${id}】失败，无法被找到`, 'error')
            } else {
                graph.startBatch(`editAssociation [id=${id}]`)

                updateAssociationEdgeData(cell, association)

                graph.stopBatch(`editAssociation [id=${id}]`)
            }

            associationDialogsStore.close(id)
        })

        ModelEditorEventBus.on('modifyAssociation', ({id}) => {
            const graph = _graph()
            if (!graph) return
            graph.startBatch(`modifyAssociation [id=${id}]`)
        })

        ModelEditorEventBus.on('modifiedAssociation', ({id}) => {
            const graph = _graph()
            if (!graph) return
            graph.stopBatch(`modifyAssociation [id=${id}]`)
        })

        ModelEditorEventBus.on('removeAssociation', (id) => {
            _graph().removeEdge(id)
        })


        /**
         * 枚举编辑对话框相关
         */

        const enumDialogsStore = useEnumDialogsStore()

        ModelEditorEventBus.on('createEnum', () => {
            enumDialogsStore.open("", getDefaultEnum())
        })

        ModelEditorEventBus.on('createdEnum', (genEnum) => {
            _model().enums.push(genEnum)
            enumDialogsStore.close("")
        })

        ModelEditorEventBus.on('editEnum', ({name, genEnum}) => {
            enumDialogsStore.open(name, cloneDeep(genEnum))
        })

        ModelEditorEventBus.on('editedEnum', ({name, genEnum}) => {
            const currentModel = _model()

            currentModel.enums = currentModel.enums.filter(it => it.name !== name)
            currentModel.enums.push(genEnum)

            enumDialogsStore.close(name)

            startBatchSync('editedEnum', () => {
                syncEnumNameForTables(_graph(), name, genEnum.name)
            })
        })

        ModelEditorEventBus.on('removeEnum', (name) => {
            const currentModel = _model()

            currentModel.enums = currentModel.enums.filter(it => it.name !== name)

            startBatchSync('removeEnum', () => {
                syncEnumNameForTables(_graph(), name, undefined)
            })
        })

        /**
         * 最终导出
         */
        return {
            GRAPH,

            GRAPH_DATA: OVERRIDE_GRAPH_DATA,

            SELECT,
            VIEW,
            HISTORY,
            REMOVE,

            MODEL,
            EDIT,
            LOAD
        }
    }
)
