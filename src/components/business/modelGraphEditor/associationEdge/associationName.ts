import {GenAssociationModelInput} from "@/api/__generated/model/static";
import {useGenConfigStore} from "@/components/business/genConfig/GenConfigStore.ts";
import {removeSplitPrefixAndSuffix} from "@/utils/suffixAndPrefix.ts";
import {AssociationType} from "@/api/__generated/model/enums";
import {Edge} from "@antv/x6"
import {ASSOCIATION_EDGE} from "@/components/business/modelGraphEditor/constant.ts";

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
    associationType: AssociationType,
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

    let associationName

    // 多对多的关联名称是中间表
    if (associationType == 'MANY_TO_MANY') {
        associationName = `${sourceTableName}_${targetTableName}_mapping`
    // 一对多的外键名称要反向
    } else if (associationType == 'ONE_TO_MANY') {
        associationName = `fk_${targetTableName}_${sourceTableName}`
    } else {
        associationName = `fk_${sourceTableName}_${targetTableName}`
    }

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
        association.associationType,
    )
}

export const syncAssociationName = (
    edge: Edge
) => {
    if (edge.shape == ASSOCIATION_EDGE && edge.getData()?.association != undefined) {
        const association = edge.getData().association as GenAssociationModelInput
        const newName = createAssociationNameByInput(association)
        if (newName != association.name)
            edge.setData({association: {name: newName}}, {deep: true})
    }
}
