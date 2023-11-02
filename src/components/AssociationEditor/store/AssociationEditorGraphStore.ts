import {defineStore} from "pinia";
import {GenAssociationMatchView, GenTableColumnView} from "../../../api/__generated/model/static";
import {
    getAssociations,
} from "../edge/AssociationEdge.ts";
import {
    getTables,
    loadTableNodes,
    tableIdToNodeId
} from "../node/TableNode.ts";
import {nextTick} from 'vue';
import {AssociationEditorGraphEventBus} from "../eventBus/AssociationEditorGraphEventBus.ts";
import {api} from "../../../api";
import {searchEdgesByColumn} from "../../../utils/graphEditor/search.ts";
import {commonGraphStoreOperations} from "../../../utils/graphEditor/commonStore.ts";


export const useAssociationEditorGraphStore =
    defineStore(
        'AssociationEditorGraph',
        () => {
            const commonStore = commonGraphStoreOperations()

            const {_graph} = commonStore


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

            /**
             * 向画布导入 schema
             * @param id schema id
             */
            const loadSchema = async (id: number) => {
                const graph = _graph()

                const oldTables = tables().filter(table => table.schema?.id == id)

                const res = await api.tableService.queryIdView({query: {schemaIds: [id]}})
                const tableIds = res.map(table => table.id)

                const {nodes, edges} = await loadTableNodes(graph, tableIds, false)

                await nextTick()

                graph.resetSelection([
                    ...oldTables.map(it => tableIdToNodeId(it.id)),
                    ...nodes.map(it => it.id),
                    ...edges.map(it => it.id)
                ])

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

            return {
                ...commonStore,

                tables,
                associations,

                removeTables,
                deleteAssociations,

                loadSchema,
                loadTable,
            }
        }
    )