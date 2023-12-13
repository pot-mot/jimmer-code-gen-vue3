import {nextTick} from 'vue';
import {defineStore} from "pinia";
import {useCommonGraphOperations} from "@/components/business/graphEditor";
import {GenAssociationMatchView, GenTableColumnsView} from "@/api/__generated/model/static";
import {getTables, tableIdToNodeId} from "../graph/tableNode.ts";
import {getAssociations} from "../graph/associationEdge.ts";
import {api} from "@/api";
import {loadTableNodes} from "../graph/loadTableNodes.ts";
import {searchEdgesByColumn} from "@/components/business/graphEditor/common/search.ts";

export const useAssociationEditorStore =
    defineStore(
        'AssociationEditorGraph',
        () => {
            const commonStore = useCommonGraphOperations()

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

                setTimeout(() => {
                    graph.resetSelection([
                        ...oldTables.map(it => tableIdToNodeId(it.id)),
                        ...nodes.map(it => it.id),
                        ...edges.map(it => it.id)
                    ])

                    commonStore.layoutAndFit()
                }, 500)
            }

            /**
             * 向画布导入 table，如果表已存在则仅更新关联
             * @param id tableId
             */
            const loadTable = async (id: number) => {
                const graph = _graph()
                await loadTableNodes(graph, [id], false)

                setTimeout(() => {
                    commonStore.focus(id)
                }, 200)
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

                loadSchema,
                loadTable,

                tables,
                associations,

                removeTables,
                deleteAssociations,
            }
        }
    )
