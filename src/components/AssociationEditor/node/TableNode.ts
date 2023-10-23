import {GenTableColumnView} from "../../../api/__generated/model/static";
import {Cell, Graph, Node, Edge} from "@antv/x6";
import {COLUMN_HEIGHT, COLUMN_PORT} from "../constant";
import {columnToPort} from "../port/ColumnPort.ts";
import {api} from "../../../api";
import {importAssociationEdges} from "../edge/AssociationEdge.ts";
import {nextTick} from "vue";
import {sendMessage} from "../../../utils/message.ts";
import { saveAs } from 'file-saver';

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

export const getTableNode = (graph: Graph, id: number): Node | undefined => {
    const cell: Cell = graph.getCellById(tableIdToNodeId(id))
    if (cell && cell.isNode()) {
        return cell as Node
    }
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
    return nodes
}

/**
 * 过滤存在的 TableNode id
 * @param graph 图
 * @param tableIds
 * @returns 过滤结果
 */
const filterExistedTableNodeIds = (graph: Graph, tableIds: readonly number[]): number[] => {
    const idSet = new Set(tableIds);
    return getTables(graph)
        .filter(table => idSet.has(table.id))
        .map(table => table.id);
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

    const tables = await api.tableService.listColumnView({ids})
    const existedIds = filterExistedTableNodeIds(graph, ids)

    if (replace) {
        removeTableNodes(graph, existedIds)
    }

    graph.startBatch('add nodes')

    const nodes = importTableNodes(graph, tables)

    const associations = await api.associationService.selectByTable({tableIds: ids})

    const edges = importAssociationEdges(graph, associations)

    graph.stopBatch('add nodes')

    return {nodes, edges, existedIds}
}

/**
 * 根据关键词进行节点查找
 * @param graph 图
 * @param keywords 关键词
 * @returns 节点列表
 */
export const searchTableNodes = (graph: Graph, keywords: string[]): Node[] => {
    if (keywords.length == 0) {
        return []
    }

    return graph.getNodes().filter(node => {
        if (node.data && node.data.table) {
            const table: GenTableColumnView = node.data.table
            for (const keyword of keywords) {
                if (table.name.includes(keyword) || table.comment.includes(keyword)) {
                    return true
                }
            }
        }
    })
}

/**
 * 聚焦于某个节点，进行缩放
 * @param graph 图
 * @param cell 目标 Cell
 */
export const focusCell = async (graph: Graph, cell: Cell) => {
    cell.toFront()
    graph.cleanSelection()
    graph.centerCell(cell)
    graph.select(cell)

    await nextTick()
}

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