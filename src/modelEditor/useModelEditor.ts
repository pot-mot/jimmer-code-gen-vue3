import {createStore} from "@/utils/store/createStore.ts";
import {computed, readonly, ref, shallowRef} from "vue";
import {useModelEditorHistory} from "@/modelEditor/history/ModelEditorHistory.ts";
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
import type {LazyData} from "@/utils/type/lazyDataParse.ts";
import {contextDataToContext} from "@/type/context/utils/ModelContext.ts";
import {v7 as uuid} from "uuid";

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

export const createId = (type: "Entity" | "Property" | "MappedSuperClass" | "EmbeddableType" | "Enumeration" | "Association" | "Group") => {
    return `${type}_${uuid()}`
}

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

    // TODO to getDefault or fetch
    const contextData = ref<ModelContextData | undefined>({
        model: {
            id: "",
            name: "Model",
            description: "",
            createdTime: "",
            modifiedTime: "",
            database: "POSTGRESQL",
            language: "KOTLIN"
        },
        entityMap: new Map(),
        mappedSuperClassMap: new Map(),
        embeddableTypeMap: new Map(),
        enumerationMap: new Map(),
        groupMap: new Map(),
        associationMap: new Map(),
        types: [],
    })
    const getContextData = () => {
        if (!contextData.value) {
            throw new Error("ContextData is not available")
        }
        return contextData.value
    }
    const getContext = (): DeepReadonly<ModelContext> => {
        if (!contextData.value) {
            throw new Error("ContextData is not available")
        }
        return contextDataToContext(contextData.value)
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

    const screenPosition = ref<XYPosition>({x: 0, y: 0})

    const {
        history,
        canUndo,
        canRedo,
        menuMap,
    } = useModelEditorHistory({vueFlow, contextData})

    // TODO to getDefault or fetch
    const result = history.executeCommand("group:add", {
        group: {
            id: createId("Group"),
            name: "Default",
            comment: "",
            color: "",
            basePackagePath: "",
            baseTableSchema: ""
        }
    })
    toggleCurrentGroup({id: result.id})

    const setModel = (data: ModelContextData) => {
        contextData.value = data
    }
    const saveModel = async () => {
        // TODO
    }

    let globalZIndex: number = 0

    // 选中的 Id
    const selectedIdSets = ref<ModelSubIdSets>({
        groupIdSet: new Set<string>(),
        entityIdSet: new Set<string>(),
        mappedSuperClassIdSet: new Set<string>(),
        embeddableTypeIdSet: new Set<string>(),
        enumerationIdSet: new Set<string>(),
        associationIdSet: new Set<string>(),
    })
    const selectGroup = (id: string) => {
        const contextData = getContextData()
        if (!contextData.groupMap.has(id)) throw new Error(`Group [${id}] is not existed`)
        selectedIdSets.value.groupIdSet.add(id)
    }
    const unselectGroup = (id: string) => {
        selectedIdSets.value.groupIdSet.delete(id)
    }
    const selectEntity = (id: string) => {
        const contextData = getContextData()
        const vueFlow = getCurrentVueFlow()
        if (!contextData.entityMap.has(id)) throw new Error(`Entity [${id}] is not existed`)
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)
        selectedIdSets.value.entityIdSet.add(id)
        vueFlow.addSelectedNodes([node])
    }
    const unselectEntity = (id: string) => {
        const vueFlow = getCurrentVueFlow()
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)
        selectedIdSets.value.entityIdSet.delete(id)
        vueFlow.removeSelectedNodes([node])
    }
    const selectMappedSuperClass = (id: string) => {
        const contextData = getContextData()
        const vueFlow = getCurrentVueFlow()
        if (!contextData.mappedSuperClassMap.has(id)) throw new Error(`MappedSuperClass [${id}] is not existed`)
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)
        selectedIdSets.value.mappedSuperClassIdSet.add(id)
        vueFlow.addSelectedNodes([node])
    }
    const unselectMappedSuperClass = (id: string) => {
        const vueFlow = getCurrentVueFlow()
        const node = vueFlow.findNode(id)
        if (!node) throw new Error(`Node [${id}] is not existed`)
        selectedIdSets.value.mappedSuperClassIdSet.delete(id)
        vueFlow.removeSelectedNodes([node])
    }
    const selectEmbeddableType = (id: string) => {
        const contextData = getContextData()
        if (!contextData.embeddableTypeMap.has(id)) throw new Error(`EmbeddableType [${id}] is not existed`)
        selectedIdSets.value.embeddableTypeIdSet.add(id)
    }
    const unselectEmbeddableType = (id: string) => {
        selectedIdSets.value.embeddableTypeIdSet.delete(id)
    }
    const selectEnumeration = (id: string) => {
        const contextData = getContextData()
        if (!contextData.enumerationMap.has(id)) throw new Error(`Enumeration [${id}] is not existed`)
        selectedIdSets.value.enumerationIdSet.add(id)
    }
    const unselectEnumeration = (id: string) => {
        selectedIdSets.value.enumerationIdSet.delete(id)
    }
    const selectAssociation = (id: string) => {
        const contextData = getContextData()
        if (!contextData.associationMap.has(id)) throw new Error(`Association [${id}] is not existed`)
        selectedIdSets.value.associationIdSet.add(id)
        // TODO sync Edge
    }
    const unselectAssociation = (id: string) => {
        selectedIdSets.value.associationIdSet.delete(id)
        // TODO sync Edge
    }

    // Selection 选中部分的图数据
    const getGraphSelection = () => {
        const vueFlow = getCurrentVueFlow()
        return {
            nodes: vueFlow.getSelectedNodes.value,
            edges: vueFlow.getSelectedEdges.value,
        }
    }

    const cleanGraphSelection = () => {
        const vueFlow = getCurrentVueFlow()
        vueFlow.removeSelectedNodes(vueFlow.getSelectedNodes.value)
        vueFlow.removeSelectedEdges(vueFlow.getSelectedEdges.value)
    }

    const remove = (
        data: { nodes?: (GraphNode | string)[], edges?: (GraphEdge | string)[] },
        withMessage: boolean = true,
    ) => {
        // TODO
    }

    const removeSelected = () => {
        remove(getGraphSelection())
    }

    const focus = () => {
        const vueFlow = getCurrentVueFlow()
        vueFlow.vueFlowRef.value?.focus()
    }


    /**
     * 点击多选相关配置
     */
    const isSelectionNotEmpty = computed(() => {
        const vueFlow = getCurrentVueFlow()
        return (vueFlow.getSelectedNodes.value.length + vueFlow.getSelectedEdges.value.length) > 0
    })
    const isSelectionPlural = computed(() => {
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

    const initModelEditor = () => {
        const vueFlow: VueFlowStore = getCurrentVueFlow()

        setLayerConfigDefault(vueFlow)

        const {
            vueFlowRef,
            onInit,

            screenToFlowCoordinate,

            onViewportChange,

            onNodesChange,
            onNodeDragStart,
            onNodeDragStop,
            onConnect,
            onConnectStart,
            onConnectEnd,
            onEdgeUpdateStart,
            onEdgeUpdate,

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
             * 剪切板
             */
            // TODO
            // const clipBoard = useClipBoard<MindMapImportData, MindMapExportData>({
            //     exportData: (): MindMapExportData => {
            //         return exportMindMapSelectionData(vueFlow)
            //     },
            //     importData: (data: MindMapImportData) => {
            //         importData(data, {point: screenToFlowCoordinate(screenPosition.value), type: "topNode"})
            //     },
            //     removeData: (data: MindMapExportData) => {
            //         remove({nodes: data.nodes?.map(it => it.id), edges: data.edges?.map(it => it.id)}, false)
            //     },
            //     stringifyData: (data: MindMapExportData): string => {
            //         return jsonSortPropStringify(data)
            //     },
            //     validateInput: validateMindMapImportData
            // })
            //

            /**
             * 节点移动和选择同步
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

                for (const change of changes) {
                    if (change.type === "select") {
                        if (change.selected) {
                            const node = vueFlow.findNode(change.id)
                            if (node) node.zIndex = globalZIndex++

                            if (change.id.startsWith("Entity")) {
                                selectedIdSets.value.entityIdSet.add(change.id)
                            } else if (change.id.startsWith("MappedSuperClass")) {
                                selectedIdSets.value.mappedSuperClassIdSet.add(change.id)
                            }
                        } else {
                            if (change.id.startsWith("Entity")) {
                                selectedIdSets.value.entityIdSet.delete(change.id)
                            } else if (change.id.startsWith("MappedSuperClass")) {
                                selectedIdSets.value.mappedSuperClassIdSet.delete(change.id)
                            }
                        }
                    } else if (change.type === "remove") {
                        if (change.id.startsWith("Entity")) {
                            selectedIdSets.value.entityIdSet.delete(change.id)
                        } else if (change.id.startsWith("MappedSuperClass")) {
                            selectedIdSets.value.mappedSuperClassIdSet.delete(change.id)
                        }
                    }
                }
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

            // /**
            //  * 边连接
            //  */
            // onConnect((connectData) => {
            //     addEdge(connectData)
            // })
            //
            // onConnectStart((data) => {
            //     isConnecting.value = true
            //     connectSourceNodeId.value = data.nodeId
            // })
            //
            // onConnectEnd(() => {
            //     isConnecting.value = false
            //     connectSourceNodeId.value = undefined
            // })
            //
            // /**
            //  * 边重连接
            //  */
            // const edgeReconnectMap = new Map<string, FullConnection>
            // const stopSelectStart = (e: Event) => {
            //     e.preventDefault()
            // }
            //
            // onEdgeUpdateStart(({edge}) => {
            //     vueFlowRef.value?.addEventListener('selectstart', stopSelectStart)
            //     const connection: Connection = {
            //         source: edge.source,
            //         sourceHandle: edge.sourceHandle,
            //         target: edge.target,
            //         targetHandle: edge.targetHandle,
            //     }
            //     if (checkFullConnection(connection)) {
            //         edgeReconnectMap.set(edge.id, connection)
            //     }
            // })
            //
            // onEdgeUpdate(({edge, connection}) => {
            //     history.executeBatch(Symbol("edge:reconnect"), () => {
            //         const oldConnection = edgeReconnectMap.get(edge.id)
            //         edgeReconnectMap.delete(edge.id)
            //         if (oldConnection !== undefined && checkFullConnection(connection)) {
            //             if (jsonSortPropStringify(oldConnection) !== jsonSortPropStringify(connection) && !checkConnectionExist(connection)) {
            //                 history.executeCommand('edge:reconnect', {
            //                     layerId: currentLayerId.value,
            //                     id: edge.id,
            //                     newConnection: connection,
            //                     oldConnection
            //                 })
            //             }
            //         }
            //     })
            //     TODO edge select sync
            //     vueFlowRef.value?.removeEventListener('selectstart', stopSelectStart)
            // })

            /**
             * 键盘事件监听
             */
            el.addEventListener('keydown', (e) => {
                // 按下 Delete 键删除选中的节点和边
                if (e.key === "Delete") {
                    if (getSelectedNodes.value.length === 0 && getSelectedEdges.value.length === 0) return

                    e.preventDefault()

                    remove({nodes: getSelectedNodes.value, edges: getSelectedEdges.value})
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
                            const groupId = currentGroupId.value
                            if (groupId === undefined) {
                                sendMessage("请选择一个组", {type: "info"})
                                return
                            }
                            history.executeCommand("entity:add", {
                                position: screenToFlowCoordinate(currentMousePosition),
                                entity: {
                                    groupId,
                                    id: createId("Entity"),
                                    name: "Entity",
                                    comment: "",
                                    subPackagePath: "",
                                    tableName: "",
                                    extendsIds: [],
                                    extraImports: [],
                                    extraAnnotations: [],
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
                cleanGraphSelection()

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

                    cleanGraphSelection()
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
                        cleanGraphSelection()
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
        focusNode: (node: GraphNode) => {
            return vueFlow.value.fitBounds({
                x: node.computedPosition.x,
                y: node.computedPosition.y,
                width: node.dimensions.width,
                height: node.dimensions.height,
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

        executeBatch: history.executeBatch,
        executeAsyncBatch: history.executeAsyncBatch,

        // 选择
        selectedIdSets: readonly(selectedIdSets),
        selectGroup,
        unselectGroup,
        selectEntity,
        unselectEntity,
        selectMappedSuperClass,
        unselectMappedSuperClass,
        selectEmbeddableType,
        unselectEmbeddableType,
        selectEnumeration,
        unselectEnumeration,
        selectAssociation,
        unselectAssociation,

        getGraphSelection,
        cleanGraphSelection,
        selectGraphAll,
        toggleSelectGraphAll,

        remove,
        removeSelected,

        isSelectionNotEmpty,
        isSelectionPlural,
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
        getContext,

        menuMap,
        currentGroupId,
        toggleCurrentGroup,

        // 模型生成


        // 模型数据变更


        copy: async (
            data: LazyData<ModelSubData> | undefined = undefined,
        ) => {
            try {
                // TODO
                // const result = await layer.copy(data)
                sendMessage("copy", {type: "success"})
                focus()
                // return result
            } catch (e) {
                sendMessage(`copy fail: ${e}`, {type: "warning"})
                throw e
            }
        },
        paste: async () => {
            try {
                // TODO
                // const result = await layer.paste()
                sendMessage("paste", {type: "success"})
                focus()
                // return result
            } catch (e) {
                sendMessage(`paste fail: ${e}`, {type: "warning"})
                throw e
            }
        },
        cut: async () => {
            try {
                // TODO
                // const result = await layer.cut()
                sendMessage("cut", {type: "success"})
                focus()
                // return result
            } catch (e) {
                sendMessage(`cut fail: ${e}`, {type: "warning"})
                throw e
            }
        },
    }
})