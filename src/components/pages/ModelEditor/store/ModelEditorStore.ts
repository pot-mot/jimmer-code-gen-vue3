import {
    GraphLoadOperation,
    GraphState,
    useGraph
} from "@/components/global/graphEditor/load/GraphLoadState.ts";
import {ModelEditorEventBus} from "./ModelEditorEventBus.ts";
import {sendMessage} from "@/message/message.ts";
import {computed, ComputedRef, Ref, ref} from "vue";
import {api} from "@/api";
import {loadModelInputs, produceTableViewsToInputs, TableLoadOptions} from "../graph/load/loadData.ts";
import {
    GenAssociationModelInput,
    GenModelInput,
    GenModelInput_TargetOf_enums,
    GenModelView,
    GenTableColumnsView,
    GenTableModelInput, Pair
} from "@/api/__generated/model/static";
import {useGlobalLoadingStore} from "@/components/global/loading/GlobalLoadingStore.ts";
import {loadTableModelInputs} from "@/components/pages/ModelEditor/graph/load/loadTableNode.ts";
import {useGenConfigContextStore} from "@/components/business/genConfig/ContextGenConfigStore.ts";
import {validateGraphData} from "@/shape/GraphData.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {ENUM_CREATE_PREFIX, useEnumDialogsStore} from "@/components/pages/ModelEditor/dialogs/enum/EnumDialogsStore.ts";
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
import {GraphReactiveState} from "@/components/global/graphEditor/data/reactiveState.ts";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";

interface ModelReactiveState {
    tableNodes: ComputedRef<UnwrapRefSimple<Node>[]>,
    tableNodePairs: ComputedRef<Pair<GenTableModelInput, UnwrapRefSimple<Node>>[]>,
    tables: ComputedRef<GenTableModelInput[]>,
    superTables: ComputedRef<GenTableModelInput[]>,
    associationEdges: ComputedRef<UnwrapRefSimple<Edge>[]>,
    associationEdgePairs: ComputedRef<Pair<GenAssociationModelInput, UnwrapRefSimple<Edge>>[]>,
    associations: ComputedRef<GenAssociationModelInput[]>,
    enums: ComputedRef<GenModelInput_TargetOf_enums[]>
}

interface ModelState {
    _model: () => GenModelView
    isLoaded: Ref<boolean>
}

interface ModelLoadOperation {
    loadView: (model: GenModelView) => void,
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
    GRAPH: GraphState & GraphReactiveState
    GRAPH_LOAD: GraphLoadOperation,
    GRAPH_DATA: GraphDataOperation

    MODEL: ModelState & ModelReactiveState,
    MODEL_LOAD: ModelLoadOperation,
    MODEL_DIALOG_STATE: ModelEditDialogState & DataSourceLoadDialogState & ModelLoadDialogState

    SELECT: SelectOperation
    VIEW: ViewOperation
    HISTORY: HistoryOperation
    REMOVE: RemoveOperation
}

