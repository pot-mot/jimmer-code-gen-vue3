export default Object.freeze({
    fileName: 'ColumnProperty.d.ts',
    content: `type ColumnProperty = {
    columnInfo: Omit<Column, 'partOfPrimaryKey' | 'autoIncrement'>,
    defaultOrderDirection?: OrderDirection
} & (
    | { typeIsArray: false }
    | { typeIsArray: true, databaseType?: string }
    )`,
})
