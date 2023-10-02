import {GenTableColumnView} from "../../../api/__generated/model/static";
import {Cell, Graph, Node} from "@antv/x6";
import {COLUMN_HEIGHT, COLUMN_PORT} from "../constant";
import {columnToPort} from "../port/ColumnPort.ts";
import {api} from "../../../api";
import {importAssociationEdges} from "../edge/AssociationEdge.ts";
import {nextTick} from "vue";
import {sendMessage} from "../../../utils/message.ts";
import {getSelectedNodes} from "../graph/useSelection.ts";
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
export const addTableNodes = (graph: Graph, tables: readonly GenTableColumnView[]) => {
    graph.addNodes(tables.map(table => {
        const svgRect = graph.view.svg.getBoundingClientRect()
        return tableToNode(table, graph.graphToLocal(
            svgRect.width / 2 - svgRect.width / 8,
            svgRect.height / 2 - svgRect.height / 8
        ))
    }))
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
export const importTableNodes = async (graph: Graph, ids: number[], replace: boolean = true) => {
    const add = await api.tableService.listColumnView({ids})
    const existedIds = filterExistedTableNodeIds(graph, ids)

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

export const mappingEntities = async (graph: Graph, tableIds?: number[]) => {
    const body: number[] = []

    if (!tableIds) {
        if (graph.isSelectionEmpty()) {
            body.push(...graph.getNodes().map(node => nodeIdToTableId(node.id)))
        } else {
            body.push(...getSelectedNodes(graph).map(node => nodeIdToTableId(node.id)))
        }
    } else {
        body.push(...tableIds)
    }

    const res = await api.entityService.mapping({body})
    sendMessage("实体映射成功，实体id：" + res, "Success")
    return res
}

export const previewEntities = async (graph: Graph, tableIds?: number[]) => {
    const entityIds = await mappingEntities(graph, tableIds)
    return await api.entityService.preview({entityIds})
}

export const generateEntities = async (body: number[]) => {
    const res = (await api.entityService.generate({body})) as any as Blob
    const file = new File([res], "entities.zip")
    saveAs(file)
}