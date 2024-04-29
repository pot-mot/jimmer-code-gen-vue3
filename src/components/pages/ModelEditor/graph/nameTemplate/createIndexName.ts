import {useGenConfigContextStore} from "@/components/business/genConfig/ContextGenConfigStore.ts";
import {removeSplitPrefixAndSuffix} from "@/utils/suffixAndPrefix.ts";
import {GenTableModelInput_TargetOf_indexes} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";

const indexNameTemplate = (
    columnNames: DeepReadonly<Array<string>>,
    unique: boolean,
): string => {
    const context = useGenConfigContextStore().context

    columnNames = columnNames.map(it => {
        return removeSplitPrefixAndSuffix(it, context.columnNamePrefixes, context.columnNameSuffixes)
    })

    let indexName = 'idx_' + columnNames.join("_")

    if (unique) {
        indexName = "u" + indexName
    }

    switch (context.databaseNamingStrategy) {
        case "LOWER_CASE":
            return indexName.toLowerCase()
        case "UPPER_CASE":
            return indexName.toUpperCase()
        case "RAW":
            return indexName
    }
}

export const createIndexName = (
    index: DeepReadonly<GenTableModelInput_TargetOf_indexes>
): string => {
    return indexNameTemplate(
        index.columns.map(it => it.name),
        index.uniqueIndex,
    )
}
