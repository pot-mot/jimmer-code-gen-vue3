import {defineStore} from "pinia";
import {GenAssociationMatchView, GenTableAssociationView, GenTableColumnView} from "../api/__generated/model/static";
import {Graph, Node, Edge} from "@antv/x6";
import {
    getAssociations,
} from "../components/AssociationEditor/edge/AssociationEdge.ts";
import {
    focusNode,
    getTables,
    loadTableNodes,
    tableIdToNodeId
} from "../components/AssociationEditor/node/TableNode.ts";
import {defaultZoomRange} from "../components/AssociationEditor/graph/scale.ts";
import {computed, nextTick, Ref, ref, watch} from 'vue';
import {getSelectedEdges, getSelectedNodes} from "../components/AssociationEditor/graph/useSelection.ts";
import {layoutByLevels} from "../components/AssociationEditor/graph/layout.ts";
import {sendMessage} from "../utils/message.ts";
import {AssociationEditorGraphEventBus} from "../eventBus/AssociationEditorGraphEventBus.ts";
import {api} from "../api";
import {AssociationEditorMenuEventBus} from "../eventBus/AssociationEditorMenuEventBus.ts";

export const useAssociationEditorGraphStore =
    defineStore(
        'AssociationEditorGraph',
        () => {
            const graph: Ref<Graph | undefined> = ref()

            /**
             * 获取 graph
             */
            const _graph = (): Graph => {
                if (!graph.value) {
                    sendMessage("Graph 未初始化", "error")
                    throw new Error("graph is not init")
                }
                return graph.value
            }

            /**
             * 加载 graph，初始化
             */
            const load = async (_graph: Graph) => {
                graph.value = _graph
                await layoutAndFit()
            }

            const isLoaded = computed(() => {
                return !!graph.value
            })

            // 状态监听以实现部分数据的响应式
            const isSelectionEmpty = ref(true)
            const selectedNodes = ref(<Node[]>[])
            const selectedEdges = ref(<Edge[]>[])
            const canUndo = ref(false)
            const canRedo = ref(false)
            const scaling = ref(0)
            const formatScaling = ref(0)

            const selectedTables = computed((): GenTableAssociationView[] => {
                return selectedNodes.value.map(node => node.data.table)
            })

            const initWatcher = watch(() => graph.value, () => {
                if (isLoaded.value) {
                    const graph = _graph()

                    graph.on('selection:changed', () => {
                        isSelectionEmpty.value = graph.isSelectionEmpty()
                        selectedNodes.value = getSelectedNodes(graph)
                        selectedEdges.value = getSelectedEdges(graph)
                    })

                    graph.on('history:change', () => {
                        canUndo.value = graph.canUndo()
                        canRedo.value = graph.canRedo()
                    })

                    scaling.value = graph.zoom()

                    graph.on('scale', ({sx}) => {
                        scaling.value = sx
                        formatScaling.value = Math.log2(sx)
                    })

                    watch(() => formatScaling.value, (newValue) => {
                        scaling.value = Math.pow(2, newValue)
                        graph.zoomTo(scaling.value)
                    })

                    initWatcher()
                }
            }, {deep: true, immediate: true})

            const layoutDirection: Ref<"LR" | "TB" | "RL" | "BT"> = ref("LR")

            /** 布局 */
            const layout = (direction: "LR" | "TB" | "RL" | "BT" = layoutDirection.value) => {
                layoutByLevels(_graph(), direction)
            }

            /**
             * 使画布适应内容
             */
            const fit = () => {
                const graph = _graph()

                graph.scaleContentToFit({...defaultZoomRange, padding: 100})
                graph.centerContent()
            }

            /**
             * 延时适应画布并布局
             */
            const layoutAndFit = async (direction: "LR" | "TB" | "RL" | "BT" = layoutDirection.value) => {
                await nextTick()
                setTimeout(() => {
                    layout(direction)
                    nextTick(() => {
                        fit()
                    })
                }, 500)
            }

            /**
             * 根据 node 获取 graph 中的 table
             * @returns table
             */
            const tables = (): GenTableColumnView[] => {
                return getTables(_graph())
            }

            const removeTables = (judge: (table: GenTableColumnView) => boolean) => {
                const removeTableIds: number[] = []

                tables().forEach(table => {
                    if (judge(table)) {
                        removeTableIds.push(table.id)
                    }
                })

                const graph = _graph()
                const removeNodeIds = removeTableIds.map(tableId => tableIdToNodeId(tableId))

                graph.unselect(removeNodeIds)
                graph.removeCells(removeNodeIds)
            }

            AssociationEditorMenuEventBus.on('deleteDataSource', ({id}) => {
                removeTables(table => table.schema.dataSource.id == id)
            })

            AssociationEditorMenuEventBus.on('deleteSchema', ({id}) => {
                removeTables(table => table.schema.id == id)
            })

            /**
             * 根据 edge 获取 graph 中的 association
             * @returns association
             */
            const associations = (): GenAssociationMatchView[] => {
                return getAssociations(_graph())
            }

            /** 撤回 */
            AssociationEditorGraphEventBus.on('undo', () => {
                const graph = _graph()

                if (graph.canUndo()) {
                    graph.undo()
                }
            })

            /** 重做 */
            AssociationEditorGraphEventBus.on('redo', () => {
                const graph = _graph()

                if (graph.canRedo()) {
                    graph.redo()
                }
            })

            /** 移除全部 */
            const removeAllOrSelectedCells = () => {
                const graph = _graph()

                if (graph.isSelectionEmpty()) {
                    graph.unselect(graph.getCells())
                    graph.removeCells(graph.getCells())
                } else {
                    const cells = graph.getSelectedCells()
                    graph.unselect(cells)
                    graph.removeCells(cells)
                }
            }

            AssociationEditorGraphEventBus.on('removeAllOrSelectedCells', removeAllOrSelectedCells)

            /** 移除选中区域关联，如果没有选中则移除全部关联 */
            const removeAllOrSelectedAssociations = () => {
                const graph = _graph()

                if (graph.isSelectionEmpty()) {
                    graph.removeCells(graph.getEdges())
                } else {
                    const edges = getSelectedEdges(graph)
                    graph.unselect(edges)
                    graph.removeCells(edges)
                }
            }

            AssociationEditorGraphEventBus.on('removeAllOrSelectedAssociations', removeAllOrSelectedAssociations)

            /** 选中全部 */
            const selectAll = () => {
                _graph().resetSelection(_graph().getCells())
            }

            AssociationEditorGraphEventBus.on('selectAll', selectAll)

            AssociationEditorGraphEventBus.on('layout', ({direction}) => {
                layout(direction)
            })

            /**
             * 向画布导入 schema
             * @param id schema id
             * @param select 结束后是否选中全部
             */
            const loadSchema = async (id: number, select: boolean = false) => {
                const graph = _graph()
                const res = await api.tableService.query({query: {schemaIds: [id]}})
                const tableIds = res.map(table => table.id)
                await loadTableNodes(graph, tableIds, false)
                if (select) graph.select(tableIds.map(id => tableIdToNodeId(id)))
                await layoutAndFit()
            }

            AssociationEditorGraphEventBus.on('loadSchema', async ({id, select}) => {
                await loadSchema(id, select)
            })

            /**
             * 向画布导入 table
             * @param id tableId
             * @param focus 结束后是否将目标表选中并居中
             */
            const loadTable = async (id: number, focus: boolean = true) => {
                const graph = _graph()

                await loadTableNodes(graph, [id], false)
                if (!focus) return
                const cell = graph.getCellById(tableIdToNodeId(id))
                if (cell.isNode()) {
                    const node = cell as Node
                    await focusNode(graph, node)
                }
            }

            AssociationEditorGraphEventBus.on('loadTable', async ({id, focus}) => {
                await loadTable(id, focus)
            })

            return {
                isLoaded,
                load,
                _graph,

                tables,
                associations,

                isSelectionEmpty,
                selectedNodes,
                selectedTables,
                selectedEdges,
                canUndo,
                canRedo,
                scaling,
                formatScaling,

                layoutDirection,
                fit,
                layout,
                layoutAndFit,

                selectAll,

                removeTables,
                removeAllOrSelectedCells,
                removeAllOrSelectedAssociations,

                loadSchema,
                loadTable,
            }
        }
    )