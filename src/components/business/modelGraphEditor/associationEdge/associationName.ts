import {GenAssociationModelInput} from "@/api/__generated/model/static";

export const getAssociationSourceLabel = (association: GenAssociationModelInput) => {
    const tempEdgeName: string[] = []

    if (association.sourceTable) {
        tempEdgeName.push(association.sourceTable.name)
        tempEdgeName.push('.')
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
        tempEdgeName.push('.')
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
    let sourceColumnNameStr = sourceColumnNames.join("_")
    if (sourceColumnNameStr) {
        sourceColumnNameStr = '_' + sourceColumnNameStr
    }

    let targetColumnNameStr = targetColumnNames.join("_")
    if (targetColumnNameStr) {
        targetColumnNameStr = '_' + targetColumnNameStr
    }

    return `${fake ? '[logical]' : 'fk'}_${sourceTableName}${sourceColumnNameStr}_${targetTableName}${targetColumnNameStr}`
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
