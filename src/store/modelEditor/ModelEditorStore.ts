import {GraphLoadOperation, GraphState, useGraph} from "@/components/global/graphEditor/load/GraphLoadState.ts";
import {sendI18nMessage} from "@/message/message.ts";
import {computed, ComputedRef, DeepReadonly, nextTick, Ref, ref, toRaw, watch, WatchStopHandle} from "vue";
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
import type {TableLoadOptions} from "@/components/pages/ModelEditor/load/loadTableNode.ts";
import {loadTableNode} from "@/components/pages/ModelEditor/load/loadTableNode.ts";
import {useGenConfigContextStore} from "@/store/config/ContextGenConfigStore.ts";
import {ModelEditorData, validateModelEditorData} from "@/shape/ModelEditorData.ts";
import {ASSOCIATION_EDGE, TABLE_NODE} from "@/components/pages/ModelEditor/constant.ts";
import {updateTableNodeData} from "@/components/pages/ModelEditor/graph/tableNode/updateData.ts";
import {ENUM_CREATE_PREFIX, useEnumDialogsStore} from "@/store/modelEditor/dialogs/EnumDialogsStore.ts";
import {getDefaultEnum} from "@/components/business/enum/defaultEnum.ts";
import {unStyleAll} from "@/components/pages/ModelEditor/graph/highlight.ts";
import {GraphData, useGraphDataOperation} from "@/components/global/graphEditor/data/graphData.ts";
import {syncTimeout} from "@/utils/syncTimeout.ts";
import {Edge, Graph, Node} from '@antv/x6';
import {
    getCenterPoint,
    GraphViewOperation,
    useViewOperation
} from "@/components/global/graphEditor/view/viewOperation.ts";
import {
    syncEnumNameForEntities,
    syncEnumNameForTables,
    syncNewEnumForTables
} from "@/components/pages/ModelEditor/sync/syncEnum.ts";
import {GraphSelectOperation, useSelectOperation} from "@/components/global/graphEditor/selection/selectOperation.ts";
import {
    GraphHistoryOperation,
    useHistory,
    useHistoryOperations
} from "@/components/global/graphEditor/history/useHistory.ts";
import {GraphRemoveOperation, useRemoveOperation} from "@/components/global/graphEditor/remove/removeOperation.ts";
import {GraphReactiveState} from "@/components/global/graphEditor/data/reactiveState.ts";
import {UnwrapRefSimple} from "@/declare/UnwrapRefSimple.ts";
import {defineStore} from "pinia";
import {useBatchCreateAssociationsDialogStore} from "@/store/modelEditor/dialogs/BatchCreateAssociationsDialogStore.ts";
import {useTableCombineDialogStore} from "@/store/modelEditor/dialogs/TableCombineDialogStore.ts";
import {TableCombineData} from "@/components/business/table/TableCombineData.ts";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";
import {useEntityDialogsStore} from "@/store/modelEditor/dialogs/EntityDialogsStore.ts";
import {useDataSourceLoadDialogStore} from "@/store/modelEditor/dialogs/DataSourceLoadDialogStore.ts";
import {useModelEditDialogStore} from "@/store/modelEditor/dialogs/ModelEditDialogStore.ts";
import {useModelLoadDialogStore} from "@/store/modelEditor/dialogs/ModelLoadDialogStore.ts";
import {useMultiCodePreviewStore} from "@/store/modelEditor/MultiCodePreviewStore.ts";
import {jsonParseThenConvertNullToUndefined} from "@/utils/nullToUndefined.ts";
import {saveModel} from "@/components/pages/ModelEditor/save/saveModel.ts";
import {convertModel} from "@/components/pages/ModelEditor/export/modelExport.ts";
import {loadSupGroups} from "@/components/pages/ModelEditor/load/loadSubGroups.ts";
import {loadEnums} from "@/components/pages/ModelEditor/load/loadEnums.ts";
import {loadAssociationEdge} from "@/components/pages/ModelEditor/load/loadAssociationEdge.ts";
import debounce from "lodash/debounce";
import {useDebugStore} from "@/store/debug/debugStore.ts";
import {CustomHistory} from "@/components/global/graphEditor/history/CustomHistory.ts";
import {jsonSortPropStringify} from "@/utils/json.ts";
import {useSubGroupDialogsStore} from "@/store/modelEditor/dialogs/SubGroupDialogsStore.ts";
import {useTableDialogsStore} from "@/store/modelEditor/dialogs/TableDialogsStore.ts";
import {useAssociationDialogsStore} from "@/store/modelEditor/dialogs/AssociationDialogsStore.ts";

