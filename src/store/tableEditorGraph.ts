import {defineStore} from "pinia";
import {GenAssociationMatchView, GenTableColumnsView} from "../api/__generated/model/static";
import {Graph, Node} from "@antv/x6";
import {
    getAssociations,
    saveAssociations
} from "../components/AssociationEditor/edge/AssociationEdge.ts";
import {
    focusNode,
    getTables,
    importTableNodes,
    tableIdToNodeId
} from "../components/AssociationEditor/node/TableNode.ts";
import {layoutByLevels} from "../components/AssociationEditor/graph/layout.ts";
import {saveGraph} from "../components/AssociationEditor/graph/localStorage.ts";
import {defaultZoomRange} from "../components/AssociationEditor/graph/scale.ts";
import {nextTick, Ref, ref} from 'vue';
import {getSelectEdges} from "../components/AssociationEditor/graph/useSelection.ts";

export const useTableEditorGraphStore =
    defineStore(
        'tableEditorGraph',
        () => {
            let _graph: Graph

            /**
             * 加载 graph，初始化
             * @param graph
             */
            const load = async (graph: Graph) => {
                _graph = graph
                await fitAndLayout()
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
                const __graph = graph()

                __graph.scaleContentToFit({...defaultZoomRange, padding: 100})
                __graph.centerContent()
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

            /** 撤回 */
            const undo = () => {
                const __graph = graph()

                if (__graph.canUndo()) {
                    __graph.undo()
                }
            }

            /** 重做 */
            const redo = () => {
                const __graph = graph()

                if (__graph.canRedo()) {
                    __graph.redo()
                }
            }

            /** 移除全部 */
            const removeAll = () => {
                const __graph = graph()

                __graph.removeCells(__graph.getCells())
            }

            /** 移除选中区域关联，如果没有选中则移除全部关联 */
            const removeAssociation = () => {
                const __graph = graph()

                if (__graph.isSelectionEmpty()) {
                    __graph.removeCells(__graph.getEdges())
                } else {
                    __graph.removeCells(getSelectEdges(__graph))
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
             * 导入 schema (tableList)，不进行 replace
             * 将清空当前画布
             * @param tableIds table id
             * @param select 结束后是否选中全部
             */
            const importSchema = async (tableIds: number[], select: boolean = false) => {
                const __graph = graph()

                removeAll()
                await importTableNodes(__graph, tableIds, false)
                if (select) __graph.select(tableIds.map(id => tableIdToNodeId(id)))
                await fitAndLayout()
            }

            /**
             * 导入 table，不进行 replace
             * @param id tableId
             * @param focus 结束后是否将目标表选中并居中
             * @param padding 与画布的间距
             */
            const importTable = async (id: number, focus: boolean = true, padding: number = 300) => {
                const __graph = graph()

                await importTableNodes(__graph, [id], false)
                if (!focus) return
                const cell = __graph.getCellById(tableIdToNodeId(id))
                if (cell.isNode()) {
                    const node = cell as Node
                    await focusNode(__graph, node, padding)
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

            return {
                graph,

                tables,
                associations,

                load,
                fit,

                importSchema,
                importTable,

                saveGraph: () => {
                    saveGraph(graph())
                },
                saveAssociations: async () => {
                    await saveAssociations(graph())
                },

                redo,
                undo,

                removeAll,
                removeAssociation,

                selectAll,

                layout,
                layoutDirection,

                focusNode: async (node: Node, padding: number = 300) => {
                    await focusNode(graph(), node, padding)
                },
                fitAndLayout,
            }
        }
    )