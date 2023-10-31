import {api} from "../../api";
import {saveAs} from "file-saver";
import {nodeIsExist, searchEdgesIgnoreDirection} from "../../utils/graphEditor/search.ts";
import {associationToEdge, getAssociations} from "./edge/AssociationEdge.ts";
import {Edge, Graph} from "@antv/x6";
import {GenAssociationInput, GenAssociationMatchView, GenTableColumnView} from "../../api/__generated/model/static";
import {sendMessage} from "../../utils/message.ts";
import {erRouter, orthRouter} from "../../utils/graphEditor/router.ts";
import {getTables} from "./node/TableNode.ts";
import {GenTableColumnView_TargetOf_columns} from "../../api/__generated/model/static/GenTableColumnView.ts";

export const convertEntities = async (tableIds: number[]) => {
    return await api.generateService.convert({body: tableIds})
}

export const previewEntities = async (entityIds: number[]) => {
    return await api.generateService.preview({entityIds})
}

export const generateEntitiesByTable = async (tableIds: number[]) => {
    const res = (await api.generateService.generateByTable({body: tableIds})) as any as Blob
    const file = new File([res], "entities.zip")
    saveAs(file)
}

export const generateEntities = async (entityIds: number[]) => {
    const res = (await api.generateService.generate({body: entityIds})) as any as Blob
    const file = new File([res], "entities.zip")
    saveAs(file)
}

/**
 * 插入 AssociationEdge
 * @param graph
 * @param associations
 */
export const importAssociationEdges = (graph: Graph, associations: readonly GenAssociationMatchView[]): Edge[] => {
    const edges: Edge[] = []

    try {
        associations.map(associationToEdge).forEach(newEdge => {
            const sourceCellId = newEdge.getSourceCellId()
            if (!sourceCellId || !nodeIsExist(graph, sourceCellId)) return

            const targetCellId = newEdge.getTargetCellId()
            if (!targetCellId || !nodeIsExist(graph, targetCellId)) return

            const sourcePortId = newEdge.getSourcePortId()
            if (!sourcePortId) return
            const targetPortId = newEdge.getTargetPortId()
            if (!targetPortId) return

            const existAssociations = searchEdgesIgnoreDirection(graph, sourcePortId, targetPortId)
            if (existAssociations) {
                graph.removeCells(existAssociations)
            }

            if (targetCellId == sourceCellId) {
                newEdge.router = orthRouter
            } else {
                newEdge.router = erRouter
            }

            edges.push(newEdge)
        })

        graph.addEdges(edges)
    } catch (e) {
        sendMessage('edge import fail', 'error', e)
    }

    return edges
}

/**
 * 保存 AssociationEdge
 */
export const saveAssociations = async (graph: Graph) => {
    try {
        const tables = getTables(graph)
        const associations = getAssociations(graph)

        const tableMap = new Map<number, GenTableColumnView>
        const columnMap = new Map<number, GenTableColumnView_TargetOf_columns>

        tables.forEach(table => {
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
                fake: true
            }
        }

        await api.associationService.deleteByTable({tableIds: [...tableMap.keys()]})
        await api.associationService.save({body: associations.map(viewToInput)})

        sendMessage("关联保存成功", "success")
    } catch (e) {
        sendMessage("关联保存失败", "error", e)
    }
}