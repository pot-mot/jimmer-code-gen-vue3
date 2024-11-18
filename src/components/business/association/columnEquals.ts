export const columnTypeNotEqual = (
    column1: {typeCode: number, overwriteByRaw: boolean, rawType: string},
    column2: {typeCode: number, overwriteByRaw: boolean, rawType: string},
) => {
    return (column1.typeCode !== column2.typeCode) ||
        (
            (column1.overwriteByRaw || column2.overwriteByRaw) &&
            column1.rawType !== column2.rawType
        )
}

export const getColumnCombineKey = (
    column: {name: string, typeCode: number, overwriteByRaw: boolean, rawType: string},
) => {
    return `${column.name} ${column.typeCode} ${column.overwriteByRaw} ${column.rawType}`
}
