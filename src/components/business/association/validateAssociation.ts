import {
    GenAssociationModelInput,
    GenTableModelInput,
    GenTableModelInput_TargetOf_columns
} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {compareArraysIgnoreOrder} from "@/utils/array.ts";
import {MainLocaleKeyParam} from "@/i18n";
import {columnTypeNotEqual} from "@/components/business/association/columnEquals.ts";

export const validateAssociation = (
    association: DeepReadonly<GenAssociationModelInput>,
    otherAssociations: DeepReadonly<Array<GenAssociationModelInput>>,
    tables: DeepReadonly<Array<GenTableModelInput>>
): MainLocaleKeyParam[] => {
    const messageList: MainLocaleKeyParam[] = []

    if (association.name.length === 0) {
        messageList.push("VALIDATE_GenAssociation_name_cannotBeEmpty")
    }

    for (let otherAssociation of otherAssociations) {
        if (otherAssociation.name === association.name) {
            messageList.push("VALIDATE_GenAssociation_name_cannotBeDuplicate")
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
            messageList.push({key: "VALIDATE_GenAssociation_joinMeta_cannotBeDuplicate", args: [otherAssociation]})
        } else if (
            otherAssociation.sourceTableName === association.targetTableName &&
            otherAssociation.targetTableName === association.sourceTableName &&
            compareArraysIgnoreOrder(
                otherAssociation.columnReferences.map(it => it.sourceColumnName + " " + it.targetColumnName),
                association.columnReferences.map(it => it.targetColumnName + " " + it.sourceColumnName)
            )
        ) {
            messageList.push({key: "VALIDATE_GenAssociation_joinMeta_cannotBeReverseDuplicate", args: [otherAssociation]})
        }
    }

    const tableNameMap = new Map<string, DeepReadonly<GenTableModelInput>>
    tables.forEach((table) => {
        tableNameMap.set(table.name, table);
    })

    const sourceTable = tableNameMap.get(association.sourceTableName)
    if (!sourceTable) {
        messageList.push({key: "VALIDATE_GenAssociation_sourceTable_notFound", args: [association.sourceTableName]})
    }
    const targetTable = tableNameMap.get(association.targetTableName)
    if (!targetTable) {
        messageList.push({key: "VALIDATE_GenAssociation_targetTable_notFound", args: [association.targetTableName]})
    }

    if (targetTable && sourceTable) {
        if (association.type !== 'MANY_TO_ONE' && sourceTable.type === 'SUPER_TABLE') {
            messageList.push({key: "VALIDATE_GenAssociation_sourceTable_cannotBeSuper", args: [sourceTable]})
        }
        if (targetTable.type === 'SUPER_TABLE') {
            messageList.push({key: "VALIDATE_GenAssociation_targetTable_cannotBeSuper", args: [targetTable]})
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
                messageList.push({key: "VALIDATE_GenAssociation_sourceColumn_notFoundInSourceTable", args: [columnReference.sourceColumnName, sourceTable]})
            }

            const targetColumnIndex = targetColumnNames.indexOf(columnReference.targetColumnName)
            if (targetColumnIndex !== -1) {
                targetColumns.push(targetTable.columns[targetColumnIndex])
            } else {
                messageList.push({key: "VALIDATE_GenAssociation_targetColumn_notFoundInTargetTable", args: [columnReference.targetColumnName, targetTable]})
            }
        })

        if (sourceColumns.length === targetColumns.length) {
            for (let i = 0; i < sourceColumns.length; i++) {
                const sourceColumn = sourceColumns[i]
                const targetColumn = targetColumns[i]

                if (
                    (association.type !== 'MANY_TO_MANY') &&
                    columnTypeNotEqual(sourceColumn, targetColumn)
                ) {
                    messageList.push("VALIDATE_GenAssociation_typeNotMatch")
                }
            }

            const sourcePkColumns = sourceColumns.filter(it => it.partOfPk)
            const sourceTablePkColumns = sourceTable.columns.filter(it => it.partOfPk)
            const sourcePkFlag = sourcePkColumns.length === sourceTablePkColumns.length
            if (!(sourcePkColumns.length === 0 || sourcePkFlag)) {
                messageList.push({key: "VALIDATE_GenAssociation_sourceColumn_mustEntirePKOrNoneOfPK", args: [sourceTable]})
            }

            const targetPkColumns = targetColumns.filter(it => it.partOfPk)
            const targetTablePkColumns = targetTable.columns.filter(it => it.partOfPk)
            const targetPkFlag = targetPkColumns.length === targetTablePkColumns.length
            if (!(targetPkColumns.length === 0 || targetPkFlag)) {
                messageList.push({key: "VALIDATE_GenAssociation_targetColumn_mustEntirePKOrNoneOfPK", args: [targetTable]})
            }

            if (!(sourcePkFlag || targetPkFlag)) {
                messageList.push("VALIDATE_GenAssociation_sourceOrTargetAtLeastOneSizePk")
            }

        } else {
            messageList.push("VALIDATE_GenAssociation_columnCountNotMatch")
        }
    }

    return messageList
}
