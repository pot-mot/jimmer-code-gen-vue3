import {GraphLoadOperation, GraphState, useGraph} from "@/components/global/graphEditor/load/GraphLoadState.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {computed, ComputedRef, DeepReadonly, Ref, ref, watch} from "vue";
import {api} from "@/api";
import {
    loadModelInputs,
    produceTableViewsToInputs,
    TableLoadOptions
} from "@/components/pages/ModelEditor/graph/load/loadData.ts";
import {
    GenAssociationModelInput,
    GenModelInput_TargetOf_enums,
    GenModelView,
    GenTableColumnsView,
    GenTableModelInput,
    Pair
} from "@/api/__generated/model/static";
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import {loadTableModelInputs} from "@/components/pages/ModelEditor/graph/load/loadTableNode.ts";
import {useGenConfigContextStore} from "@/store/config/ContextGenConfigStore.ts";
import {ModelEditorData, validateModelEditorData} from "@/shape/ModelEditorData.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {ENUM_CREATE_PREFIX, useEnumDialogsStore} from "@/store/modelEditor/EnumDialogsStore.ts";
import {getDefaultTable} from "@/components/business/table/defaultTable.ts";
import {getDefaultEnum} from "@/components/business/enum/defaultEnum.ts";
import {TABLE_CREATE_PREFIX, useTableDialogsStore} from "@/store/modelEditor/TableDialogsStore.ts";
import {unStyleAll} from "@/components/pages/ModelEditor/graph/highlight.ts";
import {GraphData, useGraphDataOperation} from "@/components/global/graphEditor/data/graphData.ts";
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
import {loadAssociationModelInputs} from "@/components/pages/ModelEditor/graph/load/loadAssociationEdge.ts";
import {getDefaultAssociation} from "@/components/business/association/defaultColumn.ts";
import {useBatchCreateAssociationsDialogStore} from "@/store/modelEditor/BatchCreateAssociationsDialogStore.ts";
import {useTableCombineDialogStore} from "@/store/modelEditor/TableCombineDialogStore.ts";
import {TableCombineData} from "@/components/business/table/TableCombineData.ts";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {useEntityDialogsStore} from "@/store/modelEditor/EntityDialogsStore.ts";
import {useDataSourceLoadDialogStore} from "@/store/modelEditor/DataSourceLoadDialogStore.ts";
import {useModelEditDialogStore} from "@/store/modelEditor/ModelEditDialogStore.ts";
import {useModelLoadDialogStore} from "@/store/modelEditor/ModelLoadDialogStore.ts";
import {useMultiCodePreviewStore} from "@/store/modelEditor/MultiCodePreviewStore.ts";

type ModelReactiveState = {
    tableNodes: DeepReadonly<Ref<Array<UnwrapRefSimple<Node>>>>,
    tableNodePairs: ComputedRef<Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>>,
    tables: ComputedRef<Array<GenTableModelInput>>,
    superTables: ComputedRef<Array<GenTableModelInput>>,
    selectedTables: ComputedRef<Array<GenTableModelInput>>,
    selectedTableNodePairs: ComputedRef<Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>>,
    associationEdges: DeepReadonly<Ref<Array<UnwrapRefSimple<Edge>>>>,
    associationEdgePairs: ComputedRef<Array<Pair<GenAssociationModelInput, UnwrapRefSimple<Edge>>>>,
    associations: ComputedRef<Array<GenAssociationModelInput>>,
    selectedAssociations: ComputedRef<Array<GenAssociationModelInput>>,
    selectedAssociationEdgePairs: ComputedRef<Array<Pair<GenAssociationModelInput, UnwrapRefSimple<Edge>>>>,
    enums: ComputedRef<Array<GenModelInput_TargetOf_enums>>
}

type ModelState = {
    _model: () => GenModelView
    isLoaded: Ref<boolean>
}

type ModelLoadOperation = {
    load: (model: GenModelView) => void
    unload: () => void
    loadModel: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
    loadSchema: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
    loadTable: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
}

type ModelEditorDataOperation = {
    getGraphData: () => DeepReadonly<GraphData>,
    loadModelEditorData: (modelEditorData: DeepReadonly<ModelEditorData>, reset: boolean) => {
        nodes: Node[],
        edges: Edge[]
    },
}

type SyncTableOperation = {
    syncTable: (id: string) => void,
    syncedTable: (id: string) => void,
}

