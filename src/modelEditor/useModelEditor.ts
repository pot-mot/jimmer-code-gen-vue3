import {createStore} from "@/utils/store/createStore.ts";
import {computed, nextTick, reactive, readonly, ref, shallowRef} from "vue";
import {
    useModelEditorHistory,
} from "@/modelEditor/history/ModelEditorHistory.ts";
import {useModelEditorSelectIds} from "@/modelEditor/selectIds/ModelEditorSelectIds.ts";
import {
    type GraphEdge,
    type GraphNode,
    type Rect,
    useVueFlow,
    type ViewportTransform,
    type VueFlowStore, type XYPosition
} from "@vue-flow/core";
import {sendMessage} from "@/components/message/messageApi.ts";
import {blurActiveElement, judgeTargetIsInteraction} from "@/utils/event/judgeEventTarget.ts";
import {jsonSortPropStringify} from "@/utils/json/jsonStringify.ts";
import {v7} from "uuid";
import {
    defaultEmbeddableType,
    defaultEntity, defaultEnumeration,
    defaultGroup,
    defaultMappedSuperClass,
    defaultModelContextData
} from "@/type/context/default/modelDefaults.ts";
import {tinycolor} from "vue-color";
import {contextDataToSubIds, fillModelSubIds, subDataToSubIds} from "@/type/context/utils/ModelSubIds.ts";
import type {LazyData} from "@/utils/type/lazyDataParse.ts";
import {useClipBoard} from "@/utils/clipBoard/useClipBoard.ts";
import {fillModelGraphSubData, modelSubDataToGraphSubData} from "@/type/context/utils/ModelGraphSubData.ts";
import {contextDataGetSelectSubData, contextDataToSubData} from "@/type/context/utils/ModelSubData.ts";
import {validatePartialModelGraphSubData} from "@/type/context/jsonSchema/PartialModelGraphSubData.ts";
import {withLoading} from "@/components/loading/loadingApi.ts";
import {tableToEntity} from "@/modelEditor/TableEntityConvert/tableToEntity.ts";
import {contextDataToContext} from "@/type/context/utils/ModelContext.ts";
import {findAssociationEdge} from "@/modelEditor/edge/findAssociationEdge.ts";
import {modelSubSelectEventBus} from "@/modelEditor/diagnostic/focusDiagnoseSource.ts";
import {useModelNameSets} from "@/modelEditor/nameSet/ModelNameSets.ts";
import {useModelDiagnoseInfo} from "@/modelEditor/diagnostic/ModelDiagnoseInfo.ts";
import {api} from "@/api";
import {createSqlToJvm} from "@/type/context/utils/TypeTool.ts";
import {useTypeMapping} from "@/modelEditor/typeMapping/useTypeMapping.ts";
import {translate} from "@/store/i18nStore.ts";
import {NodeType_Entity} from "@/modelEditor/node/EntityNode.ts";
import {NodeType_EmbeddableType} from "@/modelEditor/node/EmbeddableTypeNode.ts";
import {NodeType_MappedSuperClass} from "@/modelEditor/node/MappedSuperClassNode.ts";
import {NodeType_Enumeration} from "@/modelEditor/node/EnumerationNode.ts";
import {EdgeType_ConcreteAssociation} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import {EdgeType_AbstractAssociation} from "@/modelEditor/edge/AbstractAssociationEdge.ts";
import {nodeSubElementId} from "@/modelEditor/node/nodeElementId.ts";
import {associationElementId, mappedPropertyElementId} from "@/modelEditor/edge/edgeElementId.ts";

export const VUE_FLOW_ID = "[[__VUE_FLOW_ID__]]"

type MouseAction = "panDrag" | "selectionRect"

export type MenuItem = {
    group: Group
} & GroupSubMaps & {
    entities: ReadonlyArray<EntityWithProperties>,
    mappedSuperClasses: ReadonlyArray<MappedSuperClassWithProperties>,
    embeddableTypes: ReadonlyArray<EmbeddableTypeWithProperties>,
    enumerations: ReadonlyArray<Enumeration>,
}

export const createId = (type: "Entity" | "Property" | "MappedSuperClass" | "EmbeddableType" | "Enumeration" | "EnumerationItem" | "Association" | "Group") => {
    return `${type}_${v7()}`
}

const colorVarName = (id: string) => {
    return `--model-color_${id}`
}
const colorIsDarkMap = ref(new Map<string, boolean>())
export const setColorVar = (id: string, color: string) => {
    document.documentElement.style.setProperty(colorVarName(id), color)
    colorIsDarkMap.value.set(id, tinycolor(color).isDark())
}
export const deleteColorVar = (id: string) => {
    document.documentElement.style.removeProperty(colorVarName(id))
    colorIsDarkMap.value.delete(id)
}
export const getColorVar = (id: string) => {
    return `var(${colorVarName(id)})`
}
export const getColorIsDark = (id: string): boolean => {
    return colorIsDarkMap.value.get(id) ?? false
}

export const CreateType_CONSTANTS = ["Entity", "MappedSuperClass", "EmbeddableType", "Enumeration"] as const
export type CreateType = (typeof CreateType_CONSTANTS)[number]

const CLICK_ADD_NODE_OFFSET_X = 24
const CLICK_ADD_NODE_OFFSET_Y = 16

