import {GraphLoadOperation, GraphState, useGraph} from "@/components/global/graphEditor/load/GraphLoadState.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {computed, ComputedRef, DeepReadonly, nextTick, Ref, ref, watch} from "vue";
import {api} from "@/api";
import {
    EntityConfigInput,
    EntityConfigView,
    GenAssociationModelInput,
    GenAssociationView,
    GenModelInput_TargetOf_enums,
    GenModelInput_TargetOf_subGroups,
    GenModelView,
    GenTableColumnsView,
    GenTableModelInput,
    Pair
} from "@/api/__generated/model/static";
import {useGlobalLoadingStore} from "@/store/loading/GlobalLoadingStore.ts";
import type {TableLoadOptions} from "@/components/pages/ModelEditor/graph/load/loadTableNode.ts";
import {loadTableNode} from "@/components/pages/ModelEditor/graph/load/loadTableNode.ts";
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
import {syncTimeout} from "@/utils/syncTimeout.ts";
import {Edge, Graph, Node} from '@antv/x6';
import {getCenterPoint, useViewOperation, ViewOperation} from "@/components/global/graphEditor/view/viewOperation.ts";
import {
    syncEnumNameForEntities,
    syncEnumNameForTables,
    syncNewEnumForTables
} from "@/components/pages/ModelEditor/sync/syncEnum.ts";
import {syncSuperTableNameForTables} from "@/components/pages/ModelEditor/sync/syncSuperTable.ts";
import {SelectOperation, useSelectOperation} from "@/components/global/graphEditor/selection/selectOperation.ts";
import {HistoryOperation, useHistoryOperations} from "@/components/global/graphEditor/history/useHistory.ts";
import {RemoveOperation, useRemoveOperation} from "@/components/global/graphEditor/remove/removeOperation.ts";
import {ASSOCIATION_CREATE_PREFIX, useAssociationDialogsStore} from "@/store/modelEditor/AssociationDialogsStore.ts";
import {updateAssociationEdgeData} from "@/components/pages/ModelEditor/graph/associationEdge/updateData.ts";
import {GraphReactiveState} from "@/components/global/graphEditor/data/reactiveState.ts";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {defineStore} from "pinia";
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
import {jsonParseThenConvertNullToUndefined} from "@/utils/nullToUndefined.ts";
import {SUB_GROUP_CREATE_PREFIX, useSubGroupDialogsStore} from "@/store/modelEditor/SubGroupDialogsStore.ts";
import {getDefaultGenModelSubGroup} from "@/components/business/modelSubGroup/defaultModelSubGroupForm.ts";
import {
    syncNewSubGroupForEnums,
    syncNewSubGroupForTables,
    syncSubGroupNameForEnums,
    syncSubGroupNameForTables
} from "@/components/pages/ModelEditor/sync/syncSubGroup.ts";
import {saveModel} from "@/components/pages/ModelEditor/save/saveModel.ts";
import {convertModel} from "@/components/pages/ModelEditor/file/modelFileOperations.ts";
import {loadSupGroups} from "@/components/pages/ModelEditor/graph/load/loadSubGroups.ts";
import {loadEnums} from "@/components/pages/ModelEditor/graph/load/loadEnums.ts";
import {loadAssociationEdge} from "@/components/pages/ModelEditor/graph/load/loadAssociationEdge.ts";
import debounce from "lodash/debounce";

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
    subGroups: ComputedRef<Array<GenModelInput_TargetOf_subGroups>>,
    subGroupNameStyleMap: ComputedRef<Map<string, string>>,
    enums: ComputedRef<Array<GenModelInput_TargetOf_enums>>
}

type ModelState = {
    _model: () => GenModelView
    isLoaded: Ref<boolean>
    load: (model: GenModelView) => void
    unload: () => void
}

type ModelGraphInput = {
    subGroups?: Array<GenModelInput_TargetOf_subGroups>,
    enums?: Array<GenModelInput_TargetOf_enums>,
    tables?: Array<GenTableModelInput>,
    associations?: Array<GenAssociationModelInput>,
    baseTableOptions?: TableLoadOptions,
    eachTableOptions?: Array<TableLoadOptions | undefined>,
}

