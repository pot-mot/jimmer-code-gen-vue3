import {GenAssociationView, GenTableColumnsInput, GenTableColumnsView} from "@/api/__generated/model/static";
import {GenTableColumnsInput_TargetOf_columns} from "@/api/__generated/model/static/GenTableColumnsInput.ts";
import {api} from "@/api";
import {importModelNodes} from "./modelNode.ts";
import {Edge, Graph, Node, Shape} from '@antv/x6'
import {searchEdgesIgnoreDirection} from "@/components/global/graphEditor/search.ts";
import {erRouter, orthRouter} from "@/components/global/graphEditor/edgeRouter.ts";
import {baseAssociationEdge} from "@/components/pages/AssociationEditor/graph/edge/AssociationEdge.ts";

const tableViewToInput = (tableView: GenTableColumnsView): GenTableColumnsInput => {
    return {
        comment: tableView.comment,
        name: tableView.name,
        orderKey: tableView.orderKey,
        remark: tableView.remark,
        type: tableView.type,
        columns: tableView.columns.map(column => {
            return <GenTableColumnsInput_TargetOf_columns>{
                autoIncrement: column.autoIncrement,
                comment: column.comment,
                defaultValue: column.defaultValue,
                displaySize: column.displaySize,
                name: column.name,
                numericPrecision: column.numericPrecision,
                orderKey: column.orderKey,
                partOfFk: column.partOfFk,
                partOfPk: column.partOfPk,
                partOfUniqueIdx: column.partOfUniqueIdx,
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

const importAssociationViews = (graph: Graph, associations: readonly GenAssociationView[]): Edge[] => {
    const edges: Edge[] = []

    associations.map(association => {
        const sourceNode = graph.getNodes().filter(it => it.getData()?.table.name == association.sourceColumn.table.name)[0]
        if (!sourceNode || !sourceNode.id) return
        const targetNode = graph.getNodes().filter(it => it.getData()?.table.name == association.targetColumn.table.name)[0]
        if (!targetNode || !targetNode.id) return

        const sourcePort = sourceNode.getPorts().filter(it => it.data?.column.name == association.sourceColumn.name)[0]
        if (!sourcePort || !sourcePort.id) return
        const targetPort = targetNode.getPorts().filter(it => it.data?.column.name == association.targetColumn.name)[0]
        if (!targetPort || !targetPort.id) return

        const existAssociations = searchEdgesIgnoreDirection(graph, sourcePort.id, targetPort.id)
        graph.removeCells(existAssociations)

        const newEdge = new Shape.Edge<Edge.Properties>({
            ...baseAssociationEdge,
            source: {
                cell: sourceNode.id,
                port: sourcePort.id
            },
            target: {
                cell: targetNode.id,
                port: targetPort.id
            }
        })

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

export const loadModelNodes = async (graph: Graph, tables: GenTableColumnsView[]) => {
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