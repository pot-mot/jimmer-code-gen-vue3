import {AssociationType} from "@/api/__generated/model/enums";
import {useGenConfigContextStore} from "@/components/business/genConfig/ContextGenConfigStore.ts";
import {removeSplitPrefixAndSuffix} from "@/utils/suffixAndPrefix.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";

const associationNameTemplate = (
    sourceTableName: string,
    targetTableName: string,
    sourceColumnNames: string[] = [],
    targetColumnNames: string[] = [],
    type: AssociationType,
    withColumnNames: boolean = false
): string => {
    const context = useGenConfigContextStore().context

    sourceTableName = removeSplitPrefixAndSuffix(sourceTableName, context.tableNamePrefixes, context.tableNameSuffixes)
    targetTableName = removeSplitPrefixAndSuffix(targetTableName, context.tableNamePrefixes, context.tableNameSuffixes)

    sourceColumnNames = sourceColumnNames.map(it => {
        return removeSplitPrefixAndSuffix(it, context.columnNamePrefixes, context.columnNameSuffixes)
    })
    targetColumnNames = targetColumnNames.map(it => {
        return removeSplitPrefixAndSuffix(it, context.columnNamePrefixes, context.columnNameSuffixes)
    })

    let associationName

    const sourceName = sourceTableName + (withColumnNames ? "_" + sourceColumnNames.join("_") : "")
    const targetName = targetTableName + (withColumnNames ? "_" + targetColumnNames.join("_") : "")

    // 多对多的关联名称是中间表
    if (type === 'MANY_TO_MANY') {
        associationName = `${sourceName}_${targetName}_mapping`
    } else if (type === 'ONE_TO_MANY') {
        // 一对多的外键名称要反向
        associationName = `fk_${targetName}_${sourceName}`
    } else {
        associationName = `fk_${sourceName}_${targetName}`
    }

    switch(context.databaseNamingStrategy) {
        case "LOWER_CASE": return associationName.toLowerCase()
        case "UPPER_CASE": return associationName.toUpperCase()
        case "RAW": return associationName
    }
}

export const createAssociationName = (
    association: GenAssociationModelInput
): string => {
    return associationNameTemplate(
        association.sourceTable.name,
        association.targetTable.name,
        association.columnReferences.map(it => it.sourceColumn.name),
        association.columnReferences.map(it => it.targetColumn.name),
        association.type,
    )
}
