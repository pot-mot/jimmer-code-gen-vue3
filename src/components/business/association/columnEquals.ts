import {GenTableModelInput_TargetOf_columns} from "@/api/__generated/model/static";

export const columnTypeNotEqual = (
    column1: { typeCode: number, overwriteByRaw: boolean, rawType: string },
    column2: { typeCode: number, overwriteByRaw: boolean, rawType: string },
) => {
    return (column1.typeCode !== column2.typeCode) ||
        (
            (column1.overwriteByRaw || column2.overwriteByRaw) &&
            column1.rawType !== column2.rawType
        )
}

export type ColumnCombineKey = Pick<GenTableModelInput_TargetOf_columns,
    'name' | 'typeCode' | 'rawType' | 'overwriteByRaw' | 'dataSize' | 'numericPrecision' | 'enum' | 'typeNotNull'
>

export const getColumnCombineKeyStr = (
    column: ColumnCombineKey,
) => {
    return `${column.name} ${column.typeCode} ${column.rawType} ${column.overwriteByRaw} ${column.dataSize} ${column.numericPrecision} ${column.enum?.name ?? ''} ${column.typeNotNull}`
}

export const createColumnCombineLabel = (
    column: ColumnCombineKey
) => {
    return `${column.name} (${column.enum ? `【${column.enum.name}】` : column.rawType}${column.typeNotNull ? '' : '?'})`
}

export const createColumnCombineMap = (
    columns: GenTableModelInput_TargetOf_columns[]
): Map<string, GenTableModelInput_TargetOf_columns[]> => {
    const columnCountMap = new Map<string, GenTableModelInput_TargetOf_columns[]>

    for (const column of columns) {
        const key = getColumnCombineKeyStr(column)
        const currentValue = columnCountMap.get(key)
        if (currentValue !== undefined) {
            currentValue.push(column)
        } else {
            columnCountMap.set(key, [column])
        }
    }

    return columnCountMap
}

export const createColumnNameSet = (
    columns: GenTableModelInput_TargetOf_columns[]
): Set<string> => {
    return new Set<string>(columns.map(it => it.name))
}