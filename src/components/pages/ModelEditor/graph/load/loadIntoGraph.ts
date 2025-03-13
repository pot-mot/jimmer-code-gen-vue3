import {
    GenAssociationModelInput,
    GenModelInput,
    GenModelInput_TargetOf_enums,
    GenModelInput_TargetOf_subGroups,
    GenTableModelInput
} from "@/api/__generated/model/static";
import {loadTableModelInputs} from "./loadTableNode.ts";
import {Graph} from '@antv/x6'
import {loadAssociationModelInputs} from "@/components/pages/ModelEditor/graph/load/loadAssociationEdge.ts";
import {DeepReadonly} from "vue";
import {cloneDeepReadonly} from "@/utils/cloneDeepReadonly.ts";

export interface TableLoadOptions {
    x?: number,
    y?: number
}

type ModelGraphInput = {
    subGroups?: DeepReadonly<Array<GenModelInput_TargetOf_subGroups>>
    enums?: DeepReadonly<Array<GenModelInput_TargetOf_enums>>,
    tables?: DeepReadonly<GenTableModelInput[]>,
    associations?: DeepReadonly<GenAssociationModelInput[]>,
    baseTableOptions?: DeepReadonly<TableLoadOptions>,
    eachTableOptions?: DeepReadonly<TableLoadOptions[]>
}

export const loadIntoGraph = (
    model: DeepReadonly<GenModelInput>,
    graph: Graph,
    input: ModelGraphInput
) => {
    graph.startBatch('Load into graph')

    // TODO 完善 subGroups 和 enums 的导入，并调整返回值
    const {
        subGroups = [] as DeepReadonly<Array<GenModelInput_TargetOf_subGroups>>,
        enums = [] as DeepReadonly<Array<GenModelInput_TargetOf_enums>>,
        tables = [] as DeepReadonly<GenTableModelInput[]>,
        associations = [] as DeepReadonly<GenAssociationModelInput[]>,
        baseTableOptions,
        eachTableOptions
    } = input

    const {
        nodes,
        tableNameMap
    } = loadTableModelInputs(
        model,
        graph,
        tables,
        baseTableOptions,
        eachTableOptions
    )

    const filteredAssociations = associations
        .filter(it => tableNameMap.has(it.targetTableName))
        .filter(it => tableNameMap.has(it.sourceTableName))

    // 根据同名表覆盖 association 的 source 和 target
    const newAssociations = filteredAssociations.map(association => {
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
