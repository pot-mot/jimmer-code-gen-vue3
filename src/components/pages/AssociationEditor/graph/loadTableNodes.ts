import {Edge, Graph, Node} from "@antv/x6";
import {getTables, importTableNodes, removeTableNodes} from "./tableNode.ts";
import {sendMessage} from "@/utils/message.ts";
import {api} from "@/api";
import {importAssociationEdges} from "@/components/pages/AssociationEditor/business/graphOperation.ts";

/**
 * 根据是否存在在图中将 TableNode id 分组
 * @param graph 图
 * @param tableIds
 * @returns 过滤结果
 */
const groupTableIdByExisted = (graph: Graph, tableIds: readonly number[]) => {
    const idSet = new Set(getTables(graph).map(table => table.id))

    const existedIds: number[] = []
    const newIds: number[] = []

    tableIds.forEach(id => {
        if (idSet.has(id)) {
            existedIds.push(id)
        } else {
            newIds.push(id)
        }
    })


    return {
        existedIds,
        newIds,
    }
}

/**
 * 向图中添加 TableNode
 * @param graph 图
 * @param ids 要添加的 table id
 * @param replace 替换已存在的 node
 * @returns 新增 table，已存在的 id
 */
export const loadTableNodes = async (graph: Graph, ids: number[], replace: boolean = true): Promise<{
    nodes: Node[],
    edges: Edge[],
    existedIds: number[],
}> => {
    if (ids.length == 0) {
        sendMessage("表数量为 0，无法加载", "error")
        throw new Error("table ids is empty, can not load")
    }

    const {existedIds, newIds} = groupTableIdByExisted(graph, ids)

    let requestIds = newIds

    if (replace) {
        removeTableNodes(graph, existedIds)
        requestIds = ids
    }

    graph.startBatch('add nodes')

    const tables = requestIds.length > 0 ?
        await api.tableService.queryColumnsView({query: {ids: requestIds}}) : []

    const nodes = importTableNodes(graph, tables)

    const associations = await api.associationService.queryByTable({tableIds: ids})

    const edges = importAssociationEdges(graph, associations.map(view => {
        return {
            associationType: view.associationType,
            columnReferences: view.columnReferences.map(it => {
                return {
                    sourceColumnId: it.sourceColumn.id,
                    targetColumnId: it.targetColumn.id
                }
            }),

            fake: view.fake,
            name: view.name,

            sourceTableId: view.sourceTable.id,
            targetTableId: view.targetTable.id
        }
    }))

    graph.stopBatch('add nodes')

    return {nodes, edges, existedIds}
}
