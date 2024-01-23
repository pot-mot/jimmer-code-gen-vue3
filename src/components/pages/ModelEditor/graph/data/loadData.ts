import {
    GenAssociationModelInput,
    GenTableModelInput,
    GenTableColumnsView
} from "@/api/__generated/model/static";
import {api} from "@/api";
import {importTables, tableViewToInput} from "../tableNode/importTable.ts";
import {Graph} from '@antv/x6'
import {associationViewToInput, importAssociations} from "@/components/pages/ModelEditor/graph/associationEdge/importAssociation.ts";

/**
 * 将 tables 导入画布
 */
export const loadByTableViews = async (graph: Graph, tables: GenTableColumnsView[]) => {
    let associations = await api.associationService.queryByTable({
        body: {
            tableIds: tables.map(it => it.id),
            selectType: "OR"
        }
    })

    return loadByInputs(
        graph,
        tables.map(it => tableViewToInput(it)),
        associations.map(it => associationViewToInput(it))
    )
}

export const loadByInputs = (
    graph: Graph,
    tables: GenTableModelInput[],
    associations: GenAssociationModelInput[]
) => {
    graph.startBatch('Load from inputs')

    const {nodes, tableNameMap} = importTables(graph, tables)

    associations = associations
        .filter(it => tableNameMap.has(it.targetTable.name))
        .filter(it => tableNameMap.has(it.sourceTable.name))

    // 根据同名表覆盖 association 的 source 和 target
    associations.forEach(association => {
        const sourceSameNameList = tableNameMap.get(association.sourceTable.name)
        if (sourceSameNameList && sourceSameNameList.length > 1) {
            association.sourceTable.name = sourceSameNameList[sourceSameNameList.length - 1].name
        }

        const targetSameNameList = tableNameMap.get(association.targetTable.name)
        if (targetSameNameList && targetSameNameList.length > 1) {
            association.targetTable.name = targetSameNameList[targetSameNameList.length - 1].name
        }
    })

    const edges = importAssociations(graph, associations)

    graph.stopBatch('Load from inputs')

    return {nodes, edges}
}
