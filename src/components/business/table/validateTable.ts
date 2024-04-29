import type {
    GenModelInput_TargetOf_enums,
} from "@/api/__generated/model/static";
import {GenTableModelInput} from "@/api/__generated/model/static";
import {getAllChildTables, getLegalSuperTables} from "@/components/business/table/tableInheritAnalyse.ts";
import {DeepReadonly} from "vue";

export const validateTable = (
    table: DeepReadonly<GenTableModelInput>,
    otherTables: DeepReadonly<Array<GenTableModelInput>>,
    enums: DeepReadonly<Array<GenModelInput_TargetOf_enums>>,
): string[] => {
    const messageList: string[] = []

    const superTables = getLegalSuperTables(table, otherTables.filter(it => it.type === "SUPER_TABLE"))
    const childTables = getAllChildTables(table, otherTables)

    if (table.name.length === 0) {
        messageList.push('表名不得为空')
    }

    for (let otherTable of otherTables) {
        if (otherTable.name === table.name) {
            messageList.push('表名不可重复')
            break
        }
    }

    for (let column of table.columns) {
        if (!column.name || column.name.length === 0) {
            messageList.push('列名不得为空')
            break
        }
    }

    const columnNameSet = new Set<string>()
    for (let column of table.columns) {
        if (columnNameSet.has(column.name)) {
            messageList.push(`列名【${column.name}】不可重复`)
        } else {
            columnNameSet.add(column.name)
        }

        if (column.dataSize as number | null === null) {
            messageList.push(`列【${column.name}】的长度不可为空`);
        }
        if (column.numericPrecision as number | null === null) {
            messageList.push(`列【${column.name}】的精度不可为空`);
        }

        if (column.enum !== undefined && !enums.map(it => it.name).includes(column.enum.name)) {
            messageList.push(`列【${column.name}】对应枚举【${column.enum.name}】不存在`)
        }
    }

    for (let index of table.indexes) {
        if (!index.name || index.name.length === 0) {
            messageList.push('索引名不得为空')
            break
        }
    }
    const indexNameSet = new Set<string>()
    for (let index of table.indexes) {
        if (indexNameSet.has(index.name)) {
            messageList.push(`索引名【${index.name}】不可重复`)
        } else {
            indexNameSet.add(index.name)
        }
    }

    for (let index of table.indexes) {
        const newColumns = []
        for (let column of index.columns) {
            if (!table.columns.map(it => it.name).includes(column.name)) {
                messageList.push(`索引【${index.name}】引用列【${column.name}】不存在，已自动移除`)
            } else {
                newColumns.push(column)
            }
        }

        if (newColumns.length === 0) {
            messageList.push(`索引【${index.name}】引用列长度不得为 0`)
            break
        }

        for (let column of newColumns) {
            if (!column.name || column.name.length === 0) {
                messageList.push(`索引【${index.name}】引用列名不得为空`)
                break
            }
        }

        const indexColumnNameSet = new Set<string>()
        for (let column of newColumns) {
            if (indexColumnNameSet.has(column.name)) {
                messageList.push(`列名【${column.name}】不可重复`)
            } else {
                indexColumnNameSet.add(column.name)
            }
        }
    }


    const newSuperTableSet = new Set<DeepReadonly<GenTableModelInput>>

    for (let superTable of table.superTables) {
        const currentSuperTable = superTables
            .filter(it => it.name === superTable.name)[0]

        if (!currentSuperTable) {
            messageList.push(`【${superTable.name}】不存在/不是上级表/存在循环依赖`)
        } else {
            newSuperTableSet.add(currentSuperTable)
        }
    }

    const newSuperTables = Array.from(newSuperTableSet)

    const pkColumns = table.columns.filter(column => column.partOfPk)

    const superTableColumns =  newSuperTables.flatMap(it => it.columns)

    const superTablePkColumns = superTableColumns.filter(column => column.partOfPk)

    if (table.type !== "SUPER_TABLE") {
        if (superTablePkColumns.length === 0) {
            if (pkColumns.length > 1) {
                messageList.push('仅可有一个主键')
            } else if (pkColumns.length === 0) {
                messageList.push('必须要有一个主键')
            }
        } else {
            if (pkColumns.length > 0) {
                messageList.push('高级表中已具有主键，当前表中不需要主键')
            }
        }
    } else {
        if (pkColumns.length > 1) {
            messageList.push('仅可有一个主键')
        }
    }

    for (let pkColumn of pkColumns) {
        if (!pkColumn.typeNotNull) {
            messageList.push('主键列必须非空')
        }
        if (pkColumn.enum) {
            messageList.push('主键列不可为枚举类型')
        }
        if (pkColumn.businessKey) {
            messageList.push('主键列不可为 Key')
        }
        if (pkColumn.logicalDelete) {
            messageList.push('主键列不可为逻辑删除')
        }
    }

    const superTableColumnNameSet = new Set(superTableColumns.map(it => it.name))
    for (let column of table.columns) {
        if (superTableColumnNameSet.has(column.name)) {
            messageList.push(`列名【${column.name}】与高级表中的列名重复`)
        }
    }

    const childTableColumnNameSet = new Set(childTables.flatMap(it => it.columns.map(it => it.name)))
    for (let column of table.columns) {
        if (childTableColumnNameSet.has(column.name)) {
            messageList.push(`列名【${column.name}】与子表中的列名重复`)
        }
    }

    return messageList
}
