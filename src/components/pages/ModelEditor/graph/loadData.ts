import {GenAssociationModelInput, GenTableColumnsView, GenTableModelInput} from "@/api/__generated/model/static";
import {api} from "@/api";
import {loadTableModelInputs, tableViewToInput} from "./tableNode/load.ts";
import {Graph} from '@antv/x6'
import {
    associationViewToInput,
    loadAssociationModelInputs
} from "@/components/pages/ModelEditor/graph/associationEdge/load.ts";

/**
 * 将 tables 导入画布
 */
export const produceTableViewsToInputs = async (tables: GenTableColumnsView[]) => {
    let associations = await api.associationService.queryByTable({
        body: {
            tableIds: tables.map(it => it.id),
            selectType: "OR"
        }
    })

    return {
        tables: tables.map(it => tableViewToInput(it)),
        associations: associations.map(it => associationViewToInput(it))
    }
}

export interface TableLoadOptions {
    x?: number,
    y?: number
}

export const loadModelInputs = (
    graph: Graph,
    tables: GenTableModelInput[],
    associations: GenAssociationModelInput[],
    baseOptions?: TableLoadOptions,
    eachTableOptions?: TableLoadOptions[]
) => {
    graph.startBatch('Load from inputs')

    const {
        nodes,
        tableNameMap
    } = loadTableModelInputs(
        graph,
        tables,
        baseOptions,
        eachTableOptions
    )

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

    const edges = loadAssociationModelInputs(graph, associations)

    graph.stopBatch('Load from inputs')

    return {nodes, edges}
}