export const useModelEditor = createStore(() => {
    const vueFlow = shallowRef<VueFlowStore>(useVueFlow(VUE_FLOW_ID))
    const initVueFlow = () => {
        vueFlow.value = useVueFlow(VUE_FLOW_ID)
    }
    const getVueFlow = () => {
        return vueFlow.value
    }
    const viewport = computed<ViewportTransform>(() => {
        return vueFlow.value.viewport.value
    })
    const zoom = computed<number>(() => {
        return viewport.value.zoom
    })

    const contextData = reactive<ModelContextData>(defaultModelContextData())
    const getContextData = () => {
        return contextData
    }

    const {
        history,
        canUndo,
        canRedo,
        menuMap,
        inheritInfo,
        waitChangeSync,
    } = useModelEditorHistory(getContextData, getVueFlow)

    const getContext = () => {
        return contextDataToContext(getContextData(), inheritInfo.value)
    }

    const modelNameSets = useModelNameSets(getContextData(), inheritInfo.value, history)

    const modelDiagnoseInfo = useModelDiagnoseInfo(getContextData(), inheritInfo.value, modelNameSets, history)

    const currentGroupId = ref<string>()
    const toggleCurrentGroup = ({id}: { id: string | undefined }) => {
        const contextData = getContextData()
        if (id !== undefined) {
            if (!contextData.groupMap.has(id)) throw new Error(`[${id}] is not existed`)
            if (!menuMap.value.has(id)) throw new Error(`Menu item [${id}] is not existed`)
        }
        currentGroupId.value = id
    }
    const getCurrentGroupIdOrCreate = (): string => {
        let groupId = currentGroupId.value
        if (groupId === undefined || !menuMap.value.has(groupId)) {
            const firstGroupId = menuMap.value.keys().next().value
            if (firstGroupId !== undefined) {
                groupId = firstGroupId
                toggleCurrentGroup({id: firstGroupId})
            } else {
                const newGroup = defaultGroup()
                newGroup.name = modelNameSets.groupNameSet.next("Default")
                history.executeCommand('group:add', {group: newGroup})
                toggleCurrentGroup({id: newGroup.id})
                groupId = newGroup.id
            }
        }
        return groupId
    }

    const createType = ref<CreateType>("Entity")
    const screenPosition = ref<XYPosition>({x: 0, y: 0})
    const globalZIndex = ref(0)
    const getNextZIndex = () => {
        return globalZIndex.value++
    }

    const getModelGraphSubData = (options?: {selected?: boolean}): ModelGraphSubData => {
        const contextData = getContextData()
        const vueFlow = getVueFlow()
        if (options?.selected) {
            return modelSubDataToGraphSubData(contextDataGetSelectSubData(contextData, modelSelection.selectedIdSets.value), vueFlow)
        } else {
            return modelSubDataToGraphSubData(contextDataToSubData(contextData), vueFlow)
        }
    }
    const getModelGraphData = (options?: {selected?: boolean}): ModelGraphData => {
        const contextData = getContextData()
        const subData = getModelGraphSubData(options)
        return {
            model: contextData.model,
            viewport: viewport.value,
            subData,
        }
    }

    const importModelGraphData = async (data: Partial<ModelGraphSubData>, options?: {
        select?: boolean,
        fitCurrentScreenPosition?: boolean
    }) => {
        const vueFlow = getVueFlow()

        const fullData = fillModelGraphSubData(data)

        let newGroupId: string | undefined
        const requireNewGroup = () => {
            if (newGroupId !== undefined) {
                return newGroupId
            }
            const groupId = getCurrentGroupIdOrCreate()
            toggleCurrentGroup({id: groupId})
            newGroupId = groupId
            return groupId
        }

        if (fullData.groups.length === 0) {
            for (const {data} of fullData.entities) {
                data.groupId = requireNewGroup()
            }
            for (const {data} of fullData.mappedSuperClasses) {
                data.groupId = requireNewGroup()
            }
            for (const {data} of fullData.embeddableTypes) {
                data.groupId = requireNewGroup()
            }
            for (const {data} of fullData.enumerations) {
                data.groupId = requireNewGroup()
            }
        } else {
            const groupIdSet = new Set<string>(fullData.groups.map(it => it.id))
            for (const groupId of contextData.groupMap.keys()) groupIdSet.add(groupId)
            for (const {data} of fullData.entities) {
                if (!groupIdSet.has(data.groupId)) data.groupId = requireNewGroup()
            }
            for (const {data} of fullData.mappedSuperClasses) {
                if (!groupIdSet.has(data.groupId)) data.groupId = requireNewGroup()
            }
            for (const {data} of fullData.embeddableTypes) {
                if (!groupIdSet.has(data.groupId)) data.groupId = requireNewGroup()
            }
            for (const {data} of fullData.enumerations) {
                if (!groupIdSet.has(data.groupId)) data.groupId = requireNewGroup()
            }
        }

        modelSelection.unselectAll()
        const startPosition = options?.fitCurrentScreenPosition ? vueFlow.screenToFlowCoordinate(screenPosition.value) : undefined
        const {ids} = history.executeCommand("import", {data: fullData, startPosition})
        await nextTick()
        await waitChangeSync()

        if (options?.select) {
            modelSelection.select(ids)
        }
    }

    const changeModel = (model: DeepReadonly<Model>) => {
        contextData.model = {
            id: model.id,
            name: model.name,
            description: model.description,
            createdTime: model.createdTime,
            modifiedTime: model.modifiedTime,
            databaseType: model.databaseType,
            databaseNameStrategy: model.databaseNameStrategy,
            defaultForeignKeyType: model.defaultForeignKeyType,
            jvmLanguage: model.jvmLanguage,
            defaultEnumerationStrategy: model.defaultEnumerationStrategy,
        }
    }
    const loadModel = async (
        model: Model,
        data: Partial<ModelGraphSubData>,
        viewport: ViewportTransform
    ) => {
        await withLoading("Model Loading...", async () => {
            remove(contextDataToSubIds(getContextData()))
            await nextTick()
            await waitChangeSync()
            changeModel(model)
            await importModelGraphData(data)
            await nextTick()
            await waitChangeSync()
            await vueFlow.value.setViewport(viewport)
            if (currentGroupId.value === undefined && contextData.groupMap.size > 0) {
                toggleCurrentGroup({id: contextData.groupMap.keys().next().value})
            }
            history.clean()
        })
    }
    const loadTables = async (tables: DeepReadonly<Table[]>) => {
        await withLoading("Table Loading...", async () => {
            const {getSqlToJvmMappingRules} = useTypeMapping()
            const contextData = getContextData()
            const vueFlow = getVueFlow()
            const {
                entities,
                embeddableTypes,
                associations,
            } = tableToEntity(
                tables,
                contextData.model.databaseNameStrategy,
                getCurrentGroupIdOrCreate(),
                createSqlToJvm(getSqlToJvmMappingRules(), contextData.model.jvmLanguage, contextData.model.databaseType)
            )

            if (entities.length + embeddableTypes.length + associations.length === 0) return

            history.executeBatch(Symbol("load tables"), async () => {
                const entityIds = []
                for (const entity of entities) {
                    entityIds.push(addEntity(entity.groupId, entity, {x: 0, y: 0}))
                }
                const embeddableTypeIds = []
                for (const embeddableType of embeddableTypes) {
                    embeddableTypeIds.push(addEmbeddableType(embeddableType.groupId, embeddableType, {x: 0, y: 0}))
                }
                const associationIds = []
                for (const association of associations) {
                    associationIds.push(addAssociation(association))
                }

                const nodes = []

                for (const entityId of entityIds) {
                    const node = vueFlow.findNode(entityId)
                    if (node !== undefined) nodes.push(node)
                }
                for (const embeddableId of embeddableTypeIds) {
                    const node = vueFlow.findNode(embeddableId)
                    if (node !== undefined) nodes.push(node)
                }

                modelSelection.select({
                    entityIds,
                    embeddableTypeIds,
                    associationIds,
                })

                await new Promise((resolve) => window.setTimeout(resolve, 0))

                const size = Math.max(Math.ceil(Math.sqrt(nodes.length)), 1)

                const {x: startX, y: startY} = vueFlow.screenToFlowCoordinate({
                    x: vueFlow.dimensions.value.width * 0.15 + (vueFlow.vueFlowRef.value?.getBoundingClientRect().left ?? 0),
                    y: vueFlow.dimensions.value.height * 0.15,
                })
                let i = 0
                let x = startX
                let y = startY
                let maxWidth = 0
                for (const node of nodes) {
                    node.position = {x, y}
                    if (node.dimensions.width > maxWidth) {
                        maxWidth = node.dimensions.width
                    }
                    y += node.dimensions.height + 64
                    i++
                    if (i % size === 0) {
                        x += maxWidth + 64
                        maxWidth = 0
                        y = startY
                    }
                }
            })
        })
    }

    const saveModel = async () => {
        await withLoading("Model Saving...", async () => {
            const graphData = getModelGraphSubData()
            try {
                await api.modelService.update({
                    body: {
                        ...contextData.model,
                        jsonData: JSON.stringify(graphData),
                        viewport: viewport.value
                    }
                })
                sendMessage("模型保存成功", {type: "success"})
            } catch (e) {
                sendMessage(`模型保存失败: ${e}`, {type: "warning"})
            }
        })
    }

    const addGroup = (group: Group = defaultGroup()) => {
        group.name = modelNameSets.groupNameSet.next(group.name)
        history.executeCommand('group:add', {group})
        return group
    }
    const changeGroup = (group: DeepReadonly<Group>) => {
        history.executeCommand('group:change', {group})
    }
    const addEntity = (
        groupId: string = getCurrentGroupIdOrCreate(),
        entity: EntityWithProperties = defaultEntity(groupId),
        position: XYPosition
    ) => {
        entity.name = modelNameSets.entityNameSet.next(entity.name)
        history.executeCommand('entity:add', {entity, position})
        return entity.id
    }
    const changeEntity = (entity: DeepReadonly<EntityWithProperties>) => {
        history.executeCommand('entity:change', {entity})
    }
    const addMappedSuperClass = (
        groupId: string = getCurrentGroupIdOrCreate(),
        mappedSuperClass: MappedSuperClassWithProperties = defaultMappedSuperClass(groupId),
        position: XYPosition
    ) => {
        mappedSuperClass.name = modelNameSets.mappedSuperClassNameSet.next(mappedSuperClass.name)
        history.executeCommand('mapped-super-class:add', {mappedSuperClass, position})
        return mappedSuperClass.id
    }
    const changeMappedSuperClass = (mappedSuperClass: DeepReadonly<MappedSuperClassWithProperties>) => {
        history.executeCommand('mapped-super-class:change', {mappedSuperClass})
    }
    const addEmbeddableType = (
        groupId: string = getCurrentGroupIdOrCreate(),
        embeddableType: EmbeddableTypeWithProperties = defaultEmbeddableType(groupId),
        position: XYPosition
    ) => {
        embeddableType.name = modelNameSets.embeddableTypeNameSet.next(embeddableType.name)
        history.executeCommand('embeddable-type:add', {embeddableType, position})
        return embeddableType.id
    }
    const changeEmbeddableType = (embeddableType: DeepReadonly<EmbeddableTypeWithProperties>) => {
        history.executeCommand('embeddable-type:change', {embeddableType})
    }
    const addEnumeration = (
        groupId: string = getCurrentGroupIdOrCreate(),
        enumeration: Enumeration = defaultEnumeration(groupId, contextData.model.defaultEnumerationStrategy),
        position: XYPosition
    ) => {
        enumeration.name = modelNameSets.enumerationNameSet.next(enumeration.name)
        history.executeCommand('enumeration:add', {enumeration, position})
        return enumeration.id
    }
    const changeEnumeration = (enumeration: DeepReadonly<Enumeration>) => {
        history.executeCommand('enumeration:change', {enumeration})
    }
    const addAssociation = (
        association: AssociationIdOnly,
        labelPosition: LabelPosition = {
            from: 'source',
            fixedLength: 350,
        }
    ) => {
        if ("name" in association) {
            association.name = modelNameSets.associationNameSet.next(association.name)
        }
        history.executeCommand('association:add', {association, labelPosition})
        return association.id
    }
    const changeAssociation = (association: DeepReadonly<AssociationIdOnly>) => {
        const contextData = getContextData()
        const edgedAssociation = contextData.associationMap.get(association.id)
        if (!edgedAssociation) throw new Error(`Association [${association.id}] not found`)
        history.executeCommand('association:change', {association, labelPosition: edgedAssociation.labelPosition})
    }

    const remove = (
        ids: Partial<ModelSubIds>
    ) => {
        return history.executeCommand("remove", fillModelSubIds(ids))
    }

    // Selection 选中部分的图数据
    const modelSelection = useModelEditorSelectIds({getContextData, getVueFlow, getNextZIndex})

    const modelSelectionCount = computed<number>(() => {
        const idSets = modelSelection.selectedIdSets.value
        return idSets.groupIdSet.size +
            idSets.entityIdSet.size +
            idSets.mappedSuperClassIdSet.size +
            idSets.embeddableTypeIdSet.size +
            idSets.enumerationIdSet.size
    })

    const getGraphSelection = () => {
        const vueFlow = getVueFlow()
        return {
            nodes: vueFlow.getSelectedNodes.value,
            edges: vueFlow.getSelectedEdges.value,
        }
    }

    const clearGraphSelection = () => {
        const vueFlow = getVueFlow()
        vueFlow.removeSelectedNodes(vueFlow.getSelectedNodes.value)
        vueFlow.removeSelectedEdges(vueFlow.getSelectedEdges.value)
    }

    const focus = () => {
        const vueFlow = getVueFlow()
        vueFlow.vueFlowRef.value?.focus()
    }


    /**
     * 点击多选相关配置
     */
    const canMultiSelect = computed(() => {
        const vueFlow = getVueFlow()
        return vueFlow.multiSelectionActive.value
    })
    const enableMultiSelect = (vueFlow: VueFlowStore = getVueFlow()) => {
        vueFlow.multiSelectionActive.value = true
    }
    const disableMultiSelect = (vueFlow: VueFlowStore = getVueFlow()) => {
        vueFlow.multiSelectionActive.value = false
    }
    const toggleMultiSelect = (vueFlow: VueFlowStore = getVueFlow()) => {
        if (vueFlow.multiSelectionActive.value) {
            disableMultiSelect(vueFlow)
        } else {
            enableMultiSelect(vueFlow)
        }
    }

    const selectGraphAll = (vueFlow: VueFlowStore = getVueFlow()) => {
        const isCurrentMultiSelect = vueFlow.multiSelectionActive.value

        if (!isCurrentMultiSelect) enableMultiSelect(vueFlow)
        if (vueFlow.getSelectedNodes.value.length < vueFlow.getNodes.value.length) {
            vueFlow.addSelectedNodes(vueFlow.getNodes.value)
        }
        if (vueFlow.getSelectedEdges.value.length < vueFlow.getEdges.value.length) {
            vueFlow.addSelectedEdges(vueFlow.getEdges.value)
        }
        if (!isCurrentMultiSelect) disableMultiSelect(vueFlow)
    }

    const toggleSelectGraphAll = (vueFlow: VueFlowStore = getVueFlow()) => {
        const isCurrentMultiSelect = vueFlow.multiSelectionActive.value

        if (!isCurrentMultiSelect) enableMultiSelect(vueFlow)
        if (vueFlow.getSelectedNodes.value.length < vueFlow.getNodes.value.length || vueFlow.getSelectedEdges.value.length < vueFlow.getEdges.value.length) {
            vueFlow.addSelectedNodes(vueFlow.getNodes.value)
            vueFlow.addSelectedEdges(vueFlow.getEdges.value)
        } else {
            vueFlow.removeSelectedNodes(vueFlow.getNodes.value)
            vueFlow.removeSelectedEdges(vueFlow.getEdges.value)
        }
        if (!isCurrentMultiSelect) disableMultiSelect(vueFlow)
    }

    /**
     * 框选相关配置
     */
    let selectionRectEnable: boolean = false
    let selectionRectMouseButton: number = 0
    const selectionRect = ref<{
        x: number,
        y: number,
        width: number,
        height: number
    } | null>(null)

    const getByClientRect = (
        rect: {
            readonly x: number,
            readonly y: number,
            readonly width: number,
            readonly height: number
        },
        vueFlow: VueFlowStore = getVueFlow()
    ) => {
        const innerNodes: GraphNode[] = []
        const innerEdges: GraphEdge[] = []

        const leftTop = vueFlow.screenToFlowCoordinate({x: rect.x, y: rect.y})
        const rightBottom = vueFlow.screenToFlowCoordinate({x: rect.x + rect.width, y: rect.y + rect.height})

        for (const node of vueFlow.getNodes.value) {
            const nodeLeft = node.position.x
            const nodeRight = node.position.x + node.dimensions.width
            const nodeTop = node.position.y
            const nodeBottom = node.position.y + node.dimensions.height

            if (
                nodeRight > leftTop.x &&
                nodeLeft < rightBottom.x &&
                nodeBottom > leftTop.y &&
                nodeTop < rightBottom.y
            ) {
                innerNodes.push(node);
            }
        }

        for (const edge of vueFlow.getEdges.value) {
            if (
                edge.sourceX > leftTop.x &&
                edge.sourceX < rightBottom.x &&
                edge.sourceY > leftTop.y &&
                edge.sourceY < rightBottom.y &&
                edge.targetX > leftTop.x &&
                edge.targetX < rightBottom.x &&
                edge.targetY > leftTop.y &&
                edge.targetY < rightBottom.y
            ) {
                innerEdges.push(edge);
            }
        }

        return {nodes: innerNodes, edges: innerEdges}
    }


    /**
     * 同步边连接信息
     */
    const isConnecting = ref(false)
    const connectSourceNodeId = ref<string>()

    /**
     * 默认鼠标行为
     */
    const defaultMouseAction = ref<MouseAction>('panDrag')

    // 默认操作为拖拽
    const setDefaultPanDrag = (
        vueFlow: VueFlowStore = getVueFlow()
    ) => {
        defaultMouseAction.value = 'panDrag'
        vueFlow.panOnDrag.value = [0, 2]
        selectionRectMouseButton = 2
        selectionRectEnable = false
        focus()
    }
    // 默认操作为框选，通过鼠标右键拖拽
    const setDefaultSelectionRect = (
        vueFlow: VueFlowStore = getVueFlow()
    ) => {
        defaultMouseAction.value = 'selectionRect'
        vueFlow.panOnDrag.value = [2]
        selectionRectMouseButton = 0
        selectionRectEnable = true
        focus()
    }
    const toggleDefaultMouseAction = (
        vueFlow: VueFlowStore = getVueFlow()
    ) => {
        if (defaultMouseAction.value === 'panDrag') {
            setDefaultSelectionRect(vueFlow)
        } else {
            setDefaultPanDrag(vueFlow)
        }
    }

    const canDrag = computed(() => {
        const vueFlow = getVueFlow()
        return vueFlow.nodesDraggable.value
    })
    const disableDrag = (
        vueFlow: VueFlowStore = getVueFlow()
    ) => {
        vueFlow.nodesDraggable.value = false
    }
    const enableDrag = (
        vueFlow: VueFlowStore = getVueFlow()
    ) => {
        vueFlow.nodesDraggable.value = true
    }

    const setLayerConfigDefault = (
        vueFlow: VueFlowStore = getVueFlow()
    ) => {
        disableMultiSelect(vueFlow)
        setDefaultPanDrag(vueFlow)
        enableDrag(vueFlow)
    }

    /**
     * 剪切板
     */
    const clipBoard = useClipBoard<Partial<ModelGraphSubData>, ModelGraphSubData>({
        exportData: (): ModelGraphSubData => {
            return getModelGraphSubData({selected: true})
        },
        importData: async (data: Partial<ModelGraphSubData>) => {
            await importModelGraphData(data, {
                select: true,
                fitCurrentScreenPosition: true,
            })
        },
        removeData: (data: ModelGraphSubData) => {
            remove(subDataToSubIds(data))
        },
        stringifyData: (data: ModelGraphSubData): string => {
            return jsonSortPropStringify(data)
        },
        validateInput: validatePartialModelGraphSubData
    })

    const initModelEditor = () => {
        initVueFlow()
        const vueFlow = getVueFlow()

        setLayerConfigDefault(vueFlow)

        const {
            vueFlowRef,
            onInit,

            screenToFlowCoordinate,

            onNodesChange,
            onNodeDragStart,
            onNodeDragStop,
            onEdgesChange,
        } = vueFlow

        onInit(() => {
            const el = vueFlowRef.value
            const viewportEl = vueFlowRef.value
            const paneEl = el?.querySelector('div.vue-flow__pane') as HTMLDivElement | null

            if (el === null || viewportEl === null || paneEl === null) {
                throw new Error(`Vue Flow Ref is undefined in onInit`)
            }

            /**
             * 选择同步
             */
            onNodesChange(modelSelection.syncNodeSelectChange)
            onEdgesChange(modelSelection.syncEdgeSelectChange)

            /**
             * 节点移动
             */
            const nodeMoveMap = new Map<string, XYPosition>

            onNodesChange((changes) => {
                if (nodeMoveMap.size !== 0) return

                history.executeBatch(Symbol("node:move"), () => {
                    for (const change of changes) {
                        if (change.type === 'position') {
                            history.pushCommand('node:move', {
                                id: change.id,
                                oldPosition: change.from,
                                newPosition: change.position
                            }, {
                                id: change.id,
                                oldPosition: change.from,
                            })
                        }
                    }
                })
            })

            onNodeDragStart(({nodes}) => {
                nodeMoveMap.clear()
                for (const node of nodes) {
                    nodeMoveMap.set(node.id, node.position)
                }
            })

            onNodeDragStop(({nodes}) => {
                history.executeBatch(Symbol("node:move"), () => {
                    for (const node of nodes) {
                        const oldPosition = nodeMoveMap.get(node.id)
                        nodeMoveMap.delete(node.id)
                        if (oldPosition !== undefined) {
                            const newPosition = node.position
                            if (jsonSortPropStringify(oldPosition) !== jsonSortPropStringify(newPosition)) {
                                history.executeCommand('node:move', {
                                    id: node.id,
                                    newPosition,
                                    oldPosition
                                })
                            }
                        }
                    }
                })
                nodeMoveMap.clear()
            })

            // 设置屏幕位置
            paneEl.addEventListener('mouseenter', (e) => {
                screenPosition.value = {x: e.clientX, y: e.clientY}
            })
            paneEl.addEventListener('mousemove', (e) => {
                screenPosition.value = {x: e.clientX, y: e.clientY}
            })

            // 双击添加节点
            let waitNextMouseDown = false
            let waitTimeout: number | undefined
            // 记录上一次 mousedown 以避免误触
            let lastMouseTime = new Date().getTime()
            let lastMousePosition: XYPosition | null = null

            paneEl.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return
                if (e.target !== paneEl) return

                const currentTime = new Date().getTime()
                const currentMousePosition = {x: e.clientX, y: e.clientY}

                if (waitNextMouseDown) {
                    waitNextMouseDown = false
                    clearTimeout(waitTimeout)

                    const timeDiff = currentTime - lastMouseTime
                    if (timeDiff > 0 && timeDiff < 300 && lastMousePosition !== null) {
                        if (
                            Math.abs(currentMousePosition.x - lastMousePosition.x) < 10 &&
                            Math.abs(currentMousePosition.y - lastMousePosition.y) < 10
                        ) {
                            history.executeBatch(Symbol('click:add'), () => {
                                const position = screenToFlowCoordinate(currentMousePosition)
                                position.x -= CLICK_ADD_NODE_OFFSET_X
                                position.y -= CLICK_ADD_NODE_OFFSET_Y
                                switch (createType.value) {
                                    case "Entity":
                                        addEntity(undefined, undefined, position)
                                        break;
                                    case "MappedSuperClass":
                                        addMappedSuperClass(undefined, undefined, position)
                                        break;
                                    case "EmbeddableType":
                                        addEmbeddableType(undefined, undefined, position)
                                        break;
                                    case "Enumeration":
                                        addEnumeration(undefined, undefined, position)
                                        break;
                                }
                            })
                        }
                    }

                    lastMousePosition = null
                } else {
                    waitNextMouseDown = true
                    waitTimeout = window.setTimeout(() => {
                        waitNextMouseDown = false
                        lastMousePosition = null
                    }, 300)

                    lastMouseTime = currentTime
                    lastMousePosition = currentMousePosition
                }
            })

            // 鼠标移入非交互元素时，允许拖拽，否则禁止画布拖拽
            let currentPanOnDrag = vueFlow.panOnDrag.value
            paneEl.addEventListener('mouseover', (e) => {
                if (selectionRectEnable) return
                if (vueFlow.panOnDrag.value !== false && judgeTargetIsInteraction(e)) {
                    currentPanOnDrag = vueFlow.panOnDrag.value
                    vueFlow.panOnDrag.value = false
                } else if (currentPanOnDrag !== false) {
                    vueFlow.panOnDrag.value = currentPanOnDrag
                }
            })

            // 多选框
            paneEl.addEventListener('mousedown', (e) => {
                if (!vueFlowRef.value) return
                if (e.target !== paneEl) return
                if (!selectionRectEnable) return
                if (e.button !== selectionRectMouseButton) return

                const clientRect = vueFlowRef.value.getBoundingClientRect()
                const rectX = clientRect.x
                const rectY = clientRect.y

                e.preventDefault()
                blurActiveElement()

                vueFlow.multiSelectionActive.value = true
                clearGraphSelection()

                const startX = e.clientX
                const startY = e.clientY

                const onRectSelect = (e: MouseEvent) => {
                    e.preventDefault()
                    const currentX = e.clientX
                    const currentY = e.clientY
                    const width = Math.abs(currentX - startX)
                    const height = Math.abs(currentY - startY)
                    const x = Math.min(startX, currentX)
                    const y = Math.min(startY, currentY)

                    selectionRect.value = {
                        width,
                        height,
                        x: x - rectX,
                        y: y - rectY,
                    }
                }

                const onRectSelectEnd = () => {
                    document.documentElement.removeEventListener('mousemove', onRectSelect)
                    document.documentElement.removeEventListener('mouseup', onRectSelectEnd)

                    if (selectionRect.value) {
                        const {nodes, edges} = getByClientRect({
                            width: selectionRect.value.width,
                            height: selectionRect.value.height,
                            x: selectionRect.value.x + rectX,
                            y: selectionRect.value.y + rectY,
                        })

                        clearGraphSelection()
                        vueFlow.addSelectedNodes(nodes)
                        vueFlow.addSelectedEdges(edges)
                    }

                    vueFlow.userSelectionActive.value = false
                    selectionRect.value = null

                    const newSelectedNodes = vueFlow.getSelectedNodes.value
                    const newSelectedEdges = vueFlow.getSelectedEdges.value
                    window.setTimeout(() => {
                        clearGraphSelection()
                        vueFlow.addSelectedNodes(newSelectedNodes)
                        vueFlow.addSelectedEdges(newSelectedEdges)
                        vueFlow.multiSelectionActive.value = false
                    })
                }

                document.documentElement.addEventListener('mousemove', onRectSelect)
                document.documentElement.addEventListener('mouseup', onRectSelectEnd)
            })
        })
    }
    const destroyModelEditor = () => {
        remove(contextDataToSubIds(getContextData()))
        getVueFlow().$destroy()
    }

    const FIT_BOUND_MIN_W = 320
    const FIT_BOUND_DURATION = 500
    const FIT_BOUND_PADDING = 0.4
    const FIT_BOUND_DEFAULT_OPTION = {
        duration: FIT_BOUND_DURATION,
        padding: FIT_BOUND_PADDING,
    }
    const getInnerElementRect = (element: HTMLElement) => {
        const vueFlow = getVueFlow()
        const rect = element.getBoundingClientRect()
        const {x: rectX, y: rectY} = vueFlow.screenToFlowCoordinate({x: rect.left, y: rect.top})
        const rectWidth = rect.width / vueFlow.viewport.value.zoom
        const rectHeight = rect.height / vueFlow.viewport.value.zoom
        return {
            x: rectX,
            y: rectY,
            width: rectWidth,
            height: rectHeight,
        }
    }

    const getNode = (node: GraphNode | string): GraphNode => {
        const vueFlow = getVueFlow()
        let _node: GraphNode
        if (typeof node === 'string') {
            const foundNode = vueFlow.findNode(node)
            if (!foundNode) throw new Error(`node [${node}] is not existed`)
            _node = foundNode
        } else {
            _node = node
        }
        return _node
    }
    const selectNode = (node: GraphNode | string) => {
        const _node: GraphNode = getNode(node)
        if (_node.type === NodeType_Entity) {
            modelSelection.selectEntity(_node.id)
        } else if (_node.type === NodeType_EmbeddableType) {
            modelSelection.selectEmbeddableType(_node.id)
        } else if (_node.type === NodeType_MappedSuperClass) {
            modelSelection.selectMappedSuperClass(_node.id)
        } else if (_node.type === NodeType_Enumeration) {
            modelSelection.selectEnumeration(_node.id)
        } else {
            getVueFlow().addSelectedNodes([_node])
        }
    }
    const nodeToFront = (node: GraphNode | string) => {
        const _node: GraphNode = getNode(node)
        _node.zIndex = getNextZIndex()
    }
    const focusNode = async (node: GraphNode | string) => {
        const vueFlow = getVueFlow()
        const _node: GraphNode = getNode(node)
        _node.zIndex = getNextZIndex()
        modelSelection.unselectAll()
        selectNode(_node.id)
        await vueFlow.fitBounds({
            x: _node.computedPosition.x,
            y: _node.computedPosition.y,
            width: Math.max(_node.dimensions.width, FIT_BOUND_MIN_W),
            height: _node.dimensions.height,
        }, FIT_BOUND_DEFAULT_OPTION)
        return _node
    }
    const focusNodeAndFitSub = async (node: GraphNode | string, subId: string) => {
        const vueFlow = getVueFlow()
        const _node: GraphNode = getNode(node)
        _node.zIndex = getNextZIndex()
        modelSelection.unselectAll()
        selectNode(_node.id)
        const element = document.getElementById(subId)
        if (element !== null) {
            await vueFlow.fitBounds(getInnerElementRect(element), FIT_BOUND_DEFAULT_OPTION)
        } else {
            await vueFlow.fitBounds({
                x: _node.computedPosition.x,
                y: _node.computedPosition.y,
                width: Math.max(_node.dimensions.width, FIT_BOUND_MIN_W),
                height: _node.dimensions.height,
            }, FIT_BOUND_DEFAULT_OPTION)
        }
        return _node
    }

    const getEdge = (edge: GraphEdge | string): GraphEdge => {
        const vueFlow = getVueFlow()
        let _edge: GraphEdge
        if (typeof edge === 'string') {
            const foundEdge = vueFlow.findEdge(edge) ?? findAssociationEdge(edge, vueFlow)
            if (!foundEdge) throw new Error(`edge [${edge}] is not existed`)
            _edge = foundEdge
        } else {
            _edge = edge
        }
        return _edge
    }
    const selectEdge = (edge: GraphEdge | string) => {
        const _edge = getEdge(edge)
        if (_edge.type === EdgeType_ConcreteAssociation || _edge.type === EdgeType_AbstractAssociation) {
            modelSelection.selectAssociation(_edge.id)
        } else {
            getVueFlow().addSelectedEdges([_edge])
        }
    }
    const edgeToFront = (edge: GraphEdge | string) => {
        const _edge = getEdge(edge)
        _edge.zIndex = getNextZIndex()
    }
    const focusEdge = async (edge: GraphEdge | string) => {
        const vueFlow = getVueFlow()
        const _edge = getEdge(edge)
        _edge.zIndex = getNextZIndex()
        modelSelection.unselectAll()
        selectEdge(_edge.id)
        const element = document.getElementById(associationElementId(_edge.id))
        if (element !== null) {
            await vueFlow.fitBounds(getInnerElementRect(element), FIT_BOUND_DEFAULT_OPTION)
        }
        return _edge
    }
    const focusEdgeAndFitSub = async (edge: GraphEdge | string, subId: string) => {
        const vueFlow = getVueFlow()
        const _edge = getEdge(edge)
        _edge.zIndex = getNextZIndex()
        modelSelection.unselectAll()
        selectEdge(_edge.id)
        const element = document.getElementById(subId)
        if (element !== null) {
            await vueFlow.fitBounds(getInnerElementRect(element), FIT_BOUND_DEFAULT_OPTION)
        } else {
            const associationElement = document.getElementById(associationElementId(_edge.id))
            if (associationElement !== null) {
                await vueFlow.fitBounds(getInnerElementRect(associationElement), FIT_BOUND_DEFAULT_OPTION)
            }
        }
        return _edge
    }

    const focusEntityProperty = async (source: {entityId: string, propertyId: string}) => {
        modelSubSelectEventBus.emit("unselectAll")
        modelSubSelectEventBus.emit("selectEntityProperty", source)
        await focusNodeAndFitSub(source.entityId, nodeSubElementId(source.entityId, source.propertyId))
    }
    const focusMappedSuperClassProperty = async (source: {mappedSuperClassId: string, propertyId: string}) => {
        modelSubSelectEventBus.emit("unselectAll")
        modelSubSelectEventBus.emit("selectMappedSuperClassProperty", source)
        await focusNodeAndFitSub(source.mappedSuperClassId, nodeSubElementId(source.mappedSuperClassId, source.propertyId))
    }
    const focusEmbeddableTypeProperty = async (source: {embeddableTypeId: string, propertyId: string}) => {
        modelSubSelectEventBus.emit("unselectAll")
        modelSubSelectEventBus.emit("selectEmbeddableTypeProperty", source)
        await focusNodeAndFitSub(source.embeddableTypeId, nodeSubElementId(source.embeddableTypeId, source.propertyId))
    }
    const focusEnumerationItem = async (source: {enumerationId: string, itemId: string}) => {
        modelSubSelectEventBus.emit("unselectAll")
        modelSubSelectEventBus.emit("selectEnumerationItem", source)
        await focusNodeAndFitSub(source.enumerationId, nodeSubElementId(source.enumerationId, source.itemId))
    }
    const focusMappedProperty = async (source: {associationId: string}) => {
        modelSubSelectEventBus.emit("unselectAll")
        modelSubSelectEventBus.emit("selectMappedProperty", source)
        await focusEdgeAndFitSub(source.associationId, mappedPropertyElementId(source.associationId))
    }

    const focusDiagnosticSource = async (source: DiagnosticSource) => {
        switch (source.type) {
            case "Group": modelSelection.selectGroup(source.id); break;
            case "Entity": await focusNode(source.id); break;
            case "MappedSuperClass": await focusNode(source.id); break;
            case "EmbeddableType": await focusNode(source.id); break;
            case "Enumeration": await focusNode(source.id); break;
            case "Association": await focusEdge(source.id); break;
            case "EntityProperty": await focusEntityProperty(source); break;
            case "MappedSuperClassProperty": await focusMappedSuperClassProperty(source); break;
            case "EmbeddableTypeProperty": await focusEmbeddableTypeProperty(source); break;
            case "EnumerationItem": await focusEnumerationItem(source); break;
            case "MappedProperty": await focusMappedProperty(source); break;
        }
    }

    return {
        // 图的信息与操作
        initModelEditor,
        destroyModelEditor,
        focus,

        viewport,
        zoom,
        fitView: () => {
            return getVueFlow().fitView({duration: 600, padding: 0.1})
        },
        fitRect: (rect: Rect) => {
            return getVueFlow().fitBounds(rect, {duration: 800, padding: 0.4})
        },

        getNextZIndex,
        nodeToFront,
        edgeToFront,
        focusNode,
        focusEdge,
        focusEntityProperty,
        focusMappedSuperClassProperty,
        focusEmbeddableTypeProperty,
        focusEnumerationItem,
        focusMappedProperty,
        focusDiagnosticSource,

        // 历史记录
        canUndo: readonly(canUndo),
        canRedo: readonly(canRedo),
        undo: () => {
            if (canUndo.value) {
                try {
                    history.undo()
                    sendMessage(translate("undo"), {type: "success"})
                } catch (e) {
                    console.warn(e)
                    sendMessage(translate("undo_fail"), {type: "warning"})
                }
            } else {
                sendMessage(translate("cannot_undo"), {type: "warning"})
            }
            focus()
        },
        redo: () => {
            if (canRedo.value) {
                try {
                    history.redo()
                    sendMessage(translate("redo"), {type: "success"})
                } catch (e) {
                    console.warn(e)
                    sendMessage(translate("redo_fail"), {type: "warning"})
                }
            } else {
                sendMessage(translate("cannot_redo"), {type: "warning"})
            }
            focus()
        },
        waitChangeSync,

        executeBatch: history.executeBatch,
        executeAsyncBatch: history.executeAsyncBatch,

        // 选择
        modelSelection,
        selectedIdSets: modelSelection.selectedIdSets,
        modelSelectionCount,

        graphSelection: {
            get: getGraphSelection,
            selectNode,
            selectEdge,
            selectAll: selectGraphAll,
            unselectAll: clearGraphSelection,
            toggleSelectAll: toggleSelectGraphAll,
            selectedCount: computed(() => {
                const vueFlow = getVueFlow()
                return (vueFlow.getSelectedNodes.value.length + vueFlow.getSelectedEdges.value.length)
            })
        },

        selectionRect: readonly(selectionRect),
        canMultiSelect,
        disableMultiSelect,
        enableMultiSelect,
        toggleMultiSelect,

        // 鼠标行为
        defaultMouseAction: readonly(defaultMouseAction),
        toggleDefaultMouseAction,

        canDrag,
        disableDrag,
        enableDrag,

        // 连接
        isConnecting,
        connectSourceNodeId,


        // 模型
        contextData: readonly(contextData),

        modelNameSets,
        modelDiagnoseInfo,
        getContext,
        getModelGraphSubData,
        getModelGraphData,

        changeModel,
        loadModel,
        loadTables,
        saveModel,

        menuMap,
        inheritInfo,

        currentGroupId,
        toggleCurrentGroup,

        createType,

        // 模型数据变更
        addGroup,
        changeGroup,
        addEntity,
        changeEntity,
        addEmbeddableType,
        changeEmbeddableType,
        addMappedSuperClass,
        changeMappedSuperClass,
        addEnumeration,
        changeEnumeration,
        addAssociation,
        changeAssociation,

        remove,

        copy: async (
            data: LazyData<ModelGraphSubData> | undefined = undefined,
        ) => {
            try {
                const result = await clipBoard.copy(data)
                sendMessage(translate("copy_success_tip"), {type: "success"})
                focus()
                return result
            } catch (e) {
                sendMessage(translate("copy_fail_tip"), {type: "warning"})
                throw e
            }
        },
        paste: async () => {
            try {
                const result = await clipBoard.paste()
                sendMessage(translate("paste_success_tip"), {type: "success"})
                focus()
                return result
            } catch (e) {
                sendMessage(translate("paste_fail_tip"), {type: "warning"})
                throw e
            }
        },
        cut: async () => {
            try {
                const result = await clipBoard.cut()
                sendMessage(translate("cut_success_tip"), {type: "success"})
                focus()
                return result
            } catch (e) {
                sendMessage(translate("cut_fail_tip"), {type: "warning"})
                throw e
            }
        },
    }
})