import {createStore} from "@/utils/store/createStore.ts";
import {computed, nextTick, readonly, ref, shallowRef} from "vue";
import {useModelEditorHistory} from "@/modelEditor/history/ModelEditorHistory.ts";
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
import {v7 as uuid} from "uuid";
import {
    defaultEmbeddableType,
    defaultEntity, defaultEnumeration,
    defaultGroup,
    defaultMappedSuperClass,
    defaultModel
} from "@/type/context/default/modelDefaults.ts";
import {tinycolor} from "vue-color";
import {defaultModelSubIds, fillModelSubIds, subDataToSubIds} from "@/type/context/utils/ModelSubIds.ts";
import {NodeType_Entity} from "@/modelEditor/node/EntityNode.ts";
import {NodeType_MappedSuperClass} from "@/modelEditor/node/MappedSuperClassNode.ts";
import {NodeType_Enumeration} from "@/modelEditor/node/EnumerationNode.ts";
import {NodeType_EmbeddableType} from "@/modelEditor/node/EmbeddableTypeNode.ts";
import {EdgeType_ConcreteAssociation} from "@/modelEditor/edge/ConcreteAssociationEdge.ts";
import type {LazyData} from "@/utils/type/lazyDataParse.ts";
import {useClipBoard} from "@/utils/clipBoard/useClipBoard.ts";
import {fillModelGraphSubData, modelDataToGraphData} from "@/type/context/utils/ModelGraphSubData.ts";
import {contextDataGetSelectSubData} from "@/type/context/utils/ModelSubData.ts";
import {validatePartialModelGraphSubData} from "@/modelEditor/graphData/ModelGraphSubData.ts";
import {buildNameSets} from "@/modelEditor/import/protectRepeatNames.ts";

export const VUE_FLOW_ID = "[[__VUE_FLOW_ID__]]"

type MouseAction = "panDrag" | "selectionRect"

export type MenuItem = {
    group: Group
} & GroupSubMaps & {
    orderedEntities: ReadonlyArray<EntityWithProperties>,
    orderedMappedSuperClasses: ReadonlyArray<MappedSuperClassWithProperties>,
    orderedEmbeddableTypes: ReadonlyArray<EmbeddableTypeWithProperties>,
    orderedEnumerations: ReadonlyArray<Enumeration>,
}

