import {GenTableColumnView} from "../../../api/__generated/model/static";
import {Graph, Node, Edge} from "@antv/x6";
import {COLUMN_HEIGHT, COLUMN_PORT} from "../constant.ts";
import {columnToPort} from "../port/ColumnPort.ts";
import {api} from "../../../api";
import {sendMessage} from "../../../utils/message.ts";
import {importAssociationEdges} from "../api.ts";

export const tableIdToNodeId = (id: number) => {
    return `table-${id}`
}

export const nodeIdToTableId = (id: string) => {
    return parseInt(id.replace('table-', ''))
}

const tableToNode = (table: GenTableColumnView, options: any = undefined) => {
    return {
        ...options,
        shape: "table",
        data: {table},
        id: tableIdToNodeId(table.id),
        ports: {
            groups: {
                COLUMN_PORT_GROUP: {
                    position: COLUMN_PORT,
                    markup: [
                        {
                            tagName: 'rect',
                            selector: 'portBody',
                        }
                    ],
                    attrs: {
                        portBody: {
                            magnet: true,
                            fill: "rgba(0,0,0,0)",
                            height: COLUMN_HEIGHT
                        }
                    }
                },
            },
            items: [
                ...table.columns.map(columnToPort)
            ]
        },
    }
}

export const nodeToTable = (node: Node): GenTableColumnView => {
    return node.data.table
}

export const getTables = (graph: Graph): GenTableColumnView[] => {
    return graph.getNodes().map(nodeToTable)
}

/**
 * 插入 TableNode
 * @param graph
 * @param tables
 */
export const importTableNodes = (graph: Graph, tables: readonly GenTableColumnView[]): Node[] => {
    const nodes: Node[] = tables.map(table => {
        const svgRect = graph.view.svg.getBoundingClientRect()
        return tableToNode(table, graph.graphToLocal(
            svgRect.width / 2,
            svgRect.height / 2
        ))
    })

    graph.addNodes(nodes)

    return graph.getNodes().filter(node => nodes.map(it => it.id).includes(node.id))
}

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
 * 从图中移除 TableNode
 * @param graph
 * @param ids
 */
export const removeTableNodes = (graph: Graph, ids: readonly number[]) => {
    graph.removeCells(ids.map(id => tableIdToNodeId(id)))
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
        await api.tableService.listColumnView({ids: requestIds}) : []

    const nodes = importTableNodes(graph, tables)

    const associations = await api.associationService.selectByTable({tableIds: ids})

    const edges = importAssociationEdges(graph, associations)

    graph.stopBatch('add nodes')

    return {nodes, edges, existedIds}
}

export const tableNodeMatchMethod = (node: Node, keyword: string): boolean => {
    const keywords = keyword.split(',')

    if (node.data && node.data.table) {
        const table: GenTableColumnView = node.data.table
        for (const keyword of keywords) {
            if (table.name.includes(keyword) || table.comment.includes(keyword)) {
                return true
            }
        }
    }
    return false
}