import {defineStore} from "pinia";
import {
    GenAssociationCommonInput, GenAssociationMatchView,
    GenTableColumnsView
} from "../api/__generated/model/static";
import {api} from "../api";
import {Graph} from "@antv/x6";
import {getAssociations} from "../components/table/edge/AssociationEdge.ts";
import {addTableNodes, getTables, removeTableNodes} from "../components/table/node/TableNode.ts";
import {GenTableColumnsView_TargetOf_columns} from "../api/__generated/model/static/GenTableColumnsView.ts";

export const useTableEditorStore =
    defineStore(
        'tableEditor',
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

            const addTables = async (ids: readonly number[]) => {
                const add = await api.tableService.list({ids: ids})
                const del = removeTables(ids)

                removeTableNodes(graph(), del)
                addTableNodes(graph(), add)

                return {add, del}
            }

            const removeTables = (ids: readonly number[]) => {
                const res: GenTableColumnsView[] = []
                tables().filter(table => {
                    if (ids.includes(table.id)) {
                        res.push(table)
                        return true
                    }
                    return false
                })
                removeTableNodes(graph(), res)
                return res
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

                return await api.associationService.save({body: inputs.map(association => {
                        const tempComment: string[] = []
                        const tempRemark: string[] = []

                        tempComment.push("[")

                        if (association.targetColumn.table) {
                            const targetTable = tableMap.get(association.targetColumn.table.id)
                            if (targetTable) {
                                tempRemark.push(targetTable.comment)
                                tempComment.push(targetTable.name)
                            }
                        }
                        const targetColumn = columnMap.get(association.targetColumn.id)
                        if (targetColumn) {
                            tempComment.push(".")
                            tempComment.push(targetColumn.name)

                            tempRemark.push(".")
                            tempRemark.push(targetColumn.comment)
                        }

                        tempComment.push("] -> [")
                        tempRemark.push(" -> ")

                        if (association.sourceColumn.table) {
                            const sourceTable = tableMap.get(association.sourceColumn.table.id)
                            if (sourceTable) {
                                tempComment.push(sourceTable.name)
                                tempRemark.push(sourceTable.comment)
                            }
                        }
                        const sourceColumn = columnMap.get(association.sourceColumn.id)
                        if (sourceColumn) {
                            tempComment.push(".")
                            tempComment.push(sourceColumn.name)

                            tempRemark.push(".")
                            tempRemark.push(sourceColumn.comment)
                        }

                        tempComment.push("]")

                        return <GenAssociationCommonInput>{
                            associationType: association.associationType,
                            targetColumnId: association.targetColumn.id,
                            sourceColumnId: association.sourceColumn.id,
                            orderKey: 0,
                            comment: tempComment.join(""),
                            remark: tempRemark.join(""),
                        }
                    })})
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
                removeTables,

                saveAssociations,
            }
        }
    )