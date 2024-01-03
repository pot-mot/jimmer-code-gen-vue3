import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {useGenConfigStore} from "@/components/business/genConfig/GenConfigStore.ts";
import {removeSplitPrefixAndSuffix} from "@/utils/suffixAndPrefix.ts";

export const getAssociationSourceLabel = (association: GenAssociationModelInput) => {
    const tempEdgeName: string[] = []

    if (association.sourceTable) {
        tempEdgeName.push(association.sourceTable.name)
        tempEdgeName.push(' . ')
        tempEdgeName.push(association.columnReferences.map(it => it.sourceColumn.name).join(","))
    } else {
        tempEdgeName.push('[无来源] ')
    }

    return tempEdgeName.join('')
}

export const getAssociationTargetLabel = (association: GenAssociationModelInput) => {
    const tempEdgeName: string[] = []

    if (association.targetTable) {
        tempEdgeName.push(association.targetTable.name)
        tempEdgeName.push(' . ')
        tempEdgeName.push(association.columnReferences.map(it => it.targetColumn.name).join(","))
    } else {
        tempEdgeName.push(' [无目标]')
    }

    return tempEdgeName.join('')
}

export const createAssociationName = (
    sourceTableName: string,
    sourceColumnNames: string[],
    targetTableName: string,
    targetColumnNames: string[],
    fake: boolean | undefined,
): string => {
    const genConfigStore = useGenConfigStore()

    let lowerCaseName = false

    if (genConfigStore.isLoaded) {
        const genConfig = genConfigStore.genConfig!

        lowerCaseName = genConfig.lowerCaseName

        sourceTableName = removeSplitPrefixAndSuffix(sourceTableName, genConfig.tablePrefix, genConfig.tableSuffix)
        targetTableName = removeSplitPrefixAndSuffix(targetTableName, genConfig.tablePrefix, genConfig.tableSuffix)

        sourceColumnNames = sourceColumnNames.map(it => {
            return removeSplitPrefixAndSuffix(it, genConfig.columnPrefix, genConfig.columnSuffix)
        })
        targetColumnNames = targetColumnNames.map(it => {
            return removeSplitPrefixAndSuffix(it, genConfig.columnPrefix, genConfig.columnSuffix)
        })
    }

    let sourceColumnNameStr = sourceColumnNames.join("_")
    if (sourceColumnNameStr) {
        sourceColumnNameStr = '_' + sourceColumnNameStr
    }

    let targetColumnNameStr = targetColumnNames.join("_")
    if (targetColumnNameStr) {
        targetColumnNameStr = '_' + targetColumnNameStr
    }

    let associationName = `${fake ? '[logical]' : 'fk'}_${sourceTableName}${sourceColumnNameStr}_${targetTableName}${targetColumnNameStr}`

    return lowerCaseName ? associationName.toLowerCase() : associationName.toUpperCase()
}

export const createAssociationNameByInput = (
    association: GenAssociationModelInput
): string => {
    return createAssociationName(
        association.sourceTable.name,
        association.columnReferences.map(it => it.sourceColumn.name),
        association.targetTable.name,
        association.columnReferences.map(it => it.targetColumn.name),
        association.fake,
    )
}
