export default Object.freeze({
    fileName: 'ColumnInfo.d.ts',
    content: `type ColumnInfo = Omit<Column, 'partOfPrimaryKey' | 'autoIncrement'>`,
})