type TableEditOperation = {
    createTable: (options: DeepReadonly<TableLoadOptions>) => void,
    createdTable: (createKey: string, table: DeepReadonly<GenTableModelInput>) => void,

    editTable: (id: string, table: DeepReadonly<GenTableModelInput>) => void,
    editedTable: (id: string, table: DeepReadonly<GenTableModelInput>) => void,

    removeTable: (id: string) => void,

    combineTable: (options: TableLoadOptions) => void,
    combinedTable: (tableCombineData: DeepReadonly<TableCombineData>) => void,
}

type AssociationEditOperation = {
    createAssociation: () => void,
    createdAssociation: (createKey: string, association: DeepReadonly<GenAssociationModelInput>) => void,

    batchCreateAssociations: () => void,
    batchCreatedAssociations: (associations: DeepReadonly<GenAssociationModelInput[]>) => void,

    editAssociation: (id: string, association: DeepReadonly<GenAssociationModelInput>) => void,
    editedAssociation: (id: string, association: DeepReadonly<GenAssociationModelInput>) => void,

    modifyAssociation: (id: string, modifyAction: () => any) => void,

    removeAssociation: (id: string) => void,
}

export type EnumCreateOptions = {
    tableDialogId: string,
    columnName: string,
}

type EnumEditOperation = {
    createEnum: (options?: EnumCreateOptions | undefined) => void,
    createdEnum: (createKey: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => void,

    editEnum: (id: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => void,
    editedEnum: (id: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => void,

    removeEnum: (id: string) => void,
}

type ModelSyncState = {
    waitSyncHistoryBatches: Ref<string[]>,
    waitSyncTableIds: Ref<string[]>
}

type ModelEditorStore = {
    GRAPH: UnwrapRefSimple<GraphState & GraphReactiveState & GraphLoadOperation>

    SELECT: SelectOperation
    VIEW: ViewOperation
    HISTORY: HistoryOperation
    REMOVE: RemoveOperation

    MODEL: UnwrapRefSimple<ModelState & ModelReactiveState>
    MODEL_LOAD: ModelLoadOperation

    MODEL_EDITOR: ModelEditorDataOperation
        & ModelSyncState
        & SyncTableOperation
        & TableEditOperation
        & AssociationEditOperation
        & EnumEditOperation
}

const initModelEditorStore = (): ModelEditorStore => {
    const {graphState, graphReactiveState, graphLoadOperation} = useGraph()

    const {_graph} = graphState

    const graphDataOperation = useGraphDataOperation(_graph)

    const SELECT = useSelectOperation(_graph)

    const VIEW = useViewOperation(_graph)

    const HISTORY = useHistoryOperations(_graph)

    const REMOVE = useRemoveOperation(
        _graph,
        (_, cells, target) => {
            startBatchSync(target, () => {
                cells.forEach(cell => {
                    if (cell.isNode() && cell.shape === TABLE_NODE) {
                        removeTable(cell.id)
                    } else if (cell.isEdge() && cell.shape === ASSOCIATION_EDGE) {
                        removeAssociation(cell.id)
                    }
                })
            })
        }
    )

    const loadModelEditorData = (modelEditorData: DeepReadonly<ModelEditorData>, reset: boolean = false) => {
        let validateErrors
        try {
            const graph = _graph()
            if (modelEditorData && validateModelEditorData(modelEditorData, e => validateErrors = e)) {
                unStyleAll(graph)
                return graphDataOperation.loadGraphData(modelEditorData, reset)
            } else {
                graph.removeCells(graph.getCells())
                return {nodes: [], edges: []}
            }
        } catch (e) {
            sendI18nMessage("MESSAGE_ModelEditorStore_graphLoadFail", "error", validateErrors ? validateErrors : {
                error: e,
                graphData: modelEditorData
            })
            return {nodes: [], edges: []}
        }
    }

    const modelGraphDataOperation: ModelEditorDataOperation = {
        getGraphData: graphDataOperation.getGraphData,
        loadModelEditorData,
    }

    const currentModel = ref<GenModelView>()

    const isLoaded = ref(false)

    const assertModel = (): Ref<GenModelView> => {
        if (currentModel.value === undefined) {
            sendI18nMessage("MESSAGE_ModelEditorStore_modelNotLoad", 'error')
            throw new Error("Model not load")
        }
        return currentModel as Ref<GenModelView>
    }

    const modelState: ModelState = {
        _model: (): GenModelView => {
            return assertModel().value
        },
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
            loadModelEditorData(JSON.parse(model.graphData), true)
        } else {
            graphLoadOperation.onLoaded(() => {
                loadModelEditorData(JSON.parse(model.graphData), true)
            })
        }
    }


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
     * 历史记录同步
     * TODO syncTableEffect
     * 由于 antV/X6 data 的变更到页面 cells 的实际更新异步，且无法通过 nextTick 等待，
     * 所以涉及到“存在待同步节点并需要记录使历史栈完整”的情况需要与 TableNode.vue 组件的 syncTableEffect 配合，
     * 通过 startBatchSync 将未同步完毕的 historyBatch 计入 waitSyncHistoryBatches，并在此后通过 syncTable 收集需要同步的 tableId 计入 waitSyncTableIds
     * 此后当 syncedTable 触发时则将逐一释放 tableId，直到 waitSyncTableIds 完全清空时，释放 historyBatch
     */
    const waitSyncHistoryBatches = ref<string[]>([])

    const waitSyncTableIds = ref<string[]>([])

    const startBatchSync = <T>(name: string, callback: () => T): T => {
        const graph = _graph()

        graph.startBatch(name)
        waitSyncHistoryBatches.value.push(name)

        const result = callback()

        if (waitSyncTableIds.value.length === 0) {
            let index: number | undefined
            for (let i = waitSyncHistoryBatches.value.length - 1; i >= 0; i--) {
                if (waitSyncHistoryBatches.value[i] === name) {
                    index = i
                    break
                }
            }
            if (index === undefined) {
                throw Error("some waitBatch stopped before it callback end")
            }
            waitSyncHistoryBatches.value.splice(index!, 1)
            graph.stopBatch(name)
        }

        return result
    }

    const syncTable = (id: string) => {
        waitSyncTableIds.value.push(id)
    }

    const syncedTable = (id: string) => {
        const graph = _graph()

        const index = waitSyncTableIds.value.indexOf(id)
        waitSyncTableIds.value.splice(index, 1)

        if (waitSyncTableIds.value.length === 0) {
            while (waitSyncHistoryBatches.value.length !== 0) {
                const name = waitSyncHistoryBatches.value.pop()!
                graph.stopBatch(name)
            }
        }
    }


    /**
     * 表编辑对话框相关
     */

    const tableDialogsStore = useTableDialogsStore()

    const tableCreateOptionsMap = new Map<string, TableLoadOptions>

    const createTable = (options: TableLoadOptions) => {
        const createKey = TABLE_CREATE_PREFIX + Date.now()
        tableDialogsStore.open(createKey, getDefaultTable(), {modal: false})
        tableCreateOptionsMap.set(createKey, options)
    }

    const createdTable = (createKey: string, table: DeepReadonly<GenTableModelInput>) => {
        const graph = _graph()

        const options = tableCreateOptionsMap.get(createKey)

        const node = loadTableModelInputs(
            graph,
            [table],
            options
        ).nodes[0]

        tableCreateOptionsMap.delete(createKey)

        if (node) {
            tableDialogsStore.close(createKey, true)

            setTimeout(() => {
                SELECT.select(node)
            }, 200)
        }
    }

    const editTable = (id: string, table: DeepReadonly<GenTableModelInput>) => {
        tableDialogsStore.open(id, cloneDeepReadonly<GenTableModelInput>(table), {modal: false})
    }

    const editedTable = (id: string, table: DeepReadonly<GenTableModelInput>) => {
        const graph = _graph()

        const cell = graph.getCellById(id)
        if (!cell || !cell.isNode()) {
            sendI18nMessage({
                key: "MESSAGE_ModelEditorStore_tableEditFail_nodeNotFound",
                args: [id]
            }, 'error')
            return
        }

        tableDialogsStore.close(id, true)

        startBatchSync('editedTable', () => {
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
    }

    const removeTable = (id: string) => {
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
            if (cell.shape === TABLE_NODE && cell.data.table) {
                const table = cell.data.table as GenTableModelInput
                // 当上级表被删除时，调整其他表中的 superTables
                if (table.type === "SUPER_TABLE") {
                    syncSuperTableNameForTables(graph, table.name, undefined)
                }
            }
            graph.removeNode(id)
        })
    }

    /**
     * 表组合对话框
     */
    const tableCombineDialogStore = useTableCombineDialogStore()

    const tableCombineOptions = ref<TableLoadOptions>()

    const combineTable = (options: TableLoadOptions) => {
        tableCombineOptions.value = options
        tableCombineDialogStore.open()
    }

    const combinedTable = (tableCombineData: DeepReadonly<TableCombineData>) => {
        const graph = _graph()

        const {superTable, inheritTableNodePairs} = tableCombineData

        startBatchSync("combinedTable", () => {
            loadTableModelInputs(graph, [superTable], tableCombineOptions.value, undefined)

            for (const {first, second} of inheritTableNodePairs) {
                updateTableNodeData(second, first)
            }

            tableCombineDialogStore.close()
        })
    }

    /**
     * 关联对话框相关
     */
    const associationDialogsStore = useAssociationDialogsStore()

    const createAssociation = () => {
        const createKey = ASSOCIATION_CREATE_PREFIX + Date.now()
        associationDialogsStore.open(createKey, getDefaultAssociation())
    }

    const createdAssociation = (createKey: string, association: DeepReadonly<GenAssociationModelInput>) => {
        const graph = _graph()

        const edge = loadAssociationModelInputs(
            graph,
            [association],
        ).edges[0]

        if (edge) {
            associationDialogsStore.close(createKey, true)

            setTimeout(() => {
                SELECT.select(edge)
            }, 200)
        }
    }

    const batchCreateAssociationsDialogStore = useBatchCreateAssociationsDialogStore()

    const batchCreateAssociations = () => {
        batchCreateAssociationsDialogStore.open()
    }

    const batchCreatedAssociations = (associations: DeepReadonly<GenAssociationModelInput[]>) => {
        const graph = _graph()

        graph.startBatch("batchCreatedAssociations")

        const edges = loadAssociationModelInputs(
            graph,
            associations,
        ).edges

        batchCreateAssociationsDialogStore.close()

        graph.stopBatch("batchCreatedAssociations")

        setTimeout(() => {
            SELECT.select(edges)
        }, 200)
    }


    const editAssociation = (id: string, association: DeepReadonly<GenAssociationModelInput>) => {
        associationDialogsStore.open(id, cloneDeepReadonly<GenAssociationModelInput>(association))
    }

    const editedAssociation = (id: string, association: DeepReadonly<GenAssociationModelInput>) => {
        const graph = _graph()

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

        associationDialogsStore.close(id, true)
    }

    const modifyAssociation = async (id: string, modifyAction: () => any) => {
        const graph = _graph()

        const key = `modifyAssociation [id=${id}]`
        graph.startBatch(key)
        await modifyAction()
        graph.stopBatch(key)
    }

    const removeAssociation = (id: string) => {
        _graph().removeEdge(id)
    }


    /**
     * 枚举编辑对话框相关
     */

    const enumDialogsStore = useEnumDialogsStore()

    const enumCreateOptionsMap = new Map<string, EnumCreateOptions | undefined>

    const createEnum = (options?: EnumCreateOptions | undefined) => {
        const createKey = ENUM_CREATE_PREFIX + Date.now()
        enumDialogsStore.open(createKey, getDefaultEnum())
        enumCreateOptionsMap.set(createKey, options)
    }

    const createdEnum = (createKey: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
        assertModel().value.enums.push(cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum))

        const options = enumCreateOptionsMap.get(createKey)

        if (options !== undefined) {
            const {tableDialogId, columnName} = options
            tableDialogsStore.enumCreated(tableDialogId, columnName, genEnum.name)
        }

        enumCreateOptionsMap.delete(createKey)

        enumDialogsStore.close(createKey, true)
    }

    const editEnum = (id: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
        enumDialogsStore.open(id, cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum))
    }

    const editedEnum = (id: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
        const oldName = id

        assertModel().value.enums = [
            ...assertModel().value.enums.filter(it => it.name !== oldName),
            cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum)
        ]

        enumDialogsStore.close(id, true)

        startBatchSync('editedEnum', () => {
            syncEnumNameForTables(_graph(), oldName, genEnum.name)
        })
    }

    const removeEnum = (id: string) => {
        const oldName = id

        assertModel().value.enums = assertModel().value.enums.filter(it => it.name !== oldName)

        startBatchSync('removeEnum', () => {
            syncEnumNameForTables(_graph(), oldName, undefined)
        })
    }

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

    const tableNodePairs: ComputedRef<Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>> = computed(() =>
        tableNodes.value
            .map(it => {
                return {first: it.data.table as GenTableModelInput, second: it}
            })
    )

    const tables = computed<Array<GenTableModelInput>>(() =>
        tableNodes.value
            .map(it => it.data.table)
    )

    const superTables = computed<Array<GenTableModelInput>>(() =>
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

    const associationEdgePairs: ComputedRef<Array<Pair<GenAssociationModelInput, UnwrapRefSimple<Edge>>>> = computed(() =>
        associationEdges.value
            .map(it => {
                return {first: it.data.association as GenAssociationModelInput, second: it}
            })
    )

    const associations = computed<Array<GenAssociationModelInput>>(() =>
        associationEdges.value
            .map(it => it.data.association)
    )

    // 枚举处理
    watch(() => currentModel.value, (value) => {
        if (currentModel.value !== undefined && value !== undefined) {
            value.enums.forEach(genEnum => {
                genEnum.packagePath = value.packagePath + ".enums"
            })
            currentModel.value.enums = value.enums.sort((a, b) => {
                if (a.name < b.name) return -1
                else return 1
            })
        }
    }, {immediate: true, deep: true})

    const enums = computed(() => {
        return (currentModel.value?.enums ?? [])
    })

    const selectedTableNodePairs = computed(() => {
        return tableNodePairs.value.filter(it => graphReactiveState.selectedNodeMap.value.has(it.second.id))
    })

    const selectedTables = computed<GenTableModelInput[]>(() => {
        return selectedTableNodePairs.value.map(it => it.first)
    })

    const selectedAssociationEdgePairs = computed(() => {
        return associationEdgePairs.value.filter(it => graphReactiveState.selectedEdgeMap.value.has(it.second.id))
    })

    const selectedAssociations = computed<GenAssociationModelInput[]>(() => {
        return selectedAssociationEdgePairs.value.map(it => it.first)
    })

    const modelReactiveState: ModelReactiveState = {
        tableNodes,
        tableNodePairs,
        tables,
        superTables,
        selectedTables,
        selectedTableNodePairs,
        associationEdges,
        associationEdgePairs,
        associations,
        selectedAssociations,
        selectedAssociationEdgePairs,
        enums,
    }

    const GRAPH = defineStore(
        'GRAPH',
        () => {
            return {...graphState, ...graphReactiveState, ...graphLoadOperation}
        }
    )()

    const MODEL = defineStore(
        'MODEL',
        () => {
            return {...modelState, ...modelReactiveState}
        }
    )()

    const unload = () => {
        if (GRAPH.isLoaded) {
            GRAPH.unload()
        }

        currentModel.value = undefined

        tableNodes.value = []
        associationEdges.value = []

        isLoaded.value = false

        associationDialogsStore.closeAll()
        batchCreateAssociationsDialogStore.close()
        useDataSourceLoadDialogStore().close()
        useEntityDialogsStore().closeAll()
        enumDialogsStore.closeAll()
        useModelEditDialogStore().close()
        useModelLoadDialogStore().close()
        useMultiCodePreviewStore().close()
        tableCombineDialogStore.close()
        tableDialogsStore.closeAll()
    }

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
        SELECT,
        VIEW,
        HISTORY,
        REMOVE,
        MODEL,
        MODEL_LOAD,
        MODEL_EDITOR: {
            ...modelGraphDataOperation,

            waitSyncHistoryBatches,
            waitSyncTableIds,
            syncTable,
            syncedTable,

            createTable,
            createdTable,
            editTable,
            editedTable,
            removeTable,
            combineTable,
            combinedTable,

            createAssociation,
            createdAssociation,
            batchCreateAssociations,
            batchCreatedAssociations,
            editAssociation,
            editedAssociation,
            modifyAssociation,
            removeAssociation,

            createEnum,
            createdEnum,
            editEnum,
            editedEnum,
            removeEnum,
        },
    }
}

let modelEditorStore: ReturnType<typeof initModelEditorStore> | undefined = undefined

export const useModelEditorStore = () => {
    if (modelEditorStore === undefined) {
        modelEditorStore = initModelEditorStore()
    }
    return modelEditorStore
}
