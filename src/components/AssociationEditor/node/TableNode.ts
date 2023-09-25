import {GenTableColumnsView} from "../../../api/__generated/model/static";
import {Graph, Node} from "@antv/x6";
import {COLUMN_HEIGHT, COLUMN_PORT} from "../constant";
import {columnToPort} from "../port/ColumnPort.ts";
import {api} from "../../../api";
import {importAssociationEdges} from "../edge/AssociationEdge.ts";
import {nextTick} from "vue";

export const tableIdToNodeId = (id: number) => {
    return `table-${id}`
}

export const nodeIdToTableId = (id: string) => {
    return parseInt(id.replace('table-', ''))
}

const tableToNode = (table: GenTableColumnsView, options: any = undefined) => {
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

export const nodeToTable = (node: Node): GenTableColumnsView => {
    return node.data.table
}

export const getTables = (graph: Graph): GenTableColumnsView[] => {
    return graph.getNodes().map(nodeToTable)
}

/**
 * 插入 TableNode
 * @param graph
 * @param tables
 */
export const addTableNodes = (graph: Graph, tables: readonly GenTableColumnsView[]) => {
    graph.addNodes(tables.map(table => {
        const svgRect = graph.view.svg.getBoundingClientRect()
        return tableToNode(table, graph.graphToLocal(
            svgRect.width / 2 - svgRect.width / 8,
            svgRect.height / 2 - svgRect.height / 8
        ))
    }))
}

/**
 * 获取存在的 TableNode id
 * @param graph 图
 * @param tableIds
 * @returns 过滤结果
 */
const getExistedTableNodeIds = (graph: Graph, tableIds: readonly number[]): number[] => {
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
export const importTableNodes = async (graph: Graph, ids: number[], replace: boolean = true) => {
    const add = await api.tableService.list({ids})
    const existedIds = getExistedTableNodeIds(graph, ids)

    if (replace) {
        removeTableNodes(graph, existedIds)
    }

    graph.startBatch('add nodes')

    addTableNodes(graph, add)

    const associations = await api.associationService.selectByTable({tableIds: ids})

    importAssociationEdges(graph, associations)

    graph.stopBatch('add nodes')

    return {add, existedIds}
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
            const table: GenTableColumnsView = node.data.table
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
 * @param node 目标节点
 * @param padding 缩放内边距
 */
export const focusNode = async (graph: Graph, node: Node, padding: number = 300) => {
    node.toFront()
    graph.cleanSelection()
    graph.centerCell(node)
    graph.select(node)

    const {width, height} = node.getSize()
    const {x, y} = node.getPosition()

    await nextTick()

    graph.zoomToRect({
        width: width + padding * 2,
        x: x - padding,
        y: y - padding,
        height: height + padding * 2
    })
}