import {Edge, Graph, Shape} from "@antv/x6";
import {COMMON_COLOR, MANY_TO_ONE, ONE_TO_ONE} from "../constant";
import {AssociationType} from "../../../api/__generated/model/enums";
import {GenAssociationInput, GenAssociationMatchView, GenTableColumnView} from "../../../api/__generated/model/static";
import {columnIdToPortId, portIdToColumnId} from "../port/ColumnPort.ts";
import {getTables, nodeIdToTableId, tableIdToNodeId} from "../node/TableNode.ts";
import {Options} from "@antv/x6/es/graph/options";
import Connecting = Options.Connecting;
import {GenTableColumnView_TargetOf_columns} from "../../../api/__generated/model/static/GenTableColumnView.ts";
import {api} from "../../../api";
import {sendMessage} from "../../../utils/message.ts";

const baseColumnEdge = {
    attrs: {
        line: {
            stroke: COMMON_COLOR,
            strokeWidth: 1,
        },
    },
    labels: [{
        markup: [
            {
                tagName: 'text',
                selector: 'label',
            },
        ],
        attrs: {
            label: {
                text: MANY_TO_ONE
            },
        }
    }],
    data: {
        selectFlag: false
    }
}

const erRouter = {
    name: 'er',
    args: {
        direction: 'H',
    }
}

const orthRouter = {
    name: 'orth',
    args: {
        padding: 20,
    },
}

export const AssociationEdgeConnecting: Partial<Connecting> = {
    validateConnection({sourcePort, targetPort}) {
        if (!sourcePort || !targetPort) return false
        return searchEdgesIgnoreDirection(<any>this, sourcePort, targetPort).length == 0
    },

    // @ts-ignore
    createEdge() {
        return new Shape.Edge({
            ...baseColumnEdge,
            router: erRouter
        })
    },
    // 在连接建立后调整 router
    validateEdge(edge) {
          if (edge.edge.getTargetCellId() == edge.edge.getSourceCellId()) {
              edge.edge.router = orthRouter
          }
          return true
    },

    allowBlank: false,
    allowNode: false,
    allowEdge: false,
}

/**
 * 判断节点是否存在
 * @param graph
 * @param nodeId
 */
export const nodeIsExist = (graph: Graph, nodeId: string): boolean => {
    const cell = graph.getCellById(nodeId)
    return cell && cell.isNode()
}

/**
 * 寻找 Edge
 * @param graph 图
 * @param sourcePort 源连接桩
 * @param targetPort 目标连接桩
 * @returns Edge 数组
 */
export const searchEdges = (graph: Graph, sourcePort: string, targetPort: string): Edge[] => {
    return graph.getEdges().filter(edge => edge.getSourcePortId() == sourcePort && edge.getTargetPortId() == targetPort)
}

/**
 * 寻找 Edge，忽视方向
 * @param graph 图
 * @param port1 连接桩1
 * @param port2 连接桩2
 * @returns Edge 数组
 */
export const searchEdgesIgnoreDirection = (graph: Graph, port1: string, port2: string): Edge[] => {
    return graph.getEdges().filter(
        edge =>
            (edge.getTargetPortId() == port1 && edge.getSourcePortId() == port2) ||
            (edge.getTargetPortId() == port2 && edge.getSourcePortId() == port1)
    )
}

export const setLabel = (edge: Edge, label: string) => {
    edge.setLabelAt(0, label)
}

export const getLabel = (edge: Edge): AssociationType => {
    return edge.labels[0].attrs!.label.text as AssociationType;
}

/** 转换关联为 Edge */
export const associationToEdge = (association: GenAssociationMatchView): Edge => {
    const edge: Edge = new Shape.Edge<Edge.Properties>({
        ...baseColumnEdge,
        source: {
            cell: tableIdToNodeId(association.sourceColumn.table!.id),
            port: columnIdToPortId(association.sourceColumn.id)
        },
        target: {
            cell: tableIdToNodeId(association.targetColumn.table!.id),
            port: columnIdToPortId(association.targetColumn.id)
        },
    })
    if (association.associationType) {
        setLabel(edge, association.associationType)
    }
    return edge
}

/** 转换 Edge 为关联 */
export const edgeToAssociation = (edge: Edge): GenAssociationMatchView => {
    return {
        sourceColumn: {
            id: portIdToColumnId(edge.getSourcePortId()!),
            table: {
                id: nodeIdToTableId(edge.getSourceNode()!.id)
            }
        },
        targetColumn: {
            id: portIdToColumnId(edge.getTargetPortId()!),
            table: {
                id: nodeIdToTableId(edge.getTargetNode()!.id)
            }
        },
        associationType: getLabel(edge),
    }
}

export const getAssociations = (graph: Graph): GenAssociationMatchView[] => {
    return graph.getEdges().map(edgeToAssociation)
}

/**
 * 插入 AssociationEdge
 * @param graph
 * @param associations
 */
export const importAssociationEdges = (graph: Graph, associations: readonly GenAssociationMatchView[]) => {
    graph.startBatch('add edge')

    associations.map(associationToEdge).forEach(newEdge => {
        try {
            const sourceCellId = newEdge.getSourceCellId()
            if (!sourceCellId || !nodeIsExist(graph, sourceCellId)) return

            const targetCellId = newEdge.getTargetCellId()
            if (!targetCellId || !nodeIsExist(graph, targetCellId)) return

            const sourcePortId = newEdge.getSourcePortId()
            if (!sourcePortId) return
            const targetPortId = newEdge.getTargetPortId()
            if (!targetPortId) return

            const isExist = searchEdgesIgnoreDirection(graph, sourcePortId, targetPortId).length > 0
            if (isExist) return

            if (targetCellId == sourceCellId) {
                newEdge.router = orthRouter
            } else {
                newEdge.router = erRouter
            }

            graph.addEdge(newEdge)
        } catch (e) {
            console.warn('add edge fail', newEdge, e)
        }
    })

    graph.stopBatch('add edge')
}

/**
 * 保存 AssociationEdge
 */
export const saveAssociations = async (graph: Graph) => {
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
        }
    }

    await api.associationService.deleteByTable({tableIds: [...tableMap.keys()]})
    await api.associationService.save({body: associations.map(viewToInput)})

    sendMessage("保存成功", "success")
}


export const useSwitchAssociationType = (graph: Graph) => {
    graph.on('edge:unselected', (cell) => {
        if (!cell) return
        cell.edge.getData().selectFlag = false
    })

    graph.on('edge:click', ({edge, e}) => {
        if (!edge ||  e.ctrlKey) return

        if (!edge.getData().selectFlag) {
            edge.getData().selectFlag = true

            if (edge.getTargetCellId() != edge.getSourceCellId()) {
                graph.select(edge.getTargetCellId())
                graph.select(edge.getSourceCellId())
            } else {
                graph.select(edge.getTargetCellId())
            }

            return
        }

        if (getLabel(edge) == MANY_TO_ONE) {
            setLabel(edge, ONE_TO_ONE)
        } else {
            setLabel(edge, MANY_TO_ONE)
        }
    })
}