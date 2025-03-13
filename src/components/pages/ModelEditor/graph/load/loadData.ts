import {
    GenAssociationModelInput,
    GenModelInput,
    GenTableModelInput
} from "@/api/__generated/model/static";
import {loadTableModelInputs} from "./loadTableNode.ts";
import {Graph} from '@antv/x6'
import {
    loadAssociationModelInputs
} from "@/components/pages/ModelEditor/graph/load/loadAssociationEdge.ts";
import {DeepReadonly} from "vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";

export interface TableLoadOptions {
    x?: number,
    y?: number
}

export const loadModelInputs = (
    model: DeepReadonly<GenModelInput>,
    graph: Graph,
    tables: DeepReadonly<GenTableModelInput[]>,
    associations: DeepReadonly<GenAssociationModelInput[]>,
    baseOptions?: DeepReadonly<TableLoadOptions>,
    eachTableOptions?: DeepReadonly<TableLoadOptions[]>
) => {
    graph.startBatch('Load from inputs')

    const {
        nodes,
        tableNameMap
    } = loadTableModelInputs(
        model,
        graph,
        tables,
        baseOptions,
        eachTableOptions
    )

    associations = associations
        .filter(it => tableNameMap.has(it.targetTableName))
        .filter(it => tableNameMap.has(it.sourceTableName))

    // 根据同名表覆盖 association 的 source 和 target
    const newAssociations = associations.map(association => {
        const tempAssociation = cloneDeepReadonly<GenAssociationModelInput>(association)

        const sourceSameNameList = tableNameMap.get(association.sourceTableName)
        if (sourceSameNameList && sourceSameNameList.length > 1) {
            tempAssociation.sourceTableName = sourceSameNameList[sourceSameNameList.length - 1].name
        }

        const targetSameNameList = tableNameMap.get(association.targetTableName)
        if (targetSameNameList && targetSameNameList.length > 1) {
            tempAssociation.targetTableName = targetSameNameList[targetSameNameList.length - 1].name
        }

        return tempAssociation
    })

    const {edges} = loadAssociationModelInputs(graph, newAssociations)

    graph.stopBatch('Load from inputs')

    return {nodes, edges}
}
