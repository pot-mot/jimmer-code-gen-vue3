import {
    GenTableColumnsView
} from "@/api/__generated/model/static";
import {api} from "@/api";
import {importTables} from "./tableNode.ts";
import {Edge, Graph} from '@antv/x6'
import {importAssociationViews} from "@/components/pages/ModelEditor/graph/associationEdge.ts";

/**
 * 将 tables 导入画布
 */
export const loadTables = async (graph: Graph, tables: GenTableColumnsView[]) => {
    graph.startBatch('loadModelNodes')

    const {nodes, tableNameMap} = importTables(graph, tables)

    let associations = await api.associationService.queryByTable({
        tableIds: tables.map(it => it.id),
        selectType: "OR"
    })

    associations = associations
        .filter(it => tableNameMap.has(it.targetTable.name))
        .filter(it => tableNameMap.has(it.sourceTable.name))

    // 根据同名表覆盖 association 的 source 和 target
    associations.forEach(association => {
        const sourceSameNameList = tableNameMap.get(association.sourceTable.name)
        if (sourceSameNameList && sourceSameNameList.length > 1) {
            const sourceTables = sourceSameNameList.filter(it => it.id == association.sourceTable.id)
            if (sourceTables.length == 1) {
                association.sourceTable.name = sourceTables[0].name
            }
        }

        const targetSameNameList = tableNameMap.get(association.targetTable.name)
        if (targetSameNameList && targetSameNameList.length > 1) {
            const targetTables = targetSameNameList.filter(it => it.id == association.targetTable.id)
            if (targetTables.length == 1) {
                association.targetTable.name = targetTables[0].name
            }
        }
    })

    const edges: Edge[] = importAssociationViews(graph, associations)

    graph.stopBatch('loadModelNodes')

    return {nodes, edges}
}
