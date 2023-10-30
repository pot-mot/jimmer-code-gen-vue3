import {defineStore} from "pinia";
import {GenAssociationMatchView, GenTableAssociationView, GenTableColumnView} from "../../../api/__generated/model/static";
import {Graph, Node, Edge, Cell} from "@antv/x6";
import {
    getAssociations, searchEdgesByColumn,
} from "../edge/AssociationEdge.ts";
import {
    getTables,
    loadTableNodes,
    tableIdToNodeId
} from "../node/TableNode.ts";
import {defaultZoomRange} from "../graph/scale.ts";
import {computed, nextTick, Ref, ref, watch} from 'vue';
import {getSelectedEdges, getSelectedNodes} from "../graph/useSelection.ts";
import {sendMessage} from "../../../utils/message.ts";
import {AssociationEditorGraphEventBus} from "../eventBus/AssociationEditorGraphEventBus.ts";
import {api} from "../../../api";
import {AssociationEditorMenuEventBus} from "../eventBus/AssociationEditorMenuEventBus.ts";
import {dagreLayout, getPoint} from "../layout/dagre/layout.ts";

type CellInput = Cell | string | number

type CellProperty = Cell | string

const processCell = (cell: CellInput): CellProperty => {
    if (typeof cell == 'number') {
        return tableIdToNodeId(cell)
    } else {
        return cell
    }
}

const getFirst = (input: CellInput | CellInput[]): CellProperty | undefined => {
    if (Array.isArray(input)) {
        if (input.length > 0) {
            return processCell(input[0])
        }
    } else {
        return processCell(input)
    }
}

const processCells = (cells: CellInput[]): CellProperty[] => {
    if (Array.isArray(cells)) {
        return cells.map(processCell)
    } else {
        return cells
    }
}

const process = (input: CellInput | CellInput[]): CellProperty | CellProperty[] => {
    if (Array.isArray(input)) {
        return processCells(input);
    } else {
        return processCell(input);
    }
}

