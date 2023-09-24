import { defineStore } from "pinia";
import {
    GenAssociationInput, GenAssociationMatchView,
    GenTableColumnsView
} from "../api/__generated/model/static";
import { api } from "../api";
import { AssociationMatchType } from "../api/__generated/model/enums";
import { Graph, Node } from "@antv/x6";
import { addAssociationEdges, getAssociations } from "../components/AssociationEditor/edge/AssociationEdge.ts";
import { addTableNodes, getTables, nodeIdToTableId, removeTableNodes, tableIdToNodeId } from "../components/AssociationEditor/node/TableNode.ts";
import { GenTableColumnsView_TargetOf_columns } from "../api/__generated/model/static/GenTableColumnsView.ts";
import { layoutByLevels } from "../components/AssociationEditor/graph/layout.ts";
import { saveGraph } from "../components/AssociationEditor/graph/localStorage.ts";
import { defaultZoomRange } from "../components/AssociationEditor/graph/scale.ts";
import { Ref, ref, onMounted } from 'vue';

export const useTableEditorGraphStore =
    defineStore(
        'tableEditorGraph',
        () => {
            let _graph: Graph

            /**
             * 加载 graph，初始化
             * @param graph 
             */
            const load = (graph: Graph) => {
                _graph = graph
                fit()
            }

            /**
             * 获取 graph
             * @returns _graph
             */
            const graph = () => {
                if (!_graph) throw new Error("graph is not init")
                return _graph
            }

            /**
             * 使画布适应内容
             */
            const fit = () => {
                graph().scaleContentToFit({ ...defaultZoomRange, padding: 100 })
                graph().centerContent()
            }

            /**
             * 根据 node 获取 graph 中的 table
             * @returns table
             */
            const tables = (): GenTableColumnsView[] => {
                return getTables(graph())
            }

            /**
             * 根据 edge 获取 graph 中的 association
             * @returns association
             */
            const associations = (): GenAssociationMatchView[] => {
                return getAssociations(graph())
            }

            /**
             * 过滤存在的 table id
             * @param tableIds 
             * @returns 过滤结果
             */
            const getExistedIds = (tableIds : readonly number[]): number[] => {
                const idSet = new Set(tableIds);
                return tables()
                    .filter(table => idSet.has(table.id))
                    .map(table => table.id);
            }

            /** 撤回 */
            const undo = () => {
                if (graph() && graph().canUndo()) {
                    graph().undo()
                }
            }

            /** 重做 */
            const redo = () => {
                if (graph() && graph().canRedo()) {
                    graph().redo()
                }
            }

            /** 保存 */
            const save = () => {
                saveGraph(graph())
            }

            /** 保存关联 */
            const saveAssociations = async (inputs: GenAssociationMatchView[] = associations()) => {
                const tableMap = new Map<number, GenTableColumnsView>
                const columnMap = new Map<number, GenTableColumnsView_TargetOf_columns>

                tables().forEach(table => {
                    tableMap.set(table.id, table)
                    table.columns.forEach(column => {
                        columnMap.set(column.id, column)
                    })
                })

                const viewToInput = (view: GenAssociationMatchView): GenAssociationInput => {
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
                
                console.log(inputs);

                await api.associationService.save({ body: inputs.map(viewToInput) })
            }

            const matchTypes: Ref<ReadonlyArray<AssociationMatchType>> = ref([])

            const matchType: Ref<AssociationMatchType> = ref('SIMPLE_PK')

            onMounted(() => {
                api.associationService.listMatchType().then(res => {
                    matchTypes.value = res
                    matchType.value = res[0]
                })
            })

            /** 匹配关联 */
            const match = async () => {
                let nodes = graph().getSelectedCells().filter(cell => cell.isNode())

                if (nodes.length == 0) {
                    nodes = graph().getNodes()
                }

                const res = await api.associationService.match({
                    body: nodes.map(node => nodeIdToTableId(node.id)),
                    matchType: matchType.value
                })

                addAssociationEdges(graph(), res)
            }

            /** 移除全部 */
            const removeAll = () => {
                graph().removeCells(graph().getCells())
            }

            /** 移除选中区域关联，如果没有选中则移除全部关联 */
            const removeAssociation = () => {
                const selectEdges = graph().getSelectedCells().filter(cell => cell.isEdge())

                if (selectEdges.length > 0) {
                    graph().removeCells(selectEdges)
                } else {
                    graph().removeCells(graph().getEdges())
                }
            }

            /** 选中全部 */
            const selectAll = () => {
                graph().resetSelection(graph().getCells())
            }

            const layoutDirection: Ref<"LR" | "TB" | "RL" | "BT"> = ref("LR")

            /** 布局 */
            const layout = () => {
                layoutByLevels(graph(), layoutDirection.value)
            }

            /**
             * 向图中添加 table node
             * @param tableIds 要添加的 table id
             * @param replace 替换已存在的 node
             * @returns 新增 table，已存在的 id
             */
            const importTables = async (tableIds: number[], replace: boolean = true) => {
                const add = await api.tableService.list({ ids: tableIds })
                const existedIds = getExistedIds(tableIds)

                if (replace) {
                    removeTableNodes(graph(), existedIds)
                }

                graph().startBatch('add nodes')

                addTableNodes(graph(), add)

                const associations = await api.associationService.selectByTable({ tableIds })

                addAssociationEdges(graph(), associations)

                graph().stopBatch('add nodes')

                return { add, existedIds }
            }

            /**
             * 导入 schema (tableList)，不进行 replace
             * 将清空当前画布
             * @param tableIds table id
             * @param select 结束后是否选中全部
             */
            const importSchema = async (tableIds: number[], select: boolean = false) => {
                removeAll()
                await importTables(tableIds, false)
                layout()
                fit()
                if (select) graph().select(tableIds.map(id => tableIdToNodeId(id)))
            }

            /**
             * 导入 table，不进行 replace
             * @param id tableId
             * @param focus 结束后是否将目标表选中并居中
             */
            const importTable = async (id: number, focus: boolean = true, padding: number = 200) => {
                await importTables([id], false)
                if (!focus) return
                const cell = graph().getCellById(tableIdToNodeId(id))
                if (cell.isNode()) {
                    const node = cell as Node
                    node.toFront()
                    graph().cleanSelection()
                    graph().centerCell(node)
                    graph().select(node)

                    const {width, height} = node.getSize()
                    const {x, y} = node.getPosition()

                    graph().zoomToRect({
                        width: width + padding * 2,
                        x: x - padding,
                        y: y - padding,
                        height: height + padding * 2
                    })
                }
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