export const useModelEditorStore = defineStore(
    'ModelEditor',
    (): ModelEditorStore => {
        const {graphState, graphReactiveState, graphLoadOperation} = useGraph()

        const {_graph} = graphState

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
                            ModelEditorEventBus.emit('removeTable', {id: cell.id})
                        } else if (cell.isEdge() && cell.shape === ASSOCIATION_EDGE) {
                            ModelEditorEventBus.emit('removeAssociation', {id: cell.id})
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

        const graphDataOperation: GraphDataOperation = {
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

        const loadView = (model: GenModelView) => {
            const contextStore = useGenConfigContextStore()

            contextStore.merge(model)

            currentModel.value = model

            isLoaded.value = true

            if (graphState.isLoaded) {
                loadGraphData(model.graphData, true)
            } else {
                graphLoadOperation.onLoaded(() => {
                    loadGraphData(model.graphData, true)
                })
            }
        }

        const modelState: ModelState = {
            _model,
            isLoaded,
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
                loadView(savedModel)

                sendMessage("模型保存成功", "success")
            } catch (e) {
                sendMessage(`模型保存失败，原因：${e}`, 'error', e)
            }

            loadingStore.stop(flag)
        }

        const modelEditDialogState: ModelEditDialogState = {
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

            debugStore.log('LOADING', 'loadTableViews', {tables, associations, nodes, edges})

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

        const modelLoadOperations: ModelLoadOperation = {
            loadView,
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

        const startBatchSync = <T>(name: string, callback: () => T): T => {
            const graph = _graph()

            graph.startBatch(name)
            waitBatches.push(name)

            const result = callback()

            if (syncTableIds.length === 0) {
                let index: number | undefined
                for (let i = waitBatches.length - 1; i >= 0; i--) {
                    if (waitBatches[i] === name) {
                        index = i
                        break
                    }
                }
                if (index === undefined) {
                    throw Error("some waitBatch stopped before it callback end")
                }
                waitBatches.splice(index!, 1)
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
                while (waitBatches.length !== 0) {
                    const name = waitBatches.pop()!
                    graph.stopBatch(name)
                }
            }
        })


        /**
         * 表编辑对话框相关
         */

        const tableDialogsStore = useTableDialogsStore()

        const tableCreateOptionsMap = ref(new Map<string, TableLoadOptions>)

        ModelEditorEventBus.on('createTable', ({options}) => {
            const id = TABLE_CREATE_PREFIX + Date.now()

            tableDialogsStore.open(id, getDefaultTable())
            tableCreateOptionsMap.value.set(id, options)
        })

        ModelEditorEventBus.on('createdTable', ({id, table}) => {
            const graph = _graph()
            if (!graph) return

            const node = loadTableModelInputs(
                graph,
                [table],
                tableCreateOptionsMap.value.get(id)
            ).nodes[0]

            tableCreateOptionsMap.value.delete(id)

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

        ModelEditorEventBus.on('removeTable', ({id}) => {
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

        ModelEditorEventBus.on('removeAssociation', ({id}) => {
            _graph().removeEdge(id)
        })


        /**
         * 枚举编辑对话框相关
         */

        const enumDialogsStore = useEnumDialogsStore()

        ModelEditorEventBus.on('createEnum', () => {
            const id = ENUM_CREATE_PREFIX + Date.now()
            enumDialogsStore.open(id, getDefaultEnum())
        })

        ModelEditorEventBus.on('createdEnum', ({id, genEnum}) => {
            _model().enums.push(genEnum)
            enumDialogsStore.close(id)
        })

        ModelEditorEventBus.on('editEnum', ({id, genEnum}) => {
            enumDialogsStore.open(id, genEnum)
        })

        ModelEditorEventBus.on('editedEnum', ({id, genEnum}) => {
            const currentModel = _model()

            const oldName = id

            currentModel.enums = currentModel.enums.filter(it => it.name !== oldName)
            currentModel.enums.push(genEnum)

            enumDialogsStore.close(id)

            startBatchSync('editedEnum', () => {
                syncEnumNameForTables(_graph(), oldName, genEnum.name)
            })
        })

        ModelEditorEventBus.on('removeEnum', ({id}) => {
            const currentModel = _model()

            const oldName = id

            currentModel.enums = currentModel.enums.filter(it => it.name !== oldName)

            startBatchSync('removeEnum', () => {
                syncEnumNameForTables(_graph(), oldName, undefined)
            })
        })

        const tableNodes = computed(() =>
            graphReactiveState.nodes.value
                .filter(it => it.shape === TABLE_NODE)
        )

        const tableNodePairs = computed(() =>
            tableNodes.value
                .map(it => {return { first: it.data.table, second: it }})
        )

        const tables = computed(() =>
            tableNodes.value
                .map(it => it.data.table)
        )

        const superTables = computed(() =>
            tables.value
                .filter(it => it.type === 'SUPER_TABLE')
        )

        const associationEdges = computed(() =>
            graphReactiveState.edges.value
                .filter(it => it.shape === ASSOCIATION_EDGE && it.data.association)
        )

        const associationEdgePairs = computed(() =>
            associationEdges.value
                .map(it => {return { first: it.getData().association, second: it}})
        )

        const associations = computed(() =>
            associationEdges.value
                .map(it => it.getData().association)
        )

        const enums = computed(() => _model().enums)

        const modelReactiveState: ModelReactiveState = {
            tableNodes,
            tableNodePairs,
            tables,
            superTables,
            associationEdges,
            associationEdgePairs,
            associations,
            enums,
        }

        /**
         * 最终导出
         */
        return {
            GRAPH: {...graphState, ...graphReactiveState},
            GRAPH_LOAD: graphLoadOperation,
            GRAPH_DATA: graphDataOperation,

            MODEL: {...modelState, ...modelReactiveState},
            MODEL_LOAD: modelLoadOperations,
            MODEL_DIALOG_STATE: {
                ...modelEditDialogState,
                dataSourceLoadMenuOpenState,
                modelLoadMenuOpenState,
            },

            SELECT,
            VIEW,
            HISTORY,
            REMOVE,
        }
    }
)