export type SubGroupData = {
    group: GenModelInput_TargetOf_subGroups | undefined,
    tableNodePairs: Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>,
    enums: Array<GenModelInput_TargetOf_enums>,
}

type ModelReactiveState = {
    subGroups: ComputedRef<Array<GenModelInput_TargetOf_subGroups>>,
    selectedSubGroupMap: DeepReadonly<Ref<Map<string | undefined, GenModelInput_TargetOf_subGroups | undefined>>>,
    subGroupNameStyleMap: ComputedRef<Map<string, string>>,

    enums: ComputedRef<Array<GenModelInput_TargetOf_enums>>,
    selectedEnumMap: ComputedRef<Map<string, GenModelInput_TargetOf_enums>>,
    enumNameGroupNameMap: ComputedRef<Map<string, string | undefined>>,

    tableNodes: DeepReadonly<Ref<Array<UnwrapRefSimple<Node>>>>,
    tableNodePairs: ComputedRef<Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>>,
    tables: ComputedRef<Array<GenTableModelInput>>,
    superTables: ComputedRef<Array<GenTableModelInput>>,
    selectedTables: ComputedRef<Array<GenTableModelInput>>,
    selectedTableNodePairs: ComputedRef<Array<Pair<GenTableModelInput, UnwrapRefSimple<Node>>>>,
    tableNameGroupNameMap: ComputedRef<Map<string, string | undefined>>,

    associationEdges: DeepReadonly<Ref<Array<UnwrapRefSimple<Edge>>>>,
    associationEdgePairs: ComputedRef<Array<Pair<GenAssociationModelInput, UnwrapRefSimple<Edge>>>>,
    associations: ComputedRef<Array<GenAssociationModelInput>>,
    selectedAssociations: ComputedRef<Array<GenAssociationModelInput>>,
    selectedAssociationEdgePairs: ComputedRef<Array<Pair<GenAssociationModelInput, UnwrapRefSimple<Edge>>>>,

    subGroupDataList: ComputedRef<Array<SubGroupData>>,
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

type LoadResult = {
    nodes: Node[],
    edges: Edge[],
    enums: GenModelInput_TargetOf_enums[],
    subGroups: GenModelInput_TargetOf_subGroups[],
}

type ModelLoadOperation = {
    loadInput: (input: DeepReadonly<ModelGraphInput>) => LoadResult
    loadModel: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
    loadSchema: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
    loadTable: (id: number) => Promise<{ nodes: Node[], edges: Edge[] }>
}

type ModelEditorDataOperation = {
    getGraphData: () => DeepReadonly<GraphData>
    loadModelEditorData: (modelEditorData: DeepReadonly<ModelEditorData>, reset: boolean) => LoadResult
}

type MinimapOperation = {
    setInitMinimapAction: (action: () => void) => void
}

type TableEditOperation = {
    combineTable: (options: TableLoadOptions) => void,
    combinedTable: (tableCombineData: DeepReadonly<TableCombineData>) => void,
}

type AssociationEditOperation = {
    batchCreateAssociations: () => void,
    batchCreatedAssociations: (associations: DeepReadonly<GenAssociationModelInput[]>) => void,
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
    syncTable: (id: string) => void,
    syncedTable: (id: string) => void,
    waitSyncHistoryBatches: Ref<string[]>,
    waitSyncTableIds: Ref<string[]>,
    startBatchSync: <T>(name: string, callback: () => T) => T

    waitRefreshModelAndCode: () => void
}

type ModelSelectOperation = GraphSelectOperation & {
    selectSubGroup: (...name: (string | undefined)[]) => void
    unselectSubGroup: (...name: (string | undefined)[]) => void
    toggleSelectSubGroup: (...name: (string | undefined)[]) => void

    selectEnum: (...name: string[]) => void
    unselectEnum: (...name: string[]) => void
    toggleSelectEnum: (...name: string[]) => void
}

type ModelHistoryCommandMap = {
    modelSubGroupsChange: {
        oldSubGroups: DeepReadonly<GenModelInput_TargetOf_subGroups[]>,
        newSubGroups: DeepReadonly<GenModelInput_TargetOf_subGroups[]>
    }
    modelEnumsChange: {
        oldEnums: DeepReadonly<GenModelInput_TargetOf_enums[]>,
        newEnums: DeepReadonly<GenModelInput_TargetOf_enums[]>
    }
}

type ModelEditorStore = {
    GRAPH: UnwrapRefSimple<GraphState & GraphReactiveState & GraphLoadOperation>

    SELECT: ModelSelectOperation
    VIEW: GraphViewOperation
    HISTORY: GraphHistoryOperation
    REMOVE: GraphRemoveOperation

    MODEL: UnwrapRefSimple<ModelState & ModelReactiveState>

    MODEL_EDITOR: ModelEditorDataOperation
        & ModelLoadOperation
        & MinimapOperation
        & ModelSyncState
        & TableEditOperation
        & AssociationEditOperation
        & EnumEditOperation
        & EntityEditOperation
}

const initModelEditorStore = (): ModelEditorStore => {
    const {graphState, graphReactiveState, graphLoadOperation} = useGraph()

    const {_graph} = graphState

    const graphDataOperation = useGraphDataOperation(_graph)

    const graphSelectOperation = useSelectOperation(_graph)

    const VIEW = useViewOperation(_graph)

    const HISTORY = useHistoryOperations(_graph)

    const tableDialogsStore = useTableDialogsStore()

    const associationDialogsStore = useAssociationDialogsStore()

    const REMOVE = useRemoveOperation(
        _graph,
        (_, cells, target) => {
            startBatchSync(target, () => {
                cells.forEach(cell => {
                    if (cell.isNode() && cell.shape === TABLE_NODE) {
                        tableDialogsStore.remove(cell.id)
                    } else if (cell.isEdge() && cell.shape === ASSOCIATION_EDGE) {
                        associationDialogsStore.remove(cell.id)
                    }
                })
            })
        }
    )

    const loadModelEditorData = (modelEditorData: DeepReadonly<ModelEditorData>, reset: boolean = false): LoadResult => {
        let validateErrors
        try {
            const graph = _graph()
            if (modelEditorData && validateModelEditorData(modelEditorData, e => validateErrors = e)) {
                unStyleAll(graph)
                if (reset) {
                    return {
                        ...graphDataOperation.loadGraphData(modelEditorData, true),
                        subGroups: [],
                        enums: [],
                    }
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
                return {nodes: [], edges: [], enums: [], subGroups: []}
            }
        } catch (e) {
            sendI18nMessage("MESSAGE_ModelEditorStore_graphLoadFail", "error", validateErrors ? validateErrors : {
                error: e,
                graphData: modelEditorData
            })
            return {nodes: [], edges: [], enums: [], subGroups: []}
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

    const bindGraphHistoryChangeDebug = (graph: Graph) => {
        graph.on('history:change', (args) => {
            const message = args.options.name ?? 'history:change'
            debugStore.log('HISTORY', message, args.cmds)
        })
    }
    if (graphState.isLoaded.value) {
        bindGraphHistoryChangeDebug(graphState._graph())
    } else graphLoadOperation.onLoaded((graph) => {
        if (!graph) return
        bindGraphHistoryChangeDebug(graph)
    })

    /**
     * 小地图同步
     */

    let initMinimapAction: () => void | undefined

    const setInitMinimapAction = (action: () => void) => {
        initMinimapAction = action
    }

    const forceUpdateMinimap = debounce(() => {
        initMinimapAction?.()
    }, 100)


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

    const tableNameGroupNameMap = computed(() => {
        const map = new Map<string, string | undefined>
        for (const table of tables.value) {
            map.set(table.name, table.subGroup?.name)
        }
        return map
    })

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


    const subGroups = computed(() => {
        if (!currentModel.value) return []

        const value = cloneDeepReadonly<GenModelView>(currentModel.value)

        return value.subGroups.sort((a, b) => {
            if (a.name < b.name) return -1
            else return 1
        })
    })

    const selectedSubGroupNames = ref<Set<string | undefined>>(new Set)
    watch(() => subGroups.value, () => {
         const set = new Set<string | undefined>(subGroups.value
            .map(it => it.name)
            .filter(it => selectedSubGroupNames.value.has(it))
        )
        if (selectedSubGroupNames.value.has(undefined)) {
            set.add(undefined)
        }
        selectedSubGroupNames.value = set
    }, {immediate: true, deep: true})

    const selectedSubGroupMap = ref<Map<string | undefined, GenModelInput_TargetOf_subGroups | undefined>>(new Map)
    watch(() => [subGroups.value, selectedSubGroupNames.value], () => {
        const map = new Map<string | undefined, GenModelInput_TargetOf_subGroups | undefined>
        if (selectedSubGroupNames.value.has(undefined)) {
            map.set(undefined, undefined)
        }
        for (const subGroup of subGroups.value) {
            if (selectedSubGroupNames.value.has(subGroup.name)) {
                map.set(subGroup.name, subGroup)
            }
        }
        selectedSubGroupMap.value = map
    }, {immediate: true, deep: true})

    const selectSubGroup = (...name: (string | undefined)[]) => {
        for (const it of name) {
            selectedSubGroupNames.value.add(it)
        }
    }

    const unselectSubGroup = (...name: (string | undefined)[]) => {
        for (const it of name) {
            selectedSubGroupNames.value.delete(it)
        }
    }

    const toggleSelectSubGroup = (...name: (string | undefined)[]) => {
        for (const it of name) {
            if (selectedSubGroupNames.value.has(it)) {
                selectedSubGroupNames.value.delete(it)
            } else {
                selectedSubGroupNames.value.add(it)
            }
        }
    }

    const subGroupNameStyleMap = computed(() => {
        const map = new Map<string, string>
        for (const subGroup of subGroups.value) {
            map.set(subGroup.name, subGroup.style)
        }
        return map
    })

    let modelDynamicStyle: HTMLStyleElement | undefined
    watch(() => subGroupNameStyleMap.value, (value) => {
        if (!modelDynamicStyle) {
            modelDynamicStyle = document.createElement('style')
            modelDynamicStyle.id = 'model-dynamic-style'
            document.head.appendChild(modelDynamicStyle)
        }

        let styleContent = ''
        for (const [name, style] of value) {
            styleContent += `
.table-node table.model-sub-group-${name} { 
    --border-color: ${style};
}

.table-node td .model-sub-group-${name} { 
    color: ${style};
}

.column-type-form .model-sub-group-${name} {
    color: ${style};
}

.enum-select .model-sub-group-${name},
.enum-select-options .model-sub-group-${name} .el-text {
    color: ${style};
}
`
        }

        modelDynamicStyle.textContent = styleContent
    }, {immediate: true})


    const enums = computed(() => {
        if (!currentModel.value) return []

        const value = cloneDeepReadonly<GenModelView>(currentModel.value)

        const subGroupPackageMap = new Map<string, string>
        value.subGroups.forEach(subGroup => {
            subGroupPackageMap.set(subGroup.name, subGroup.subPackagePath)
        })

        value.enums.forEach(genEnum => {
            const subGroupPackagePath = genEnum.subGroup ? subGroupPackageMap.get(genEnum.subGroup.name) : undefined
            if (subGroupPackagePath) {
                genEnum.packagePath = `${value.packagePath}.enums.${subGroupPackagePath}`
            } else {
                genEnum.packagePath = value.packagePath + ".enums"
            }
        })
        value.enums.sort((a, b) => {
            if (a.name < b.name) return -1
            else return 1
        })
        return value.enums
    })

    const selectedEnumNames = ref<Set<string>>(new Set)

    watch(() => enums.value, (newVal) => {
        selectedEnumNames.value = new Set(newVal
            .map(it => it.name)
            .filter(it => selectedEnumNames.value.has(it))
        )
    }, {immediate: true, deep: true})

    const selectedEnumMap = computed(() => {
        const map = new Map<string, GenModelInput_TargetOf_enums>
        for (const genEnum of enums.value) {
            if (selectedEnumNames.value.has(genEnum.name)) {
                map.set(genEnum.name, genEnum)
            }
        }
        return map
    })

    const enumNameGroupNameMap = computed(() => {
        const map = new Map<string, string | undefined>
        for (const genEnum of enums.value) {
            map.set(genEnum.name, genEnum.subGroup?.name)
        }
        return map
    })


    const selectEnum = (...name: string[]) => {
        for (const it of name) {
            selectedEnumNames.value.add(it)
        }
    }

    const unselectEnum = (...name: string[]) => {
        for (const it of name) {
            selectedEnumNames.value.delete(it)
        }
    }

    const toggleSelectEnum = (...name: string[]) => {
        for (const it of name) {
            if (selectedEnumNames.value.has(it)) {
                selectedEnumNames.value.delete(it)
            } else {
                selectedEnumNames.value.add(it)
            }
        }
    }

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

    const subGroupDataList = computed<Array<SubGroupData>>(() => {
        return [undefined, ...subGroups.value].map(group => {
            const matchedTableNodePairs = tableNodePairs.value.filter(it => it.first.subGroup?.name === group?.name)
            const matchedEnums = enums.value.filter(it => it.subGroup?.name === group?.name)

            return {
                group,
                tableNodePairs: matchedTableNodePairs,
                enums: matchedEnums,
            }
        })
    })

    const modelReactiveState: ModelReactiveState = {
        subGroups,
        subGroupNameStyleMap,
        selectedSubGroupMap,

        tableNodes,
        tableNodePairs,
        tables,
        superTables,
        selectedTables,
        selectedTableNodePairs,
        tableNameGroupNameMap,

        associationEdges,
        associationEdgePairs,
        associations,
        selectedAssociations,
        selectedAssociationEdgePairs,

        enums,
        selectedEnumMap,
        enumNameGroupNameMap,

        subGroupDataList,
    }


    const SELECT: ModelSelectOperation = {
        ...graphSelectOperation,
        selectSubGroup,
        unselectSubGroup,
        toggleSelectSubGroup,

        selectEnum,
        unselectEnum,
        toggleSelectEnum,

        selectAll() {
            selectedSubGroupNames.value = new Set(subGroups.value.map(it => it.name))
            selectedEnumNames.value = new Set(enums.value.map(it => it.name))
            graphSelectOperation.selectAll()
        },
        unselectAll() {
            selectedSubGroupNames.value.clear()
            selectedEnumNames.value.clear()
            graphSelectOperation.unselectAll()
        }
    }


    /**
     * 设置模型自定义历史记录
     */
    let modelCustomHistory: CustomHistory<ModelHistoryCommandMap> | undefined

    let subGroupsHistoryChangeWatcher: WatchStopHandle | undefined
    const initSubGroupHistoryChangeWatcher = () => {
        subGroupsHistoryChangeWatcher = watch(() => subGroups.value, (newVal, oldVal) => {
            const data = {
                newSubGroups: cloneDeepReadonly<GenModelInput_TargetOf_subGroups[]>(toRaw(newVal)),
                oldSubGroups: cloneDeepReadonly<GenModelInput_TargetOf_subGroups[]>(toRaw(oldVal)),
            }
            if (jsonSortPropStringify(data.newSubGroups) === jsonSortPropStringify(data.oldSubGroups)) return
            modelCustomHistory?.pushCommand("modelSubGroupsChange", data)
        }, {deep: true})
    }

    let enumsHistoryChangeWatcher: WatchStopHandle | undefined
    const initEnumsHistoryChangeWatcher = () => {
        enumsHistoryChangeWatcher = watch(() => enums.value, (newVal, oldVal) => {
            const data = {
                newEnums: cloneDeepReadonly<GenModelInput_TargetOf_enums[]>(toRaw(newVal)),
                oldEnums: cloneDeepReadonly<GenModelInput_TargetOf_enums[]>(toRaw(oldVal)),
            }
            if (jsonSortPropStringify(data.newEnums) === jsonSortPropStringify(data.oldEnums)) return
            modelCustomHistory?.pushCommand("modelEnumsChange", data)
        }, {deep: true})
    }

    const registerModelHistory = (graph: Graph) => {
        modelCustomHistory = useHistory<ModelHistoryCommandMap>(graph)
        modelCustomHistory.registerCommand("modelSubGroupsChange", {
            applyAction: ({newSubGroups}) => {
                const model = assertModel().value
                subGroupsHistoryChangeWatcher?.()
                enumsHistoryChangeWatcher?.()
                model.subGroups = cloneDeepReadonly<GenModelInput_TargetOf_subGroups[]>(newSubGroups)
                initEnumsHistoryChangeWatcher()
                initSubGroupHistoryChangeWatcher()
            },
            revertAction: ({oldSubGroups}) => {
                const model = assertModel().value
                subGroupsHistoryChangeWatcher?.()
                enumsHistoryChangeWatcher?.()
                model.subGroups = cloneDeepReadonly<GenModelInput_TargetOf_subGroups[]>(oldSubGroups)
                initEnumsHistoryChangeWatcher()
                initSubGroupHistoryChangeWatcher()
            },
        })
        modelCustomHistory.registerCommand("modelEnumsChange", {
            applyAction: ({newEnums}) => {
                const model = assertModel().value
                enumsHistoryChangeWatcher?.()
                model.enums = cloneDeepReadonly<GenModelInput_TargetOf_enums[]>(newEnums)
                initEnumsHistoryChangeWatcher()
            },
            revertAction: ({oldEnums}) => {
                const model = assertModel().value
                enumsHistoryChangeWatcher?.()
                model.enums = cloneDeepReadonly<GenModelInput_TargetOf_enums[]>(oldEnums)
                initEnumsHistoryChangeWatcher()
            },
        })

        initSubGroupHistoryChangeWatcher()
        initEnumsHistoryChangeWatcher()
    }

    if (graphState.isLoaded.value) {
        registerModelHistory(_graph())
    } else {
        graphLoadOperation.onLoaded(graph => {
            if (graph) registerModelHistory(graph)
        })
    }
    graphLoadOperation.onUnloaded(() => {
        subGroupsHistoryChangeWatcher?.()
        enumsHistoryChangeWatcher?.()
    })


    const loadInput = (
        input: DeepReadonly<ModelGraphInput>
    ): LoadResult => {
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

        _graph().container.focus()

        return {
            nodes,
            edges,
            subGroups: newSubGroups,
            enums: newEnums,
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
                baseTableOptions: tableCombineOptions.value
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
            graphSelectOperation.select(edges)
        }, 200)

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
        startBatchSync('createdEnum', () => {
            assertModel().value.enums.push(cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum))

            const options = enumCreateOptionsMap.get(createKey)

            if (options !== undefined) {
                const {tableKey, columnName} = options
                syncNewEnumForTables(genEnum, tableKey, columnName)
            }

            enumCreateOptionsMap.delete(createKey)
        })

        enumDialogsStore.close(createKey, true)

        waitRefreshModelAndCode()
    }

    const editEnum = (name: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
        enumDialogsStore.open(name, cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum))
    }

    const editedEnum = (name: string, genEnum: DeepReadonly<GenModelInput_TargetOf_enums>) => {
        const oldName = name

        startBatchSync('editedEnum', () => {
            assertModel().value.enums = [
                ...assertModel().value.enums.filter(it => it.name !== oldName),
                cloneDeepReadonly<GenModelInput_TargetOf_enums>(genEnum)
            ]
            syncEnumNameForEntities(oldName, genEnum.name)
            syncEnumNameForTables(_graph(), oldName, genEnum.name)
        })

        enumDialogsStore.close(name, true)

        waitRefreshModelAndCode()
    }

    const removeEnum = (name: string) => {
        const oldName = name

        startBatchSync('removeEnum', () => {
            assertModel().value.enums = assertModel().value.enums.filter(it => it.name !== oldName)
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


    const debugStore = useDebugStore()

    const load = (model: GenModelView) => {
        debugStore.log("HISTORY", "ModelEditor load start", model)

        subGroupsHistoryChangeWatcher?.()
        enumsHistoryChangeWatcher?.()

        isLoaded.value = false

        _graph().disableHistory()

        const contextStore = useGenConfigContextStore()

        contextStore.merge(model)

        currentModel.value = model

        if (graphState.isLoaded.value) {
            loadModelEditorData(jsonParseThenConvertNullToUndefined(model.graphData), true)
        } else graphLoadOperation.onLoaded(() => {
            loadModelEditorData(jsonParseThenConvertNullToUndefined(model.graphData), true)
        })

        _graph().enableHistory()

        isLoaded.value = true

        initSubGroupHistoryChangeWatcher()
        initEnumsHistoryChangeWatcher()

        debugStore.log("HISTORY", "ModelEditor load success", toRaw(currentModel.value))
    }

    const unload = () => {
        debugStore.log("HISTORY", "ModelEditor unload start")

        isLoaded.value = false

        if (GRAPH.isLoaded) {
            GRAPH.unload()
        }

        currentModel.value = undefined

        tableNodes.value = []
        associationEdges.value = []

        useModelEditDialogStore().close()

        useDataSourceLoadDialogStore().close()
        useModelLoadDialogStore().close()

        useSubGroupDialogsStore().closeAll()

        tableDialogsStore.closeAll()
        tableCombineDialogStore.close()

        enumDialogsStore.closeAll()

        associationDialogsStore.closeAll()
        batchCreateAssociationsDialogStore.close()

        entityDialogsStore.closeAll()

        codePreviewStore.close()

        debugStore.log("HISTORY", "ModelEditor unload success")
    }

    const MODEL = defineStore(
        'MODEL',
        () => {
            return {
                _model: (): GenModelView => {
                    return assertModel().value
                },
                isLoaded,
                load,
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
            startBatchSync,

            waitRefreshModelAndCode,

            combineTable,
            combinedTable,

            batchCreateAssociations,
            batchCreatedAssociations,

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