type ModelLoadOperation = {
    loadInput: (input: DeepReadonly<ModelGraphInput>) => { nodes: Node[], edges: Edge[] }
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

export type SubGroupCreateOptions = {
    tableKey?: string | undefined,
    enumKey?: string | undefined,
}

type MinimapOperation = {
    setInitMinimapAction: (action: () => void) => void
}

type SubGroupEditOperation = {
    createSubGroup: (options?: SubGroupCreateOptions | undefined) => void,
    createdSubGroup: (createKey: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => void,

    editSubGroup: (name: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => void,
    editedSubGroup: (name: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => void,

    removeSubGroup: (name: string) => void,
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
    tableKey: string,
    columnName: string,
}

type EnumEditOperation = {
    createEnum: (options?: EnumCreateOptions | undefined) => void,
    createdEnum: (createKey: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => void,

    editEnum: (name: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => void,
    editedEnum: (name: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => void,

    removeEnum: (name: string) => void,
}

type EntityEditOperation = {
    editEntity: (entity: DeepReadonly<EntityConfigView>) => void,
    editedEntity: (entity: DeepReadonly<EntityConfigInput>) => Promise<void>,
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

    MODEL_EDITOR: ModelEditorDataOperation
        & ModelLoadOperation
        & MinimapOperation
        & ModelSyncState
        & SyncTableOperation
        & SubGroupEditOperation
        & TableEditOperation
        & AssociationEditOperation
        & EnumEditOperation
        & EntityEditOperation
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
                if (reset) {
                    return graphDataOperation.loadGraphData(modelEditorData, true)
                } else {
                    const cells = (modelEditorData as ModelEditorData).json.cells
                    const tables: GenTableModelInput[] = []
                    const eachTableOptions: TableLoadOptions[] = []
                    const associations: GenAssociationModelInput[] = []
                    for (const cell of cells) {
                        if (cell.shape === TABLE_NODE) {
                            tables.push(cell.data.table)
                            eachTableOptions.push((cell as any)["position"])
                        } else if (cell.shape === ASSOCIATION_EDGE) {
                            associations.push(cell.data.association)
                        }
                    }
                    return loadInput({tables, associations, eachTableOptions, baseTableOptions: getCenterPoint(graph)})
                }
            } else {
                if (reset) {
                    graph.removeCells(graph.getCells())
                }
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

    const loadingStore = useGlobalLoadingStore()

    const loadModelView = (model: GenModelView) => {
        const contextStore = useGenConfigContextStore()

        contextStore.merge(model)

        currentModel.value = model

        if (graphState.isLoaded.value) {
            loadModelEditorData(jsonParseThenConvertNullToUndefined(model.graphData), true)
        } else {
            graphLoadOperation.onLoaded(() => {
                loadModelEditorData(jsonParseThenConvertNullToUndefined(model.graphData), true)
            })
        }

        isLoaded.value = true
    }


    /**
     * 小地图同步
     */

    let initMinimapAction: () => void | undefined

    const setInitMinimapAction = (action: () => void) => {
        initMinimapAction = action
    }

    const forceUpdateMinimap = () => {
        initMinimapAction?.()
    }


    /**
     * 响应式数据
     */

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

    // 枚举和子组根据名称排序，并设置枚举 packagePath
    watch(() => currentModel.value, (value) => {
        if (value !== undefined) {
            const subGroupPackageMap = new Map<string, string>
            value.subGroups.forEach(subGroup => {
                subGroupPackageMap.set(subGroup.name, subGroup.subPackagePath)
            })

            value.enums.forEach(genEnum => {
                if (genEnum.subGroup) {
                    genEnum.packagePath = `${value.packagePath}.enums.${subGroupPackageMap.get(genEnum.subGroup.name)}`
                } else {
                    genEnum.packagePath = value.packagePath + ".enums"
                }
            })
            value.enums.sort((a, b) => {
                if (a.name < b.name) return -1
                else return 1
            })
            value.subGroups.sort((a, b) => {
                if (a.name < b.name) return -1
                else return 1
            })
            currentModel.value = value
        }
    }, {immediate: true, deep: true})

    const subGroups = computed(() => {
        return (currentModel.value?.subGroups ?? [])
    })

    const subGroupNameStyleMap = computed(() => {
        const map = new Map<string, string>
        for (const subGroup of subGroups.value) {
            map.set(subGroup.name, subGroup.style)
        }
        return map
    })

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
        subGroups,
        subGroupNameStyleMap,
        enums,
    }


    const loadInput = (
        input: DeepReadonly<ModelGraphInput>
    ) => {
        const graph = _graph()
        const model = assertModel()

        graph.startBatch("ModelEditorStore loadInput")

        const {
            subGroups: inputSubGroups = [] as Array<GenModelInput_TargetOf_subGroups>,
            enums: inputEnums = [] as Array<GenModelInput_TargetOf_enums>,
            tables: inputTables = [] as GenTableModelInput[],
            associations: inputAssociations = [] as GenAssociationModelInput[],
            baseTableOptions,
            eachTableOptions
        } = cloneDeepReadonly<ModelGraphInput>(input)

        const {
            newSubGroups,
            subGroupNameMap
        } = loadSupGroups(
            inputSubGroups,
            model.value.subGroups
        )
        model.value.subGroups.push(...newSubGroups)

        const {
            newEnums,
            enumNameMap
        } = loadEnums(
            inputEnums,
            enums.value,
            subGroupNameMap
        )
        model.value.enums.push(...newEnums)

        const {
            nodeMetas,
            tableNameMap
        } = loadTableNode(
            inputTables,
            tables.value,
            subGroupNameMap,
            enumNameMap,
            baseTableOptions,
            eachTableOptions
        )
        const nodes: Node[] = nodeMetas.map(it => graph.addNode(it))

        const {
            edgeMetas
        } = loadAssociationEdge(
            inputAssociations,
            associations.value,
            tableNameMap,
            tableNodePairs.value
        )
        const edges: Edge[] = edgeMetas.map(it => graph.addEdge(it))

        graph.stopBatch("ModelEditorStore loadInput")

        return {
            nodes,
            edges,
        }
    }


    const tableViewToInput = (tableView: DeepReadonly<GenTableColumnsView>): GenTableModelInput => {
        return {
            comment: tableView.comment,
            name: tableView.name,
            remark: tableView.remark,
            type: tableView.type,
            subGroup: tableView.subGroup ? {name: tableView.subGroup.name} : undefined,
            superTables: tableView.superTables.map(it => {
                return {name: it.name}
            }),
            indexes: tableView.indexes.map(indexView => {
                return {
                    name: indexView.name,
                    uniqueIndex: indexView.uniqueIndex,
                    remark: indexView.remark,
                    columns: tableView.columns
                        .filter(it => indexView.columnIds.includes(it.id))
                        .map(it => {
                            return {name: it.name}
                        })
                }
            }),
            columns: tableView.columns.map(column => {
                return {
                    autoIncrement: column.autoIncrement,
                    comment: column.comment,
                    defaultValue: column.defaultValue,
                    dataSize: column.dataSize,
                    name: column.name,
                    numericPrecision: column.numericPrecision,
                    orderKey: column.orderKey,
                    partOfPk: column.partOfPk,
                    remark: column.remark,
                    typeCode: column.typeCode,
                    overwriteByRaw: column.overwriteByRaw,
                    rawType: column.rawType,
                    typeNotNull: column.typeNotNull,
                    logicalDelete: column.logicalDelete,
                    businessKey: column.businessKey,
                    enum: column.enum ? {name: column.enum.name} : undefined
                }
            }),
        }
    }

    const associationViewToInput = (
        view: DeepReadonly<GenAssociationView>,
    ): GenAssociationModelInput => {
        return {
            type: view.type,
            name: view.name,
            dissociateAction: view.dissociateAction,
            updateAction: view.updateAction,
            deleteAction: view.deleteAction,
            fake: view.fake,
            sourceTableName: view.sourceTable.name,
            targetTableName: view.targetTable.name,

            columnReferences: view.columnReferences.map(({sourceColumn, targetColumn}) => {
                return {
                    sourceColumnName: sourceColumn.name,
                    targetColumnName: targetColumn.name,
                }
            })
        }
    }

    /**
     * TODO 移除在此处进行查询
     */
    const produceTableViewsToInputs = async (tables: DeepReadonly<GenTableColumnsView[]>) => {
        let associations = await api.associationService.queryByTable({
            body: {
                tableIds: tables.map(it => it.id),
                selectType: "OR"
            }
        })

        return {
            tables: tables.map(it => tableViewToInput(it)),
            associations: associations.map(it => associationViewToInput(it))
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
            loadInput({
                tables,
                associations,
                baseTableOptions: getCenterPoint(graph)
            })

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
        forceUpdateMinimap()

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
            forceUpdateMinimap()
        }
    }


    /**
     * 代码预览与视图同步相关
     */

    const codePreviewStore = useMultiCodePreviewStore()

    const waitRefreshModelAndCode = debounce(async () => {
        if (!codePreviewStore.openState) return

        await nextTick()

        let timer: number | undefined

        const waitRefresh = loadingStore.withLoading(
            'ModelEditorStore saveModelAndRefreshCodes',
            async () => {
                // 若存在需要等待同步的表和历史记录，先行等待这些进行同步，此后再进行保存
                if (
                    waitSyncTableIds.value.length === 0 &&
                    waitSyncHistoryBatches.value.length === 0
                ) {
                    const model = currentModel.value

                    if (model) {
                        const graph = _graph()
                        const currentGraphData = JSON.stringify(graphDataOperation.getGraphData())

                        if (model.graphData !== currentGraphData) {
                            graph.cleanSelection()
                            model.graphData = JSON.stringify(graphDataOperation.getGraphData())

                            await saveModel(model)
                        }

                        await convertModel(model.id)
                        if (codePreviewStore.openState) {
                            await codePreviewStore.codeRefresh()
                        }
                    }

                    clearTimeout(timer)
                } else {
                    timer = window.setTimeout(waitRefresh, 100)
                }
            }
        )

        await waitRefresh()
    }, 100)


    /**
     * 子组编辑对话框相关
     */

    const subGroupDialogsStore = useSubGroupDialogsStore()

    const subGroupCreateOptionsMap = new Map<string, SubGroupCreateOptions | undefined>

    const createSubGroup = (options?: SubGroupCreateOptions | undefined) => {
        const createKey = SUB_GROUP_CREATE_PREFIX + Date.now()
        subGroupDialogsStore.open(createKey, getDefaultGenModelSubGroup())
        subGroupCreateOptionsMap.set(createKey, options)
    }

    const createdSubGroup = (createKey: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => {
        assertModel().value.subGroups.push(cloneDeepReadonly<GenModelInput_TargetOf_subGroups>(subGroup))

        const options = subGroupCreateOptionsMap.get(createKey)

        if (options !== undefined) {
            const {tableKey, enumKey} = options
            if (tableKey) {
                syncNewSubGroupForTables(subGroup, tableKey)
            }
            if (enumKey) {
                syncNewSubGroupForEnums(subGroup, enumKey)
            }
        }

        subGroupCreateOptionsMap.delete(createKey)

        subGroupDialogsStore.close(createKey, true)

        waitRefreshModelAndCode()
    }

    const editSubGroup = (name: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => {
        subGroupDialogsStore.open(name, cloneDeepReadonly<GenModelInput_TargetOf_subGroups>(subGroup))
    }

    const editedSubGroup = (name: string, subGroup: DeepReadonly<GenModelInput_TargetOf_subGroups>) => {
        const oldName = name

        assertModel().value.subGroups = [
            ...assertModel().value.subGroups.filter(it => it.name !== oldName),
            cloneDeepReadonly<GenModelInput_TargetOf_subGroups>(subGroup)
        ]

        subGroupDialogsStore.close(name, true)

        startBatchSync('editedSubGroup', () => {
            syncSubGroupNameForTables(_graph(), oldName, subGroup.name)
            syncSubGroupNameForEnums(assertModel(), oldName, subGroup.name)
        })

        waitRefreshModelAndCode()
    }

    const removeSubGroup = (name: string) => {
        const oldName = name

        assertModel().value.subGroups = assertModel().value.subGroups.filter(it => it.name !== oldName)

        startBatchSync('removeSubGroup', () => {
            syncSubGroupNameForTables(_graph(), oldName, undefined)
            syncSubGroupNameForEnums(assertModel(), oldName, undefined)
        })

        waitRefreshModelAndCode()
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

    const createdTable = async (createKey: string, table: DeepReadonly<GenTableModelInput>) => {
        const options = tableCreateOptionsMap.get(createKey)

        const node = loadInput({
            tables: [table],
            eachTableOptions: [options]
        }).nodes[0]

        tableCreateOptionsMap.delete(createKey)

        if (node) {
            tableDialogsStore.close(createKey, true)

            setTimeout(() => {
                SELECT.select(node)
            }, 200)
        }

        waitRefreshModelAndCode()
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

        waitRefreshModelAndCode()
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

        waitRefreshModelAndCode()
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
        const {superTable, inheritTableNodePairs} = tableCombineData

        startBatchSync("combinedTable", async () => {
            const node = loadInput({
                tables: [superTable],
                eachTableOptions: [tableCombineOptions.value]
            }).nodes[0]

            if (node) {
                for (const {first, second} of inheritTableNodePairs) {
                    updateTableNodeData(second, first)
                }

                tableCombineDialogStore.close()

                setTimeout(() => {
                    VIEW.focus(node)
                }, 200)
            }
        }).then()

        waitRefreshModelAndCode()
    }

    /**
     * 关联对话框相关
     */
    const associationDialogsStore = useAssociationDialogsStore()

    const createAssociation = () => {
        const createKey = ASSOCIATION_CREATE_PREFIX + Date.now()
        associationDialogsStore.open(createKey, getDefaultAssociation())
    }

    const createdAssociation = async (createKey: string, association: DeepReadonly<GenAssociationModelInput>) => {
        const edge = loadInput({
            associations: [association]
        }).edges[0]

        if (edge) {
            associationDialogsStore.close(createKey, true)

            setTimeout(() => {
                SELECT.select(edge)
            }, 200)
        }

        waitRefreshModelAndCode()
    }

    const batchCreateAssociationsDialogStore = useBatchCreateAssociationsDialogStore()

    const batchCreateAssociations = () => {
        batchCreateAssociationsDialogStore.open()
    }

    const batchCreatedAssociations = async (associations: DeepReadonly<GenAssociationModelInput[]>) => {
        const graph = _graph()

        graph.startBatch("batchCreatedAssociations")

        const {edges} = loadInput({
            associations
        })

        batchCreateAssociationsDialogStore.close()

        graph.stopBatch("batchCreatedAssociations")

        setTimeout(() => {
            SELECT.select(edges)
        }, 200)

        waitRefreshModelAndCode()
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

        waitRefreshModelAndCode()
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

        waitRefreshModelAndCode()
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
            const {tableKey, columnName} = options
            syncNewEnumForTables(genEnum, tableKey, columnName)
        }

        enumCreateOptionsMap.delete(createKey)

        enumDialogsStore.close(createKey, true)

        waitRefreshModelAndCode()
    }

    const editEnum = (name: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
        enumDialogsStore.open(name, cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum))
    }

    const editedEnum = (name: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
        const oldName = name

        assertModel().value.enums = [
            ...assertModel().value.enums.filter(it => it.name !== oldName),
            cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum)
        ]

        enumDialogsStore.close(name, true)

        startBatchSync('editedEnum', () => {
            syncEnumNameForEntities(oldName, genEnum.name)
            syncEnumNameForTables(_graph(), oldName, genEnum.name)
        })

        waitRefreshModelAndCode()
    }

    const removeEnum = (name: string) => {
        const oldName = name

        assertModel().value.enums = assertModel().value.enums.filter(it => it.name !== oldName)

        startBatchSync('removeEnum', () => {
            syncEnumNameForTables(_graph(), oldName, undefined)
        })

        waitRefreshModelAndCode()
    }


    /**
     * 实体编辑对话框相关
     */

    const entityDialogsStore = useEntityDialogsStore()

    const editEntity = (entity: DeepReadonly<EntityConfigView>) => {
        entityDialogsStore.open(entity.tableConvertedEntity.id, cloneDeepReadonly<EntityConfigView>(entity))
    }

    const editedEntity = async (entity: DeepReadonly<EntityConfigInput>) => {
        await api.entityService.config({body: cloneDeepReadonly<EntityConfigInput>(entity)})
        entityDialogsStore.close(entity.tableConvertedEntity.id, true)

        waitRefreshModelAndCode()
    }

    const GRAPH = defineStore(
        'GRAPH',
        () => {
            return {...graphState, ...graphReactiveState, ...graphLoadOperation}
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

    const MODEL = defineStore(
        'MODEL',
        () => {
            return {
                _model: (): GenModelView => {
                    return assertModel().value
                },
                isLoaded,
                load: loadModelView,
                unload,

                ...modelReactiveState
            }
        }
    )()

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
        MODEL_EDITOR: {
            ...modelGraphDataOperation,

            loadInput,
            loadModel,
            loadSchema,
            loadTable,

            setInitMinimapAction,

            waitSyncHistoryBatches,
            waitSyncTableIds,
            syncTable,
            syncedTable,

            createSubGroup,
            createdSubGroup,
            editSubGroup,
            editedSubGroup,
            removeSubGroup,

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

            editEntity,
            editedEntity,
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
