import { defineStore } from "pinia";
import {
    GenAssociationCommonInput, GenAssociationMatchView,
    GenTableColumnsView
} from "../api/__generated/model/static";
import { api } from "../api";
import { AssociationMatchType } from "../api/__generated/model/enums";
import { Graph, Node } from "@antv/x6";
import { addAssociationEdges, getAssociations } from "../components/table/edge/AssociationEdge.ts";
import { addTableNodes, getTables, nodeIdToTableId, removeTableNodes, tableIdToNodeId } from "../components/table/node/TableNode.ts";
import { GenTableColumnsView_TargetOf_columns } from "../api/__generated/model/static/GenTableColumnsView.ts";
import { layoutByLevels } from "../components/table/graphEditor/layout.ts";
import { saveGraph } from "../components/table/graphEditor/localStorage.ts";
import { defaultZoomRange } from "../components/table/graphEditor/scale.ts";
import { Ref, ref, onMounted } from 'vue';

export const useTableEditorGraphStore =
    defineStore(
        'tableEditorGraph',
        () => {
            let _graph: Graph

            const graph = () => {
                if (!_graph) throw new Error("graph is not init")
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

            const undo = () => {
                if (graph() && graph().canUndo()) {
                    graph().undo()
                }
            }

            const redo = () => {
                if (graph() && graph().canRedo()) {
                    graph().redo()
                }
            }

            const save = () => {
                saveGraph(graph())
            }

            const matchTypes: Ref<ReadonlyArray<AssociationMatchType>> = ref([])

            const matchType: Ref<AssociationMatchType> = ref('SIMPLE_PK')

            onMounted(() => {
                api.associationService.listMatchType().then(res => {
                    matchTypes.value = res
                    matchType.value = res[0]
                })
            })

            const match = () => {
                const selectNodes = graph().getSelectedCells().filter(cell => cell.isNode())

                api.associationService.match({
                    body: selectNodes.map(node => nodeIdToTableId(node.id)),
                    matchType: matchType.value
                }).then(res => {
                    addAssociationEdges(graph(), res)
                })
            }

            const removeAll = () => {
                graph().removeCells(graph().getCells())
            }

            const removeAssociation = () => {
                const selectEdges = graph().getSelectedCells().filter(cell => cell.isEdge())

                if (selectEdges.length > 0) {
                    graph().removeCells(selectEdges)
                } else {
                    graph().removeCells(graph().getEdges())
                }
            }

            const selectAll = () => {
                graph().resetSelection(graph().getCells())
            }

            const layoutDirection: Ref<"LR" | "TB" | "RL" | "BT"> = ref("LR")

            const layout = () => {
                layoutByLevels(graph(), layoutDirection.value)
            }

            /**
             * 向图中添加 table node
             * @param ids 要添加的 table id
             * @param replace 替换已存在的 node
             * @returns 新增，已存在的 id
             */
            const importTables = async (ids: readonly number[], replace: boolean = true) => {
                const add = await api.tableService.list({ ids })
                const existedIds = getExistedIds(ids)

                if (replace) {
                    removeTableNodes(graph(), existedIds)
                }

                graph().startBatch('add nodes')

                addTableNodes(graph(), add)

                const associations = await api.associationService.selectByTable({ tableIds: ids })

                addAssociationEdges(graph(), associations)

                graph().stopBatch('add nodes')

                return { add, existedIds }
            }

            const importSchema = async (ids: readonly number[], select: boolean = false) => {
                removeAll()
                await importTables(ids, false)
                layout()
                fit()

                if (select) graph().select(ids.map(id => tableIdToNodeId(id)))
            }

            const importTable = async (id: number, focus: boolean = true) => {
                await importTables([id], false)
                if (!focus) return
                const cell = graph().getCellById(tableIdToNodeId(id))
                if (cell.isNode()) {
                    const node = cell as Node
                    graph().cleanSelection()
                    graph().centerCell(node)
                    graph().select(node)
                    node.toFront()
                }
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

                await api.associationService.deleteByTable({ tableIds: [...tableMap.keys()] })

                return await api.associationService.save({ body: inputs.map(viewToInput) })
            }

            const load = (graph: Graph) => {
                _graph = graph
                fit()
            }

            const fit = () => {
                graph().scaleContentToFit({ ...defaultZoomRange })
                graph().centerContent()
            }

            return {
                graph,

                tables,
                associations,

                load,
                fit,

                importTables,
                importSchema,
                importTable,

                save,
                saveAssociations,

                redo,
                undo,

                removeAll,
                removeAssociation,

                selectAll,

                layout,
                layoutDirection,

                match,
                matchType,
                matchTypes
            }
        }
    )