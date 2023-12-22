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
): string => {
    return `fk_${sourceTableName}_${sourceColumnNames.join("_")}_${targetTableName}_${targetColumnNames.join("_")}`
}
