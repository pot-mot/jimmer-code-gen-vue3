import {defineStore} from "pinia";
import {GenAssociationMatchView, GenTableColumnView} from "../../../api/__generated/model/static";
import {Graph} from "@antv/x6";
import {
    getAssociations,
} from "../edge/AssociationEdge.ts";
import {
    getTables,
    loadTableNodes,
    tableIdToNodeId
} from "../node/TableNode.ts";
import {computed, nextTick, Ref, ref} from 'vue';
import {sendMessage} from "../../../utils/message.ts";
import {AssociationEditorGraphEventBus} from "../eventBus/AssociationEditorGraphEventBus.ts";
import {api} from "../../../api";
import {searchEdgesByColumn} from "../../../utils/graphEditor/search.ts";
import {unselect, useSelectOperation} from "../../../utils/graphEditor/selection/selectOperation.ts";
import {CellInput} from "../../../utils/graphEditor/CellsInputProcess.ts";
import {center} from "../../../utils/graphEditor/common/center.ts";
import {focus} from "../../../utils/graphEditor/common/focus.ts";
import {useFitAndLayout} from "../../../utils/graphEditor/layout/useFitAndLayout.ts";

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

            const selectOperations = useSelectOperation(_graph)

            const fitAndLayoutOperations = useFitAndLayout(_graph)

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

            /**
             * 根据 edge 获取 graph 中的 association
             * @returns association
             */
            const associations = (): GenAssociationMatchView[] => {
                return getAssociations(_graph())
            }

            const removeAllCells = () => {
                const graph = _graph()

                const cells = graph.getCells()
                graph.unselect(cells)
                graph.removeCells(cells)
            }

            const removeAllEdges = () => {
                const graph = _graph()

                const edges = graph.getEdges()
                graph.unselect(edges)
                graph.removeCells(edges)
            }

            /**
             * 向画布导入 schema
             * @param id schema id
             */
            const loadSchema = async (id: number) => {
                const graph = _graph()

                const oldTables = tables().filter(table => table.schema?.id == id)

                if (oldTables.length > 0) {
                    unselect(graph, oldTables.map(table => table.id))
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

                await fitAndLayoutOperations.layoutAndFit()

                AssociationEditorGraphEventBus.emit('loadSchema')
            }

            /**
             * 向画布导入 table，如果表已存在则仅更新关联
             * @param id tableId
             */
            const loadTable = async (id: number) => {
                const graph = _graph()
                await loadTableNodes(graph, [id], false)

                AssociationEditorGraphEventBus.emit('loadTable')
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

            return {
                isLoaded,
                load,
                _graph,

                tables,
                associations,

                center: () => center(_graph()),
                focus: (cell: CellInput) => focus(_graph(), cell),

                ...selectOperations,

                ...fitAndLayoutOperations,

                removeTables,
                removeAllCells,
                removeAllEdges,

                deleteAssociations,

                loadSchema,
                loadTable,
            }
        }
    )