const getCell = (graph: Graph, input: CellInput): Cell => {
    const temp = processCell(input)
    if (typeof temp == 'string') {
        return graph.getCellById(temp)
    } else {
        return temp
    }
}

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
            }

            const isLoaded = computed(() => {
                return !!graph.value
            })

            // 状态与响应式数据
            const canUndo = ref(false)
            const canRedo = ref(false)

            const scaling = ref(4)
            const formatScaling = computed<number>({
                set(newValue) {
                    if (isLoaded.value) {
                        scaling.value = Math.pow(2, newValue)
                        _graph().zoomTo(scaling.value)
                    }
                },
                get() {
                    return Math.log2(scaling.value)
                }
            })

            const isSelectionEmpty = ref(true)
            const selectedNodes = ref(<Node[]>[])
            const selectedEdges = ref(<Edge[]>[])

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

                    graph.on('history:redo', () => {
                        canUndo.value = graph.canUndo()
                        canRedo.value = graph.canRedo()
                    })

                    graph.on('history:undo', () => {
                        canUndo.value = graph.canUndo()
                        canRedo.value = graph.canRedo()
                    })

                    scaling.value = graph.scale().sx

                    graph.on('scale', ({sx}) => {
                        scaling.value = sx
                    })

                   initWatcher()
                }
            }, {deep: true, immediate: true})

            const layoutDirection: Ref<"LR" | "TB" | "RL" | "BT"> = ref("LR")

            /** 布局 */
            const layout = (direction: "LR" | "TB" | "RL" | "BT" = layoutDirection.value) => {
                dagreLayout(_graph(), direction)
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
                layout(direction)
                fit()
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
                removeTables(table => table.schema?.dataSource.id == id)
            })

            AssociationEditorMenuEventBus.on('deleteSchema', ({id}) => {
                removeTables(table => table.schema?.id == id)
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

            const removeAllCells = () => {
                const graph = _graph()

                const cells = graph.getCells()
                graph.unselect(cells)
                graph.removeCells(cells)
            }

            const removeSelectedCells = () => {
                const graph = _graph()

                const cells = graph.getSelectedCells()
                graph.unselect(cells)
                graph.removeCells(cells)
            }

            AssociationEditorGraphEventBus.on('removeAllCells', removeAllCells)
            AssociationEditorGraphEventBus.on('removeSelectedCells', removeSelectedCells)

            const removeAllAssociations = () => {
                const graph = _graph()

                const edges = graph.getEdges()
                graph.unselect(edges)
                graph.removeCells(edges)
            }

            const removeSelectedAssociations = () => {
                const graph = _graph()

                const edges = getSelectedEdges(graph)
                graph.unselect(edges)
                graph.removeCells(edges)
            }

            AssociationEditorGraphEventBus.on('removeAllAssociations', removeAllAssociations)

            AssociationEditorGraphEventBus.on('removeSelectedAssociations', removeSelectedAssociations)

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
             */
            const loadSchema = async (id: number) => {
                const graph = _graph()

                const oldTables = tables().filter(table => table.schema?.id == id)

                if (oldTables.length > 0) {
                    select(oldTables.map(table => table.id))
                }

                const res = await api.tableService.query({query: {schemaIds: [id]}})
                const tableIds = res.map(table => table.id)

                const {nodes, edges} = await loadTableNodes(graph, tableIds, false)

                await nextTick()

                graph.resetSelection([
                    ...oldTables.map(it => tableIdToNodeId(it.id)),
                    ...nodes.map(it => it.id),
                    ...edges.map(it => it.id)
                ])

                await layoutAndFit()
            }

            /**
             * 向画布导入 table，如果表已存在则仅更新关联
             * @param id tableId
             */
            const loadTable = async (id: number) => {
                const graph = _graph()
                await loadTableNodes(graph, [id], false)
            }

            const deleteAssociations = async (
                sourceColumnId: number,
                targetColumnId: number,
            ) => {
                await api.associationService.deleteByColumn({
                    sourceColumnIds: [sourceColumnId],
                    targetColumnIds: [targetColumnId]
                })

                const graph = _graph()
                const edges = searchEdgesByColumn(graph, sourceColumnId, targetColumnId)
                graph.removeCells(edges)

                AssociationEditorGraphEventBus.emit('deletedAssociations', {
                    sourceColumnId,
                    targetColumnId
                })
            }

            AssociationEditorGraphEventBus.on('deleteAssociations', async (
                {sourceColumnId, targetColumnId}
            ) => {
                await deleteAssociations(sourceColumnId, targetColumnId)
            })

            /**
             * 聚焦 cell，将移动画布并选中 cell
             */

            const unselect = (cells: CellInput | CellInput[]) => {
                _graph().unselect(process(cells))
            }

            const select = (cells: CellInput | CellInput[]) => {
                _graph().select(process(cells))
            }

            /**
             * 切换 cell 选中状态
             */
            const toggleSelect = (cells: CellInput | CellInput[]) => {
                const graph = _graph()
                const firstCell = getFirst(cells)
                if (firstCell && graph.isSelected(firstCell)) {
                    graph.unselect(process(cells))
                } else {
                    graph.select(process(cells))
                }
            }

            const focus = (cellInput: CellInput) => {
                const graph = _graph()

                const cell = getCell(graph, cellInput)

                cell.toFront()
                graph.cleanSelection()
                graph.centerCell(cell)
                graph.select(cell)
            }

            const center = () => {
                const graph = _graph()

                const nodes = getSelectedNodes(graph)

                if (graph.isSelectionEmpty()) {
                    graph.centerContent()
                } else if (nodes.length == 1) {
                    focus(nodes[0].id)
                } else {
                    const leftTop = getPoint(nodes, "LT")
                    const rightBottom = getPoint(nodes, "RB")

                    console.log(leftTop, rightBottom)

                    const centerPoint = {
                        x: (rightBottom.x - leftTop.x) / 2 + leftTop.x,
                        y: (rightBottom.y - leftTop.y) / 2 + leftTop.y,
                    }

                    console.log(centerPoint)

                    graph.centerPoint(
                        centerPoint.x,
                        centerPoint.y
                    )
                }
            }

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
                center,
                fit,
                layout,
                layoutAndFit,

                selectAll,
                select,
                unselect,
                toggleSelect,
                focus,

                removeTables,
                removeAllCells,
                removeSelectedCells,
                removeAllAssociations,
                removeSelectedAssociations,

                deleteAssociations,

                loadSchema,
                loadTable,
            }
        }
    )