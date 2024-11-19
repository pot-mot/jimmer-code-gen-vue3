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
    'name' | 'typeCode' | 'rawType' | 'overwriteByRaw' | 'dataSize' | 'numericPrecision' | 'enum'
>

export const getColumnCombineKeyStr = (
    column: ColumnCombineKey,
) => {
    return `${column.name} ${column.typeCode} ${column.rawType} ${column.overwriteByRaw} ${column.dataSize} ${column.numericPrecision} ${column.enum?.name ?? ''}`
}
