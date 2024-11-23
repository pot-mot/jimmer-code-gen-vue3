// src/components/business/table/validateTable.ts
import type {GenModelInput_TargetOf_enums, GenTableModelInput_TargetOf_columns,} from "@/api/__generated/model/static";
import {GenTableModelInput} from "@/api/__generated/model/static";
import {getAllChildTables, getLegalSuperTables} from "@/components/business/table/tableInheritAnalyse.ts";
import {DeepReadonly} from "vue";
import {MainLocaleKeyParam} from "@/i18n";

export const validateTable = (
    table: DeepReadonly<GenTableModelInput>,
    otherTables: DeepReadonly<Array<GenTableModelInput>>,
    enums: DeepReadonly<Array<GenModelInput_TargetOf_enums>>,
): MainLocaleKeyParam[] => {
    const messageList: MainLocaleKeyParam[] = []

    const legalSuperTables = getLegalSuperTables(table, otherTables.filter(it => it.type === "SUPER_TABLE"))
    const childTables = getAllChildTables(table, otherTables)

    if (table.name.length === 0) {
        messageList.push("VALIDATE_GenTable_nameCannotBeEmpty")
    }

    for (const otherTable of otherTables) {
        if (otherTable.name === table.name) {
            messageList.push({key: "VALIDATE_GenTable_nameCannotBeDuplicate", args: [table.name]})
            break
        }
    }

    for (const column of table.columns) {
        if (!column.name || column.name.length === 0) {
            messageList.push("VALIDATE_GenTable_columnNameCannotBeEmpty")
            break
        }
    }

    const columnNameSet = new Set<string>
    for (const column of table.columns) {
        if (columnNameSet.has(column.name)) {
            messageList.push({key: "VALIDATE_GenTable_columnNameCannotBeDuplicate", args: [column.name]})
        } else {
            columnNameSet.add(column.name)
        }

        if (column.dataSize as number | null === null) {
            messageList.push({key: "VALIDATE_GenTable_columnDataSizeCannotBeNull", args: [column.name]});
        }
        if (column.numericPrecision as number | null === null) {
            messageList.push({key: "VALIDATE_GenTable_columnNumericPrecisionCannotBeNull", args: [column.name]});
        }

        if (column.enum !== undefined && !enums.map(it => it.name).includes(column.enum.name)) {
            messageList.push({key: "VALIDATE_GenTable_columnEnumNotFound", args: [column.name, column.enum.name]})
        }
    }

    for (const index of table.indexes) {
        if (!index.name || index.name.length === 0) {
            messageList.push("VALIDATE_GenTable_indexNameCannotBeEmpty")
            break
        }
    }
    const indexNameSet = new Set<string>()
    for (const index of table.indexes) {
        if (indexNameSet.has(index.name)) {
            messageList.push({key: "VALIDATE_GenTable_indexNameCannotBeDuplicate", args: [index.name]})
        } else {
            indexNameSet.add(index.name)
        }
    }

    const superTableSet = new Set<DeepReadonly<GenTableModelInput>>

    for (const superTable of table.superTables) {
        const currentSuperTable = legalSuperTables
            .filter(it => it.name === superTable.name)[0]

        if (!currentSuperTable) {
            messageList.push({key: "VALIDATE_GenTable_superTableNotFound", args: [superTable.name]})
        } else {
            superTableSet.add(currentSuperTable)
        }
    }

    const superTables: Array<DeepReadonly<GenTableModelInput>> = Array.from(superTableSet)

    const pkColumns = table.columns.filter(column => column.partOfPk)

    const superTableColumns = superTables.flatMap(it => it.columns)

    const superTablePkColumns = superTableColumns.filter(column => column.partOfPk)

    if (table.type !== "SUPER_TABLE") {
        if (superTablePkColumns.length === 0) {
            if (pkColumns.length > 1) {
                messageList.push("VALIDATE_GenTable_primaryKeyMustBeSingle")
            } else if (pkColumns.length === 0) {
                messageList.push("VALIDATE_GenTable_mustHavePrimaryKey")
            }
        } else {
            if (pkColumns.length > 0) {
                messageList.push("VALIDATE_GenTable_primaryKeyNotAllowed")
            }
        }
    } else {
        if (pkColumns.length > 1) {
            messageList.push("VALIDATE_GenTable_primaryKeyMustBeSingle")
        }
    }

    for (const pkColumn of pkColumns) {
        if (!pkColumn.typeNotNull) {
            messageList.push({key: "VALIDATE_GenTable_primaryKeyMustBeNotNull", args: [pkColumn.name]})
        }
        if (pkColumn.enum) {
            messageList.push({key: "VALIDATE_GenTable_primaryKeyCannotBeEnum", args: [pkColumn.name]})
        }
        if (pkColumn.businessKey) {
            messageList.push({key: "VALIDATE_GenTable_primaryKeyCannotBeBusinessKey", args: [pkColumn.name]})
        }
        if (pkColumn.logicalDelete) {
            messageList.push({key: "VALIDATE_GenTable_primaryKeyCannotBeLogicalDelete", args: [pkColumn.name]})
        }
    }

    const superTableColumnNameSet = new Set(superTableColumns.map(it => it.name))
    for (const column of table.columns) {
        if (superTableColumnNameSet.has(column.name)) {
            messageList.push({key: "VALIDATE_GenTable_columnNameConflictWithSuperTable", args: [column.name]})
        }
    }

    const childTableColumnNameSet = new Set(childTables.flatMap(it => it.columns.map(it => it.name)))
    for (const column of table.columns) {
        if (childTableColumnNameSet.has(column.name)) {
            messageList.push({key: "VALIDATE_GenTable_columnNameConflictWithChildTable", args: [column.name]})
        }
    }

    const allColumns: DeepReadonly<Array<GenTableModelInput_TargetOf_columns>> = [...superTableColumns, ...table.columns]

    for (const index of table.indexes) {
        const columns = []
        for (const column of index.columns) {
            if (!allColumns.map(it => it.name).includes(column.name)) {
                messageList.push({key: "VALIDATE_GenTable_indexColumnNotFound", args: [index.name, column.name]})
            } else {
                columns.push(column)
            }
        }

        if (columns.length === 0) {
            messageList.push({key: "VALIDATE_GenTable_indexColumnNameCannotBeEmpty", args: [index.name]})
            break
        }

        for (const column of columns) {
            if (!column.name || column.name.length === 0) {
                messageList.push({key: "VALIDATE_GenTable_indexColumnNameCannotBeEmpty", args: [index.name]})
                break
            }
        }

        const indexColumnNameSet = new Set<string>()
        for (const column of columns) {
            if (indexColumnNameSet.has(column.name)) {
                messageList.push({key: "VALIDATE_GenTable_indexColumnNameCannotBeDuplicate", args: [index.name, column.name]})
            } else {
                indexColumnNameSet.add(column.name)
            }
        }
    }

    return messageList
}
