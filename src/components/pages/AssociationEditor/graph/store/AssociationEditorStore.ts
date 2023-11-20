import {nextTick} from 'vue';
import {defineStore} from "pinia";
import {commonGraphStoreOperations} from "@/components/global/graphEditor/commonStore.ts";
import {GenAssociationMatchView, GenTableColumnsView} from "@/api/__generated/model/static";
import {getTables, tableIdToNodeId} from "../node/TableNode.ts";
import {getAssociations} from "../edge/AssociationEdge.ts";
import {api} from "@/api";
import {loadTableNodes} from "../node/loadTableNodes.ts";
import {searchEdgesByColumn} from "@/components/global/graphEditor/search.ts";

export const useAssociationEditorStore =
    defineStore(
        'AssociationEditorGraph',
        () => {
            const commonStore = commonGraphStoreOperations()

            const {_graph} = commonStore


            /**
             * 根据 node 获取 graph 中的 table
             * @returns table
             */
            const tables = (): GenTableColumnsView[] => {
                return getTables(_graph())
            }

            const removeTables = (judge: (table: GenTableColumnsView) => boolean) => {
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

                await commonStore.layoutAndFit()
            }

            /**
             * 向画布导入 table，如果表已存在则仅更新关联
             * @param id tableId
             */
            const loadTable = async (id: number) => {
                const graph = _graph()
                await loadTableNodes(graph, [id], false)
                commonStore.focus(id)
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