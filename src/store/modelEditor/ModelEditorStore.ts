import {GraphLoadOperation, GraphState, useGraph} from "@/components/global/graphEditor/load/GraphLoadState.ts";
import {ModelEditorEventBus} from "./ModelEditorEventBus.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {computed, ComputedRef, Ref, ref} from "vue";
import {api} from "@/api";
import {
    loadModelInputs,
    produceTableViewsToInputs,
    TableLoadOptions
} from "@/components/pages/ModelEditor/graph/load/loadData.ts";
import {
    GenAssociationModelInput,
    GenModelInput,
    GenModelInput_TargetOf_enums,
    GenModelView,
    GenTableColumnsView,
    GenTableModelInput,
    Pair
} from "@/api/__generated/model/static";
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import {loadTableModelInputs} from "@/components/pages/ModelEditor/graph/load/loadTableNode.ts";
import {useGenConfigContextStore} from "@/store/config/ContextGenConfigStore.ts";
import {validateGraphData} from "@/shape/GraphData.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {ENUM_CREATE_PREFIX, useEnumDialogsStore} from "@/store/modelEditor/EnumDialogsStore.ts";
import {cloneDeep} from "lodash";
import {getDefaultTable} from "@/components/business/table/defaultTable.ts";
import {getDefaultEnum} from "@/components/business/enum/defaultEnum.ts";
import {TABLE_CREATE_PREFIX, useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts";
import {unStyleAll} from "@/components/pages/ModelEditor/graph/highlight.ts";
import {
    GraphDataOperation,
    GraphEditorData,
    useGraphDataOperation
} from "@/components/global/graphEditor/data/graphData.ts";
import {useDebugStore} from "@/store/debug/debugStore.ts";
import {syncTimeout} from "@/utils/syncTimeout.ts";
import {Edge, Graph, Node} from '@antv/x6';
import {getCenterPoint, useViewOperation, ViewOperation} from "@/components/global/graphEditor/view/viewOperation.ts";
import {syncEnumNameForTables} from "@/components/pages/ModelEditor/sync/syncEnum.ts";
import {syncSuperTableNameForTables} from "@/components/pages/ModelEditor/sync/syncSuperTable.ts";
import {SelectOperation, useSelectOperation} from "@/components/global/graphEditor/selection/selectOperation.ts";
import {HistoryOperation, useHistoryOperations} from "@/components/global/graphEditor/history/useHistory.ts";
import {RemoveOperation, useRemoveOperation} from "@/components/global/graphEditor/remove/removeOperation.ts";
import {ASSOCIATION_CREATE_PREFIX, useAssociationDialogsStore} from "@/store/modelEditor/AssociationDialogsStore.ts";
import {updateAssociationEdgeData} from "@/components/pages/ModelEditor/graph/associationEdge/updateData.ts";
import {GraphReactiveState} from "@/components/global/graphEditor/data/reactiveState.ts";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {defineStore} from "pinia";
import {saveModel} from "@/components/pages/ModelEditor/save/saveModel.ts";
import {loadAssociationModelInputs} from "@/components/pages/ModelEditor/graph/load/loadAssociationEdge.ts";
import {getDefaultAssociation} from "@/components/business/association/defaultColumn.ts";
import {useBatchCreateAssociationsDialogStore} from "@/store/modelEditor/BatchCreateAssociationsDialogStore.ts";

interface ModelReactiveState {
    tableNodes: Readonly<Ref<UnwrapRefSimple<Node>[]>>,
    tableNodePairs: ComputedRef<Pair<GenTableModelInput, UnwrapRefSimple<Node>>[]>,
    tables: ComputedRef<GenTableModelInput[]>,
    superTables: ComputedRef<GenTableModelInput[]>,
    associationEdges: Readonly<Ref<UnwrapRefSimple<Edge>[]>>,
    associationEdgePairs: ComputedRef<Pair<GenAssociationModelInput, UnwrapRefSimple<Edge>>[]>,
    associations: ComputedRef<GenAssociationModelInput[]>,
    enums: ComputedRef<GenModelInput_TargetOf_enums[]>
}

interface ModelState {
    _model: () => GenModelView
    isLoaded: Readonly<Ref<boolean>>
}

interface ModelLoadOperation {
    load: (model: GenModelView) => void
    unload: () => void
    loadModel: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
    loadSchema: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
    loadTable: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
}

interface ModelEditDialogState {
    openState: Ref<boolean>
    handleEdit: () => void
    handleCancel: () => void
    handleSubmit: (model: GenModelInput) => void
}

interface DataSourceLoadDialogState {
    openState: Ref<boolean>,
}

interface ModelLoadDialogState {
    openState: Ref<boolean>,
}

interface ModelEditorStore {
    GRAPH: UnwrapRefSimple<GraphState & GraphReactiveState>

    GRAPH_LOAD: GraphLoadOperation
    GRAPH_DATA: GraphDataOperation

    SELECT: SelectOperation
    VIEW: ViewOperation
    HISTORY: HistoryOperation
    REMOVE: RemoveOperation

    MODEL: UnwrapRefSimple<ModelState & ModelReactiveState>
    MODEL_LOAD: ModelLoadOperation

    MODEL_EDIT_DIALOG: UnwrapRefSimple<ModelEditDialogState>
    DATA_SOURCE_LOAD_DIALOG: UnwrapRefSimple<DataSourceLoadDialogState>
    MODEL_LOAD_DIALOG: UnwrapRefSimple<ModelLoadDialogState>
}

const initModelEditorStore = (): ModelEditorStore => {
    const {graphState, graphReactiveState, graphLoadOperation} = useGraph()

    const {_graph} = graphState

    const baseGraphData = useGraphDataOperation(_graph)

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
            JSON.parse(baseGraphData.getGraphData()) as GraphEditorData
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
            const graph = _graph()
            if (jsonStr && validateGraphData(JSON.parse(jsonStr), e => validateErrors = e)) {
                unStyleAll(graph)
                return baseGraphData.loadGraphData(jsonStr, reset)
            } else {
                graph.removeCells(graph.getCells())
                return {nodes: [], edges: []}
            }
        } catch (e) {
            sendI18nMessage("MESSAGE_ModelEditorStore_graphLoadFail", "error", validateErrors ? validateErrors : {
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
            sendI18nMessage("MESSAGE_ModelEditorStore_modelNotLoad", 'error')
            throw currentModel
        }
        return currentModel.value
    }

    const modelState: ModelState = {
        _model,
        isLoaded,
    }

    const loadingStore = useGlobalLoadingStore()

    const debugStore = useDebugStore()

    const loadModelView = (model: GenModelView) => {
        const contextStore = useGenConfigContextStore()

        contextStore.merge(model)

        currentModel.value = model

        isLoaded.value = true

        if (graphState.isLoaded.value) {
            loadGraphData(model.graphData, true)
        } else {
            graphLoadOperation.onLoaded(() => {
                loadGraphData(model.graphData, true)
            })
        }
    }

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

    const handleSubmit = loadingStore.withLoading(
        'ModelEditorStore.handleSubmitModelEdit',
        async (model: GenModelInput) => {
            try {
                isLoaded.value = false

                const id = await saveModel(model)

                if (id === undefined) {
                    sendI18nMessage("MESSAGE_ModelEditorStore_modelSaveFail_ResultNotFound", 'error')
                    return
                }

                const savedModel = await api.modelService.get({id})

                if (!savedModel) {
                    sendI18nMessage("MESSAGE_ModelEditorStore_modelSaveFail_ResultNotFound", 'error')
                    return
                }

                handleCancel()

                // 同步数据
                loadModelView(savedModel)

                sendI18nMessage("MESSAGE_ModelEditorStore_modelSaveSuccess", "success")
            } catch (e) {
                sendI18nMessage("MESSAGE_ModelEditorStore_modelSaveFail", 'error', e)
            }
        }
    )

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
    const loadModel = loadingStore.withLoading(
        'ModelEditorStore.loadModel',
        async (id: number) => {
            const tables = await api.tableService.queryColumnsView({
                body: {
                    modelIds: [id]
                }
            })
            return await loadTableViews(tables)
        }
    )

    /**
     * 向画布导入 schema
     * @param id schema id
     */
    const loadSchema = loadingStore.withLoading(
        'ModelEditorStore.loadSchema',
        async (id: number) => {
            const tables = await api.tableService.queryColumnsView({
                body: {
                    schemaIds: [id]
                }
            })
            return await loadTableViews(tables)
        }
    )

    /**
     * 向画布导入 table
     * @param id tableId
     */
    const loadTable = loadingStore.withLoading(
        'ModelEditorStore.loadTables',
        async (id: number) => {
            const tables = await api.tableService.queryColumnsView({
                body: {
                    ids: [id]
                }
            })
            return await loadTableViews(tables)
        }
    )

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

    ModelEditorEventBus.on('createdTable', ({createKey, table}) => {
        const graph = _graph()
        if (!graph) return

        const node = loadTableModelInputs(
            graph,
            [table],
            tableCreateOptionsMap.value.get(createKey)
        ).nodes[0]

        tableCreateOptionsMap.value.delete(createKey)

        if (node) {
            tableDialogsStore.close(createKey)

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
            sendI18nMessage({
                key: "MESSAGE_ModelEditorStore_tableEditFail_nodeNotFound",
                args: [id]
            }, 'error')
            return
        }

        tableDialogsStore.close(id)

        startBatchSync('editedTable', () => {
            const oldTable = cell.getData().table

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
    })

    ModelEditorEventBus.on('removeTable', ({id}) => {
        const graph = _graph()

        const cell = graph.getCellById(id)
        if (!cell || !cell.isNode()) {
            sendI18nMessage({
                key: "MESSAGE_ModelEditorStore_tableDeleteFail_nodeNotFound",
                args: [id]
            }, 'error')
            return
        }

        startBatchSync('removeTable', () => {
            if (cell.shape === TABLE_NODE && cell.getData().table) {
                const table = cell.getData().table as GenTableModelInput
                // 当上级表被删除时，调整其他表中的 superTables
                if (table.type === "SUPER_TABLE") {
                    syncSuperTableNameForTables(graph, table.name, undefined)
                }
            }
            graph.removeNode(id)
        })
    })


    /**
     * 关联对话框相关
     */
    const associationDialogsStore = useAssociationDialogsStore()

    ModelEditorEventBus.on('createAssociation', () => {
        const id = ASSOCIATION_CREATE_PREFIX + Date.now()

        associationDialogsStore.open(id, getDefaultAssociation())
    })

    ModelEditorEventBus.on('createdAssociation', ({createKey, association}) => {
        const graph = _graph()
        if (!graph) return

        const edge = loadAssociationModelInputs(
            graph,
            [association],
        ).edges[0]

        if (edge) {
            associationDialogsStore.close(createKey)

            setTimeout(() => {
                SELECT.select(edge)
            }, 200)
        }
    })

    const batchCreateAssociationsDialogStore = useBatchCreateAssociationsDialogStore()

    ModelEditorEventBus.on('batchCreateAssociations', () => {
        batchCreateAssociationsDialogStore.open()
    })

    ModelEditorEventBus.on('batchCreatedAssociations', ({associations}) => {
        const graph = _graph()
        if (!graph) return

        const edges = loadAssociationModelInputs(
            graph,
            associations,
        ).edges

        batchCreateAssociationsDialogStore.close()

        setTimeout(() => {
            SELECT.select(edges)
        }, 200)
    })


    ModelEditorEventBus.on('editAssociation', ({id, association}) => {
        associationDialogsStore.open(id, cloneDeep(association))
    })

    ModelEditorEventBus.on('editedAssociation', ({id, association}) => {
        const graph = _graph()
        if (!graph) return

        const cell = graph.getCellById(id)
        if (!cell || !cell.isEdge()) {
            sendI18nMessage({
                key: "MESSAGE_ModelEditorStore_associationEditFail_edgeNotFound",
                args: [id]
            }, 'error')
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

    const tableNodes = ref<Node[]>([])

    const setTableNodes = () => {
        tableNodes.value = graphReactiveState.nodes.value
            .filter(it => it.shape === TABLE_NODE && it.data && it.data.table)
            .sort((a, b) => {
                if (a.data.table.name < b.data.table.name) return -1
                else return 1
            })
    }

    const addNodeSync = (graph: Graph) => {
        setTableNodes()
        graph.on('node:added', () => setTableNodes())
        graph.on('node:removed', () => setTableNodes())
        graph.on('node:change:data', () => setTableNodes())
    }

    if (graphState.isLoaded.value) {
        addNodeSync(graphState._graph())
    } else graphLoadOperation.onLoaded((graph) => {
        if (!graph) return
        addNodeSync(graph)
    })

    const tableNodePairs = computed(() =>
        tableNodes.value
            .map(it => {
                return {first: it.data.table, second: it}
            })
    )

    const tables = computed(() =>
        tableNodes.value
            .map(it => it.data.table)
    )

    const superTables = computed(() =>
        tables.value
            .filter(it => it.type === 'SUPER_TABLE')
    )

    const associationEdges = ref<Edge[]>([])

    const setAssociationEdges = () => {
        associationEdges.value = graphReactiveState.edges.value
            .filter(it => it.shape === ASSOCIATION_EDGE && it.data && it.data.association)
            .sort((a, b) => {
                if (a.data.association.name < b.data.association.name) return -1
                else return 1
            })
    }

    const addEdgeSync = (graph: Graph) => {
        setAssociationEdges()
        graph.on('edge:added', () => setAssociationEdges())
        graph.on('edge:removed', () => setAssociationEdges())
        graph.on('edge:change:data', () => setAssociationEdges())
    }

    if (graphState.isLoaded.value) {
        addEdgeSync(graphState._graph())
    } else graphLoadOperation.onLoaded((graph) => {
        if (!graph) return
        addEdgeSync(graph)
    })

    const associationEdgePairs = computed(() =>
        associationEdges.value
            .map(it => {
                return {first: it.getData().association, second: it}
            })
    )

    const associations = computed(() =>
        associationEdges.value
            .map(it => it.getData().association)
    )

    const enums = computed(() => {
        return (currentModel.value?.enums ?? []).sort((a, b) => {
            if (a.name > b.name) return -1
            else return 1
        })
    })

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

    const GRAPH = defineStore(
        'GRAPH',
        () => {
            return {...graphState, ...graphReactiveState}
        }
    )()

    const GRAPH_LOAD = graphLoadOperation

    const GRAPH_DATA = graphDataOperation

    const MODEL = defineStore(
        'MODEL',
        () => {
            return {...modelState, ...modelReactiveState}
        }
    )()

    const unload = () => {
        if (GRAPH.isLoaded) {
            GRAPH_LOAD.unload()
        }

        currentModel.value = undefined

        tableNodes.value = []
        associationEdges.value = []

        isLoaded.value = false
    }

    const MODEL_EDIT_DIALOG = defineStore(
        'MODEL_EDIT_DIALOG',
        () => {
            return {
                openState: modelEditDialogOpenState,
                handleEdit,
                handleCancel,
                handleSubmit,
            }
        }
    )()

    const MODEL_LOAD_DIALOG = defineStore(
        'MODEL_LOAD_DIALOG',
        () => {
            const openState = ref(false)

            return {
                openState
            }
        }
    )()

    const DATA_SOURCE_LOAD_DIALOG = defineStore(
        'DATA_SOURCE_LOAD_DIALOG',
        () => {
            const openState = ref(false)

            return {
                openState
            }
        }
    )()

    const modelLoadOperations: ModelLoadOperation = {
        load: loadModelView,
        unload,
        loadModel,
        loadSchema,
        loadTable,
    }

    const MODEL_LOAD = modelLoadOperations

    /**
     * 最终导出
     */
    return {
        GRAPH,
        GRAPH_LOAD,
        GRAPH_DATA,

        MODEL,
        MODEL_LOAD,

        MODEL_EDIT_DIALOG,
        DATA_SOURCE_LOAD_DIALOG,
        MODEL_LOAD_DIALOG,

        SELECT,
        VIEW,
        HISTORY,
        REMOVE,
    }
}

let modelEditorStore: ReturnType<typeof initModelEditorStore> | undefined = undefined

export const useModelEditorStore = () => {
    if (!modelEditorStore) {
        modelEditorStore = initModelEditorStore()
    }
    return modelEditorStore
}
