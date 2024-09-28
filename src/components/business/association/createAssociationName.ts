import {AssociationType} from "@/api/__generated/model/enums";
import {useGenConfigContextStore} from "@/store/config/ContextGenConfigStore.ts";
import {removeSplitPrefixAndSuffix} from "@/utils/suffixAndPrefix.ts";
import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {processNamingStrategy} from "@/components/business/genConfig/namingStrategyProcess.ts";

const associationNameTemplate = (
    sourceTableName: string,
    targetTableName: string,
    sourceColumnNames: string[] = [],
    targetColumnNames: string[] = [],
    type: AssociationType,
    withTarget: boolean,
    withColumnName: boolean,
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

    const sourceName = sourceTableName + (withColumnName ? '_' + sourceColumnNames.join("_") : '')
    const targetName = targetTableName + (withColumnName ? '_' + targetColumnNames.join("_") : '')

    // 多对多的关联名称是中间表
    if (type === 'MANY_TO_MANY') {
        associationName = `${sourceName}_` + (withTarget ? `${targetName}_` : '') + 'mapping'
    } else if (type === 'ONE_TO_MANY') {
        // 一对多的外键名称要反向
        associationName = `fk_${targetName}` + (withTarget ? `_${sourceName}` : '')
    } else {
        associationName = `fk_${sourceName}` + (withTarget ? `_${targetName}` : '')
    }

    return processNamingStrategy(associationName, context.databaseNamingStrategy)
}

export const createAssociationName = (
    association: DeepReadonly<Omit<GenAssociationModelInput, 'name'>>,
    sourceTableIsSuper: boolean,
    targetTableIsSuper: boolean,
): string => {
    return associationNameTemplate(
        sourceTableIsSuper ? '{}' : association.sourceTableName,
        targetTableIsSuper ? '{}' : association.targetTableName,
        association.columnReferences.map(it => it.sourceColumnName),
        association.columnReferences.map(it => it.targetColumnName),
        association.type,
        association.type === 'MANY_TO_MANY',
        association.type !== 'MANY_TO_MANY'
    )
}
