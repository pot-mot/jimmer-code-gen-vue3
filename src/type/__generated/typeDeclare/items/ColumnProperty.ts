export default Object.freeze({
    fileName: 'ColumnProperty.d.ts',
    content: `type ColumnProperty = {
    columnInfo: Omit<Column, 'id' | 'partOfPrimaryKey' | 'autoIncrement'>,
    defaultOrderDirection: "ASC" | "DESC" | undefined
} & (
    | { typeIsArray: false }
    | { typeIsArray: true, databaseType?: string }
    )`,
})
