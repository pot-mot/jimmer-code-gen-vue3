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
            messageList.push(`关联【${association.name}】存在重名`)
        }
        if (
            otherAssociation.sourceTableName === association.sourceTableName &&
            otherAssociation.targetTableName === association.targetTableName &&
            compareArraysIgnoreOrder(otherAssociation.columnReferences, association.columnReferences)
        ) {
            messageList.push(`关联【${association.name}】与关联【${otherAssociation.name}】关联信息完全相同`)
        }
    }

    const tableNameMap = new Map<string, DeepReadonly<GenTableModelInput>>
    tables.forEach((table) => {
        tableNameMap.set(table.name, table);
    })

    const sourceTable = tableNameMap.get(association.sourceTableName)
    if (!sourceTable) {
        messageList.push(`关联【${association.name}】的 Source 表【${association.sourceTableName}】不存在`)
    }
    const targetTable = tableNameMap.get(association.targetTableName)
    if (!targetTable) {
        messageList.push(`关联【${association.name}】的 Target 表【${association.targetTableName}】不存在`)
    }

    if (targetTable && sourceTable) {
        const sourceColumnNames = sourceTable.columns.map(it => it.name)
        const targetColumnNames = targetTable.columns.map(it => it.name)

        const sourceColumns: GenTableModelInput_TargetOf_columns[] = []
        const targetColumns: GenTableModelInput_TargetOf_columns[] = []

        association.columnReferences.forEach(columnReference => {
            const sourceColumnIndex = sourceColumnNames.indexOf(columnReference.sourceColumnName)
            if (sourceColumnIndex !== -1) {
                sourceColumns.push(sourceTable.columns[sourceColumnIndex])
            } else {
                messageList.push(`关联【${association.name}】的 Source 列【${columnReference.sourceColumnName}】不在表【${association.sourceTableName}】中`)
            }

            const targetColumnIndex = targetColumnNames.indexOf(columnReference.targetColumnName)
            if (targetColumnIndex !== -1) {
                targetColumns.push(targetTable.columns[targetColumnIndex])
            } else {
                messageList.push(`关联【${association.name}】的 Target 列【${columnReference.targetColumnName}】不在表【${association.targetTableName}】中`)
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
                    messageList.push(`关联【${association.name}】两端类型不一致`)
                }
            }
        }
    }

    return messageList
}
