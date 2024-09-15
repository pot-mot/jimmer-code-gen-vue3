import {useGenConfigContextStore} from "@/components/business/genConfig/ContextGenConfigStore.ts";
import {removeSplitPrefixAndSuffix} from "@/utils/suffixAndPrefix.ts";
import {GenTableModelInput_TargetOf_indexes} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {processNamingStrategy} from "@/components/pages/ModelEditor/graph/nameTemplate/namingStrategyProcess.ts";

const indexNameTemplate = (
    tableName: string,
    columnNames: DeepReadonly<Array<string>>,
    unique: boolean,
): string => {
    const context = useGenConfigContextStore().context

    columnNames = columnNames.map(it => {
        return removeSplitPrefixAndSuffix(it, context.columnNamePrefixes, context.columnNameSuffixes)
    })

    let indexName = `${tableName}_${columnNames.join("_")}`


    indexName = `idx_${indexName}`
    if (unique) {
        indexName = `u_${indexName}`
    }

    return processNamingStrategy(indexName, context.databaseNamingStrategy)
}

export const createIndexName = (
    tableName: string,
    index: DeepReadonly<Omit<GenTableModelInput_TargetOf_indexes, 'name'>>,
): string => {
    return indexNameTemplate(
        tableName,
        index.columns.map(it => it.name),
        index.uniqueIndex,
    )
}
