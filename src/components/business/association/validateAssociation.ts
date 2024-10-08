import {
    GenAssociationModelInput,
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns
} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {compareArraysIgnoreOrder} from "@/utils/array.ts";

export const validateAssociation = (
    association: DeepReadonly<GenAssociationModelInput>,
    otherAssociations: DeepReadonly<Array<GenAssociationModelInput>>,
    tables: DeepReadonly<Array<GenTableModelInput>>
): string[] => {
    const messageList: string[] = []

    if (association.name.length === 0) {
        messageList.push('关联名不得为空')
    }

    for (let otherAssociation of otherAssociations) {
        if (otherAssociation.name === association.name) {
            messageList.push(`存在重名关联`)
            break
        }

        if (
            otherAssociation.sourceTableName === association.sourceTableName &&
            otherAssociation.targetTableName === association.targetTableName &&
            compareArraysIgnoreOrder(
                otherAssociation.columnReferences.map(it => it.sourceColumnName + " " + it.targetColumnName),
                association.columnReferences.map(it => it.sourceColumnName + " " + it.targetColumnName),
            )
        ) {
            messageList.push(`与关联【${otherAssociation.name}】使用的表与列相同`)
        } else if (
            otherAssociation.sourceTableName === association.targetTableName &&
            otherAssociation.targetTableName === association.sourceTableName &&
            compareArraysIgnoreOrder(
                otherAssociation.columnReferences.map(it => it.sourceColumnName + " " + it.targetColumnName),
                association.columnReferences.map(it => it.targetColumnName + " " + it.sourceColumnName)
            )
        ) {
            messageList.push(`与关联【${otherAssociation.name}】方向相反但使用的表与列相同`)
        }
    }

    const tableNameMap = new Map<string, DeepReadonly<GenTableModelInput>>
    tables.forEach((table) => {
        tableNameMap.set(table.name, table);
    })

    const sourceTable = tableNameMap.get(association.sourceTableName)
    if (!sourceTable) {
        messageList.push(`源表【${association.sourceTableName}】不存在`)
    }
    const targetTable = tableNameMap.get(association.targetTableName)
    if (!targetTable) {
        messageList.push(`目标表【${association.targetTableName}】不存在`)
    }

    if (targetTable && sourceTable) {
        if (association.type !== 'MANY_TO_ONE' && sourceTable.type === 'SUPER_TABLE') {
            messageList.push(`源表【${sourceTable.name}】不可以是上级表`)
        }
        if (targetTable.type === 'SUPER_TABLE') {
            messageList.push(`目标表【${targetTable.name}】不可以是上级表`)
        }

        const sourceColumnNames = sourceTable.columns.map(it => it.name)
        const targetColumnNames = targetTable.columns.map(it => it.name)

        const sourceColumns: GenTableModelInput_TargetOf_columns[] = []
        const targetColumns: GenTableModelInput_TargetOf_columns[] = []

        association.columnReferences.forEach(columnReference => {
            const sourceColumnIndex = sourceColumnNames.indexOf(columnReference.sourceColumnName)
            if (sourceColumnIndex !== -1) {
                sourceColumns.push(sourceTable.columns[sourceColumnIndex])
            } else {
                messageList.push(`源列【${columnReference.sourceColumnName}】不在表【${association.sourceTableName}】中`)
            }

            const targetColumnIndex = targetColumnNames.indexOf(columnReference.targetColumnName)
            if (targetColumnIndex !== -1) {
                targetColumns.push(targetTable.columns[targetColumnIndex])
            } else {
                messageList.push(`目标列【${columnReference.targetColumnName}】不在表【${association.targetTableName}】中`)
            }
        })

        if (sourceColumns.length === targetColumns.length) {
            for (let i = 0; i < sourceColumns.length; i++) {
                const sourceColumn = sourceColumns[i]
                const targetColumn = targetColumns[i]

                if (
                    (sourceColumn.typeCode !== targetColumn.typeCode) ||
                    ((sourceColumn.overwriteByRaw || targetColumn.overwriteByRaw) && sourceColumn.rawType !== targetColumn.rawType)
                ) {
                    messageList.push(`两端类型不一致`)
                }
            }

            const sourcePkColumns = sourceColumns.filter(it => it.partOfPk)
            const sourceTablePkColumns = sourceTable.columns.filter(it => it.partOfPk)
            const sourcePkFlag = sourcePkColumns.length === sourceTablePkColumns.length
            if (!(sourcePkColumns.length === 0 || sourcePkFlag)) {
                messageList.push(`源列必须是表【${sourceTable.name}】完整的主键或者都不在主键中`)
            }

            const targetPkColumns = targetColumns.filter(it => it.partOfPk)
            const targetTablePkColumns = targetTable.columns.filter(it => it.partOfPk)
            const targetPkFlag = targetPkColumns.length === targetTablePkColumns.length
            if (!(targetPkColumns.length === 0 || targetPkFlag)) {
                messageList.push(`目标列必须是表【${targetTable.name}】完整的主键或者都不在主键中`)
            }

            if (!(sourcePkFlag || targetPkFlag)) {
                messageList.push(`源与目标中至少一方需要是主键`)
            }

        } else {
            messageList.push(`两端列数量不一致`)
        }
    }

    return messageList
}
