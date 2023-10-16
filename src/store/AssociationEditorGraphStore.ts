import {defineStore} from "pinia";
import {GenAssociationMatchView, GenTableColumnView} from "../api/__generated/model/static";
import {Graph, Node} from "@antv/x6";
import {
    getAssociations,
} from "../components/AssociationEditor/edge/AssociationEdge.ts";
import {
    focusNode,
    getTables,
    loadTableNodes,
    tableIdToNodeId, convertEntities, generateEntities, previewEntities
} from "../components/AssociationEditor/node/TableNode.ts";
import {defaultZoomRange} from "../components/AssociationEditor/graph/scale.ts";
import {nextTick, Ref, ref} from 'vue';
import {getSelectedEdges} from "../components/AssociationEditor/graph/useSelection.ts";
import {layoutByLevels} from "../components/AssociationEditor/graph/layout.ts";
import {sendMessage} from "../utils/message.ts";

export const useAssociationEditorGraphStore =
    defineStore(
        'AssociationEditorGraph',
        () => {
            let graph: Graph

            /**
             * 加载 graph，初始化
             */
            const load = async (_graph: Graph) => {
                graph = _graph
                await fitAndLayout()
            }

            /**
             * 获取 graph
             */
            const _graph = () => {
                if (!graph) {
                    sendMessage("Graph 未初始化", "error")
                    throw new Error("graph is not init")
                }
                return graph
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
             * 根据 node 获取 graph 中的 table
             * @returns table
             */
            const tables = (): GenTableColumnView[] => {
                return getTables(_graph())
            }

            /**
             * 根据 edge 获取 graph 中的 association
             * @returns association
             */
            const associations = (): GenAssociationMatchView[] => {
                return getAssociations(_graph())
            }

            /** 撤回 */
            const undo = () => {
                const graph = _graph()

                if (graph.canUndo()) {
                    graph.undo()
                }
            }

            /** 重做 */
            const redo = () => {
                const graph = _graph()

                if (graph.canRedo()) {
                    graph.redo()
                }
            }

            /** 移除全部 */
            const removeAll = () => {
                const graph = _graph()

                graph.removeCells(graph.getCells())
            }

            /** 移除选中区域关联，如果没有选中则移除全部关联 */
            const removeAssociation = () => {
                const graph = _graph()

                if (graph.isSelectionEmpty()) {
                    graph.removeCells(graph.getEdges())
                } else {
                    graph.removeCells(getSelectedEdges(graph))
                }
            }

            /** 选中全部 */
            const selectAll = () => {
                _graph().resetSelection(_graph().getCells())
            }

            const layoutDirection: Ref<"LR" | "TB" | "RL" | "BT"> = ref("LR")

            /** 布局 */
            const layout = (direction: "LR" | "TB" | "RL" | "BT" = layoutDirection.value) => {
                layoutByLevels(_graph(), direction)
            }

            /**
             * 导入 schema (tableList)，不进行 replace
             * 将清空当前画布
             * @param tableIds table id
             * @param select 结束后是否选中全部
             */
            const loadSchema = async (tableIds: number[], select: boolean = false) => {
                const graph = _graph()

                removeAll()
                await loadTableNodes(graph, tableIds, false)
                if (select) graph.select(tableIds.map(id => tableIdToNodeId(id)))
                await fitAndLayout()
            }

            /**
             * 导入 table，不进行 replace
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

            /**
             * 延时适应画布并布局
             */
            const fitAndLayout = async () => {
                await nextTick()

                setTimeout(() => {
                    layout()
                    nextTick(() => {
                        fit()
                    })
                }, 500)
            }

            const generate = async (tableIds?: number[]) => {
                const entityIds = await convertEntities(_graph(), tableIds)
                await generateEntities(entityIds)
            }

            const preview = async (tableIds?: number[]) => {
                return await previewEntities(_graph(), tableIds)
            }

            return {
                _graph,

                tables,
                associations,

                load,
                fit,

                loadSchema,
                loadTable,

                redo,
                undo,

                removeAll,
                removeAssociation,

                selectAll,

                layout,
                layoutDirection,

                fitAndLayout,

                preview,
                generate
            }
        }
    )