export const createId = (type: "Model" | "Entity" | "Property" | "MappedSuperClass" | "EmbeddableType" | "Enumeration" | "EnumerationItem" | "Association" | "Group") => {
    return `${type}_${uuid()}`
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

export const useModelEditor = createStore(() => {
    const vueFlow = shallowRef<VueFlowStore>(useVueFlow(VUE_FLOW_ID))
    const viewport = computed<ViewportTransform>(() => {
        return vueFlow.value.viewport.value
    })
    const zoom = computed<number>(() => {
        return viewport.value.zoom
    })

    const getCurrentVueFlow = () => {
        if (!vueFlow.value) {
            throw new Error("VueFlow is not set")
        }
        return vueFlow.value
    }

    // TODO to fetch
    const contextData = ref<ModelContextData | undefined>(defaultModel())
    const getContextData = () => {
        if (!contextData.value) {
            throw new Error("ContextData is not available")
        }
        return contextData.value
    }

    const currentGroupId = ref<string>()
    const toggleCurrentGroup = ({id}: { id: string | undefined }) => {
        const contextData = getContextData()
        if (id !== undefined) {
            if (!contextData.groupMap.has(id)) throw new Error(`Group [${id}] is not existed`)
            if (!menuMap.value.has(id)) throw new Error(`Menu item [${id}] is not existed`)
        }
        currentGroupId.value = id
    }
    const getCurrentGroupIdOrCreate = () => {
        let groupId = currentGroupId.value
        if (groupId === undefined || !menuMap.value.has(groupId)) {
            const newGroup = defaultGroup()
            newGroup.name = "Default"
            history.executeCommand('group:add', {group: newGroup})
            toggleCurrentGroup({id: newGroup.id})
            groupId = newGroup.id
        }
        return groupId
    }

    const createType = ref<CreateType>("Entity")
    const screenPosition = ref<XYPosition>({x: 0, y: 0})
    const globalZIndex = ref(0)
    const getNextZIndex = () => {
        return globalZIndex.value++
    }

    const {
        history,
        canUndo,
        canRedo,
        menuMap,
        waitChangeSync,
    } = useModelEditorHistory({vueFlow, contextData})

    const setModel = (data: ModelContextData) => {
        contextData.value = data
    }
    const saveModel = async () => {
        // TODO
    }

    const addGroup = (group: Group = defaultGroup()) => {
        const contextData = getContextData()
        const groupNameSet = buildNameSets(contextData.groupMap.values())
        group.name = groupNameSet.next(group.name)
        history.executeCommand('group:add', {group})
        return group.id
    }
    const addEntity = (
        groupId: string = getCurrentGroupIdOrCreate(),
        entity: EntityWithProperties = defaultEntity(groupId),
        position: XYPosition = screenPosition.value
    ) => {
        const contextData = getContextData()
        const entityNameSet = buildNameSets(contextData.entityMap.values())
        entity.name = entityNameSet.next(entity.name)
        history.executeCommand('entity:add', {entity, position})
        return entity.id
    }
    const addMappedSuperClass = (
        groupId: string = getCurrentGroupIdOrCreate(),
        mappedSuperClass: MappedSuperClassWithProperties = defaultMappedSuperClass(groupId),
        position: XYPosition = screenPosition.value
    ) => {
        const contextData = getContextData()
        const mappedSuperClassNameSet = buildNameSets(contextData.mappedSuperClassMap.values())
        mappedSuperClass.name = mappedSuperClassNameSet.next(mappedSuperClass.name)
        history.executeCommand('mapped-super-class:add', {mappedSuperClass, position})
        return mappedSuperClass.id
    }
    const addEmbeddableType = (
        groupId: string = getCurrentGroupIdOrCreate(),
        embeddableType: EmbeddableTypeWithProperties = defaultEmbeddableType(groupId),
        position: XYPosition = screenPosition.value
    ) => {
        const contextData = getContextData()
        const embeddableTypeNameSet = buildNameSets(contextData.embeddableTypeMap.values())
        embeddableType.name = embeddableTypeNameSet.next(embeddableType.name)
        history.executeCommand('embeddable-type:add', {embeddableType, position})
        return embeddableType.id
    }
    const addEnumeration = (
        groupId: string = getCurrentGroupIdOrCreate(),
        enumeration: Enumeration = defaultEnumeration(groupId),
        position: XYPosition = screenPosition.value
    ) => {
        const contextData = getContextData()
        const enumerationNameSet = buildNameSets(contextData.enumerationMap.values())
        enumeration.name = enumerationNameSet.next(enumeration.name)
        history.executeCommand('enumeration:add', {enumeration, position})
        return enumeration.id
    }
    const addAssociation = (
        association: AssociationIdOnly
    ) => {
        const contextData = getContextData()
        const associationNameSet = buildNameSets(Array.from(contextData.associationMap.values()).map(it => it.association))
        association.name = associationNameSet.next(association.name)
        history.executeCommand('association:add', {association, labelPosition: {
            from: 'source',
            percentage: 0.5
        }})
        return association.id
    }

    const remove = (
        ids: Partial<ModelSubIds>
    ) => {
        return history.executeCommand("remove", fillModelSubIds(ids))
    }

    // Selection 选中部分的图数据
    const modelSelection = useModelEditorSelectIds({contextData, vueFlow, getNextZIndex})

    const isModelSelectionNotEmpty = computed(() => {
        const idSets = modelSelection.selectedIdSets.value
        return idSets.groupIdSet.size > 0
            || idSets.entityIdSet.size > 0
            || idSets.mappedSuperClassIdSet.size > 0
            || idSets.embeddableTypeIdSet.size > 0
            || idSets.enumerationIdSet.size > 0
    })

    const getGraphSelection = () => {
        const vueFlow = getCurrentVueFlow()
        return {
            nodes: vueFlow.getSelectedNodes.value,
            edges: vueFlow.getSelectedEdges.value,
        }
    }

    const clearGraphSelection = () => {
        const vueFlow = getCurrentVueFlow()
        vueFlow.removeSelectedNodes(vueFlow.getSelectedNodes.value)
        vueFlow.removeSelectedEdges(vueFlow.getSelectedEdges.value)
    }

    const focus = () => {
        const vueFlow = getCurrentVueFlow()
        vueFlow.vueFlowRef.value?.focus()
    }


    /**
     * 点击多选相关配置
     */
    const isGraphSelectionNotEmpty = computed(() => {
        const vueFlow = getCurrentVueFlow()
        return (vueFlow.getSelectedNodes.value.length + vueFlow.getSelectedEdges.value.length) > 0
    })
    const isGraphSelectionPlural = computed(() => {
        const vueFlow = getCurrentVueFlow()
        return (vueFlow.getSelectedNodes.value.length + vueFlow.getSelectedEdges.value.length) > 1
    })
    const canMultiSelect = computed(() => {
        const vueFlow = getCurrentVueFlow()
        return vueFlow.multiSelectionActive.value
    })
    const enableMultiSelect = (vueFlow: VueFlowStore = getCurrentVueFlow()) => {
        vueFlow.multiSelectionActive.value = true
    }
    const disableMultiSelect = (vueFlow: VueFlowStore = getCurrentVueFlow()) => {
        vueFlow.multiSelectionActive.value = false
    }
    const toggleMultiSelect = (vueFlow: VueFlowStore = getCurrentVueFlow()) => {
        if (vueFlow.multiSelectionActive.value) {
            disableMultiSelect(vueFlow)
        } else {
            enableMultiSelect(vueFlow)
        }
    }

    const selectGraphAll = (vueFlow: VueFlowStore = getCurrentVueFlow()) => {
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

    const toggleSelectGraphAll = (vueFlow: VueFlowStore = getCurrentVueFlow()) => {
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

    const getByClientRect = (
        rect: {
            readonly x: number,
            readonly y: number,
            readonly width: number,
            readonly height: number
        },
        vueFlow: VueFlowStore = getCurrentVueFlow()
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
        vueFlow: VueFlowStore = getCurrentVueFlow()
    ) => {
        defaultMouseAction.value = 'panDrag'
        vueFlow.panOnDrag.value = [0, 2]
        selectionRectMouseButton = 2
        selectionRectEnable = false
        focus()
    }
    // 默认操作为框选，通过鼠标右键拖拽
    const setDefaultSelectionRect = (
        vueFlow: VueFlowStore = getCurrentVueFlow()
    ) => {
        defaultMouseAction.value = 'selectionRect'
        vueFlow.panOnDrag.value = [2]
        selectionRectMouseButton = 0
        selectionRectEnable = true
        focus()
    }
    const toggleDefaultMouseAction = (
        vueFlow: VueFlowStore = getCurrentVueFlow()
    ) => {
        if (defaultMouseAction.value === 'panDrag') {
            setDefaultSelectionRect(vueFlow)
        } else {
            setDefaultPanDrag(vueFlow)
        }
    }

    const canDrag = computed(() => {
        const vueFlow = getCurrentVueFlow()
        return vueFlow.nodesDraggable.value
    })
    const disableDrag = (
        vueFlow: VueFlowStore = getCurrentVueFlow()
    ) => {
        vueFlow.nodesDraggable.value = false
    }
    const enableDrag = (
        vueFlow: VueFlowStore = getCurrentVueFlow()
    ) => {
        vueFlow.nodesDraggable.value = true
    }

    const setLayerConfigDefault = (
        vueFlow: VueFlowStore = getCurrentVueFlow()
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
            const contextData = getContextData()
            const vueFlow = getCurrentVueFlow()
            return modelDataToGraphData(contextDataGetSelectSubData(contextData, modelSelection.selectedIdSets.value), vueFlow)
        },
        importData: async (data: Partial<ModelGraphSubData>) => {
            const vueFlow = getCurrentVueFlow()

            const fullData = fillModelGraphSubData(data)
            const importGroupId = getCurrentGroupIdOrCreate()
            for (const {data} of fullData.entities) data.groupId = importGroupId
            for (const {data} of fullData.mappedSuperClasses) data.groupId = importGroupId
            for (const {data} of fullData.embeddableTypes) data.groupId = importGroupId
            for (const {data} of fullData.enumerations) data.groupId = importGroupId

            modelSelection.unselectAll()
            const startPosition = vueFlow.screenToFlowCoordinate(screenPosition.value)
            const {ids} = history.executeCommand("import", {data: fullData, startPosition})
            await nextTick()
            await waitChangeSync()
            modelSelection.select(ids)
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
        const vueFlow: VueFlowStore = getCurrentVueFlow()

        setLayerConfigDefault(vueFlow)

        const {
            vueFlowRef,
            onInit,

            screenToFlowCoordinate,

            onNodesChange,
            onNodeDragStart,
            onNodeDragStop,
            onEdgesChange,

            getSelectedNodes,
            getSelectedEdges,
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

            /**
             * 键盘事件监听
             */
            el.addEventListener('keydown', (e) => {
                // 按下 Delete 键删除选中的节点和边
                if (e.key === "Delete") {
                    e.preventDefault()
                    const ids = defaultModelSubIds()
                    for (const node of getSelectedNodes.value) {
                        if (node.type === NodeType_Entity) {
                            ids.entityIds.push(node.id)
                        } else if (node.type === NodeType_MappedSuperClass) {
                            ids.mappedSuperClassIds.push(node.id)
                        } else if (node.type === NodeType_EmbeddableType) {
                            ids.embeddableTypeIds.push(node.id)
                        } else if (node.type === NodeType_Enumeration) {
                            ids.enumerationIds.push(node.id)
                        }
                    }
                    for (const edge of getSelectedEdges.value) {
                        if (edge.type === EdgeType_ConcreteAssociation) {
                            ids.associationIds.push(edge.id)
                        }
                    }
                    remove(ids)
                }
                // 按下 Ctrl 键进入多选模式，直到松开 Ctrl 键
                else if (e.key === "Control") {
                    enableMultiSelect(vueFlow)
                    document.documentElement.addEventListener('keyup', (e) => {
                        if (e.key === "Control" || e.ctrlKey) {
                            disableMultiSelect(vueFlow)
                        }
                    }, {once: true})
                } else if (e.key === "Shift") {
                    if (judgeTargetIsInteraction(e)) return

                    toggleDefaultMouseAction(vueFlow)
                    document.documentElement.addEventListener('keyup', (e) => {
                        if (e.key === "Shift" || e.shiftKey) {
                            toggleDefaultMouseAction(vueFlow)
                        }
                    }, {once: true})
                } else if (e.ctrlKey) {
                    // 按下 Ctrl + a 键，全选
                    if (e.key === "a" || e.key === "A") {
                        if (judgeTargetIsInteraction(e)) return

                        e.preventDefault()

                        selectGraphAll()
                    }
                }
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
                    waitTimeout = setTimeout(() => {
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

                e.preventDefault()
                blurActiveElement()

                vueFlow.multiSelectionActive.value = true
                vueFlow.userSelectionActive.value = true
                clearGraphSelection()

                const start = {x: e.clientX, y: e.clientY}

                const onRectSelect = (e: MouseEvent) => {
                    e.preventDefault()
                    const current = {x: e.clientX, y: e.clientY}
                    let width = current.x - start.x
                    let height = current.y - start.y
                    const x = width > 0 ? start.x : current.x
                    const y = height > 0 ? start.y : current.y
                    width = width > 0 ? width : -width
                    height = height > 0 ? height : -height

                    vueFlow.userSelectionRect.value = {
                        width,
                        height,
                        x: x - clientRect.x,
                        y: y - clientRect.y,
                        startX: x - clientRect.x,
                        startY: y - clientRect.y,
                    }

                    const {nodes, edges} = getByClientRect({
                        width,
                        height,
                        x,
                        y,
                    })

                    clearGraphSelection()
                    vueFlow.addSelectedNodes(nodes)
                    vueFlow.addSelectedEdges(edges)
                }

                const onRectSelectEnd = () => {
                    document.documentElement.removeEventListener('mousemove', onRectSelect)
                    document.documentElement.removeEventListener('mouseup', onRectSelectEnd)

                    vueFlow.userSelectionActive.value = false
                    vueFlow.userSelectionRect.value = null

                    const newSelectedNodes = vueFlow.getSelectedNodes.value
                    const newSelectedEdges = vueFlow.getSelectedEdges.value
                    setTimeout(() => {
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

    return {
        // 图的信息与操作
        initModelEditor,
        focus,

        viewport,
        zoom,
        fitView: () => {
            return vueFlow.value.fitView({duration: 600, padding: 0.1})
        },
        fitRect: (rect: Rect) => {
            return vueFlow.value.fitBounds(rect, {duration: 800, padding: 0.4})
        },
        focusNode: (node: GraphNode | string) => {
            let _node: GraphNode
            if (typeof node === 'string') {
                const foundNode = vueFlow.value.findNode(node)
                if (!foundNode) throw new Error(`node [${node}] is not existed`)
                _node = foundNode
            } else {
                _node = node
            }
            _node.zIndex = getNextZIndex()
            return vueFlow.value.fitBounds({
                x: _node.computedPosition.x,
                y: _node.computedPosition.y,
                width: _node.dimensions.width,
                height: _node.dimensions.height,
            }, {duration: 800, padding: 0.4})
        },

        // 历史记录
        canUndo: readonly(canUndo),
        canRedo: readonly(canRedo),
        undo: () => {
            if (canUndo.value) {
                history.undo()
                sendMessage("undo", {type: "success"})
            } else {
                sendMessage("cannot undo", {type: "warning"})
            }
            focus()
        },
        redo: () => {
            if (canRedo.value) {
                history.redo()
                sendMessage("redo", {type: "success"})
            } else {
                sendMessage("cannot redo", {type: "warning"})
            }
            focus()
        },
        waitChangeSync,

        executeBatch: history.executeBatch,
        executeAsyncBatch: history.executeAsyncBatch,

        // 选择
        modelSelection,
        selectedIdSets: modelSelection.selectedIdSets,
        isModelSelectionNotEmpty,

        getGraphSelection,
        clearGraphSelection,
        graphSelection: {
            selectAll: selectGraphAll,
            unselectAll: clearGraphSelection,
            toggleSelectAll: toggleSelectGraphAll,
        },

        isGraphSelectionNotEmpty,
        isGraphSelectionPlural,
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
        setModel,
        saveModel,
        contextData: readonly(contextData),

        menuMap,
        currentGroupId,
        toggleCurrentGroup,

        createType,

        // 模型生成


        // 模型数据变更
        addGroup,
        addEntity,
        addEmbeddableType,
        addMappedSuperClass,
        addEnumeration,
        addAssociation,
        remove,

        copy: async (
            data: LazyData<ModelGraphSubData> | undefined = undefined,
        ) => {
            try {
                const result = await clipBoard.copy(data)
                sendMessage("copy", {type: "success"})
                focus()
                return result
            } catch (e) {
                sendMessage(`copy fail: ${e}`, {type: "warning"})
                throw e
            }
        },
        paste: async () => {
            try {
                const result = await clipBoard.paste()
                sendMessage("paste", {type: "success"})
                focus()
                return result
            } catch (e) {
                sendMessage(`paste fail: ${e}`, {type: "warning"})
                throw e
            }
        },
        cut: async () => {
            try {
                const result = await clipBoard.cut()
                sendMessage("cut", {type: "success"})
                focus()
                return result
            } catch (e) {
                sendMessage(`cut fail: ${e}`, {type: "warning"})
                throw e
            }
        },
    }
})