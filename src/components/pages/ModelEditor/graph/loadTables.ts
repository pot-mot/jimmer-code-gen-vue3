import {
    GenAssociationModelInput,
    GenAssociationView,
    GenTableColumnsInput,
    GenTableColumnsView
} from "@/api/__generated/model/static";
import {GenTableColumnsInput_TargetOf_columns} from "@/api/__generated/model/static/GenTableColumnsInput.ts";
import {api} from "@/api";
import {importModelNodes} from "./modelNode.ts";
import {Edge, Graph, Node, Shape} from '@antv/x6'
import {searchEdgesIgnoreDirection} from "@/components/business/graphEditor/common/search.ts";
import {erRouter, orthRouter} from "@/components/business/graphEditor/edgeRouter.ts";

import {baseAssociationEdge} from "@/components/business/model/associationEdge/define.ts";
import {cloneDeep} from "lodash";

/**
 * 将 tables 导入画布
 */
export const loadTables = async (graph: Graph, tables: GenTableColumnsView[]) => {
    graph.startBatch('loadModelNodes')

    const existedNodes = graph.getNodes()
        .filter(it =>
            tables
                .map(it => it.name)
                .includes(it.getData()?.table?.name)
        )

    graph.removeCells(existedNodes)

    const nodes: Node[] = importModelNodes(graph, tables.map(it => tableViewToInput(it)))

    const associations = await api.associationService.queryByTable({
        tableIds: tables.map(it => it.id),
        selectType: "OR"
    })

    const edges: Edge[] = importAssociationViews(graph, associations)

    graph.stopBatch('loadModelNodes')

    return {nodes, edges}
}


const tableViewToInput = (tableView: GenTableColumnsView): GenTableColumnsInput => {
    return {
        comment: tableView.comment,
        name: tableView.name,
        orderKey: tableView.orderKey,
        remark: tableView.remark,
        type: tableView.type,
        indexes: tableView.indexes.map(indexView => {
            return {
                name: indexView.name,
                uniqueIndex: indexView.uniqueIndex,
                columns: tableView.columns
                    .filter(it => indexView.columnIds.includes(it.id))
                    .map(it => it.name)
                    .map(it => {
                        return {name: it}
                    })
            }
        }),
        columns: tableView.columns.map(column => {
            return <GenTableColumnsInput_TargetOf_columns>{
                autoIncrement: column.autoIncrement,
                comment: column.comment,
                defaultValue: column.defaultValue,
                displaySize: column.displaySize,
                name: column.name,
                numericPrecision: column.numericPrecision,
                orderKey: column.orderKey,
                partOfPk: column.partOfPk,
                remark: column.remark,
                type: column.type,
                typeCode: column.typeCode,
                typeNotNull: column.typeNotNull,
                logicalDelete: column.logicalDelete,
                businessKey: column.businessKey,
                enumId: column.enumId
            }
        }),
    }
}

const associationViewToInput = (
    associationView: GenAssociationView,
    sourceTable: GenTableColumnsInput,
    targetTable: GenTableColumnsInput,
    columnReferences: {
        sourceColumn: GenTableColumnsInput_TargetOf_columns,
        targetColumn: GenTableColumnsInput_TargetOf_columns
    }[]
): GenAssociationModelInput => {
    return {
        associationType: associationView.associationType,
        name: associationView.name,
        dissociateAction: associationView.dissociateAction,
        fake: associationView.fake,
        sourceTable: {
            comment: sourceTable.comment,
            name: sourceTable.name
        },
        targetTable: {
            comment: targetTable.comment,
            name: targetTable.name
        },

        columnReferences: columnReferences.map(({sourceColumn, targetColumn}) => {
            return {
                sourceColumn: {
                    comment: sourceColumn.comment,
                    name: sourceColumn.name,
                    type: sourceColumn.type,
                    typeCode: sourceColumn.typeCode,
                },
                targetColumn: {
                    comment: targetColumn.comment,
                    name: targetColumn.name,
                    type: targetColumn.type,
                    typeCode: targetColumn.typeCode,
                },
            }
        })
    }
}

const importAssociationViews = (graph: Graph, associations: readonly GenAssociationView[]): Edge[] => {
    const edges: Edge[] = []

    associations.map(association => {
        const sourceNode = graph.getNodes().filter(it => it.getData()?.table.name == association.sourceTable.name)[0]
        if (!sourceNode) return
        const targetNode = graph.getNodes().filter(it => it.getData()?.table.name == association.targetTable.name)[0]
        if (!targetNode) return

        const sourceTable = sourceNode.getData()?.table as GenTableColumnsInput
        if (!sourceTable) return
        const targetTable = targetNode.getData()?.table as GenTableColumnsInput
        if (!targetTable) return

        // TODO 处理多列关联

        const sourceColumnIndex = sourceTable.columns.findIndex(column => column.name == association.columnReferences[0]?.sourceColumn.name)
        if (sourceColumnIndex == -1) return
        const targetColumnIndex = targetTable.columns.findIndex(column => column.name == association.columnReferences[0]?.targetColumn.name)
        if (targetColumnIndex == -1) return

        const sourcePort = sourceNode.ports.items[sourceColumnIndex]
        if (!sourcePort || !sourcePort.id) return
        const targetPort = targetNode.ports.items[targetColumnIndex]
        if (!targetPort || !targetPort.id) return

        const sourceColumn = sourceTable.columns[sourceColumnIndex]
        const targetColumn = targetTable.columns[targetColumnIndex]

        const existAssociations = searchEdgesIgnoreDirection(graph, sourcePort.id, targetPort.id)

        graph.removeCells(existAssociations)

        const newEdge = new Shape.Edge<Edge.Properties>({
            ...cloneDeep(baseAssociationEdge),
            source: {
                cell: sourceNode.id,
                port: sourcePort.id
            },
            target: {
                cell: targetNode.id,
                port: targetPort.id
            },
            data: {
                association: associationViewToInput(
                    association,
                    sourceTable, targetTable,
                    [{sourceColumn, targetColumn}]
                )
            }
        })

        console.log(sourcePort.id, targetPort.id)
        console.log(newEdge.getSourcePortId(), newEdge.getTargetPortId())
        console.log(newEdge.getData())

        if (targetNode.id == sourceNode.id) {
            newEdge.router = orthRouter
        } else {
            newEdge.router = erRouter
        }

        graph.addEdge(newEdge)

        edges.push(newEdge)
    })

    return edges
}
