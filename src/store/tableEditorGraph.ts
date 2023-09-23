import {defineStore} from "pinia";
import {
    GenAssociationCommonInput, GenAssociationMatchView,
    GenTableColumnsView
} from "../api/__generated/model/static";
import {api} from "../api";
import {Graph, Node} from "@antv/x6";
import {addAssociationEdges, getAssociations} from "../components/table/edge/AssociationEdge.ts";
import {addTableNodes, getTables, removeTableNodes, tableIdToNodeId} from "../components/table/node/TableNode.ts";
import {GenTableColumnsView_TargetOf_columns} from "../api/__generated/model/static/GenTableColumnsView.ts";
import { nextTick } from "vue";

export const useTableEditorGraphStore =
    defineStore(
        'tableEditorGraph',
        () => {
            let _graph: Graph

            const graph = () => {
                return _graph
            }

            const tables = (): GenTableColumnsView[] => {
                return getTables(graph())
            }

            const associations = (): GenAssociationMatchView[] => {
                return getAssociations(graph())
            }

            const getExistedIds = (ids: readonly number[]): number[] => {
                const idSet = new Set(ids);
                return tables()
                    .filter(table => idSet.has(table.id))
                    .map(table => table.id);
            }

            /**
             * 向图中添加 table node
             * @param ids 要添加的 table id
             * @param replace 替换已存在的 node
             * @returns 新增，已存在的 id
             */
            const addTables = async (ids: readonly number[], replace: boolean = true, select: boolean = false) => {
                const add = await api.tableService.list({ids})
                const existedIds = getExistedIds(ids)

                if (replace) {
                    removeTableNodes(graph(), existedIds)
                }

                addTableNodes(graph(), add)

                const associations = await api.associationService.selectByTable({tableIds: ids})

                addAssociationEdges(graph(), associations)

                if (select) {
                    nextTick(() => {
                        if (ids.length == 1) {
                            const cell = graph().getCellById(tableIdToNodeId(ids[0]))
                            if (cell.isNode()) {
                                const node = cell as Node
                                graph().cleanSelection()
                                graph().centerCell(node)
                                graph().select(node)
                                node.toFront()
                            }
                        } else {
                            graph().select(ids.map(id => tableIdToNodeId(id)))
                        }
                    })
                }

                return {add, existedIds}
            }

            const saveAssociations = async (inputs: GenAssociationMatchView[] = associations()) => {
                const tableMap = new Map<number, GenTableColumnsView>
                const columnMap = new Map<number, GenTableColumnsView_TargetOf_columns>

                tables().forEach(table => {
                    tableMap.set(table.id, table)
                    table.columns.forEach(column => {
                        columnMap.set(column.id, column)
                    })
                })

                const viewToInput = (view: GenAssociationMatchView): GenAssociationCommonInput => {
                    const tempComment: string[] = []
                        const tempRemark: string[] = []

                        tempComment.push("[")

                        if (view.targetColumn.table) {
                            const targetTable = tableMap.get(view.targetColumn.table.id)
                            if (targetTable) {
                                tempRemark.push(targetTable.comment)
                                tempComment.push(targetTable.name)
                            }
                        }
                        const targetColumn = columnMap.get(view.targetColumn.id)
                        if (targetColumn) {
                            tempComment.push(".")
                            tempComment.push(targetColumn.name)

                            tempRemark.push(".")
                            tempRemark.push(targetColumn.comment)
                        }

                        tempComment.push("] -> [")
                        tempRemark.push(" -> ")

                        if (view.sourceColumn.table) {
                            const sourceTable = tableMap.get(view.sourceColumn.table.id)
                            if (sourceTable) {
                                tempComment.push(sourceTable.name)
                                tempRemark.push(sourceTable.comment)
                            }
                        }
                        const sourceColumn = columnMap.get(view.sourceColumn.id)
                        if (sourceColumn) {
                            tempComment.push(".")
                            tempComment.push(sourceColumn.name)

                            tempRemark.push(".")
                            tempRemark.push(sourceColumn.comment)
                        }

                        tempComment.push("]")

                        return {
                            associationType: view.associationType,
                            targetColumnId: view.targetColumn.id,
                            sourceColumnId: view.sourceColumn.id,
                            orderKey: 0,
                            comment: tempComment.join(""),
                            remark: tempRemark.join(""),
                        }
                }

                await api.associationService.deleteByTable({tableIds: [...tableMap.keys()]})

                return await api.associationService.save({body: inputs.map(viewToInput)})
            }

            const load = (graph: Graph) => {
                _graph = graph
            }

            return {
                graph,

                tables,
                associations,

                load,

                addTables,

                saveAssociations,
            }
        }
    )