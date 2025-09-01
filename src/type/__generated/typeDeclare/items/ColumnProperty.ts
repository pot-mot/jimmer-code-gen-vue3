export default {
    fileName: 'ColumnProperty.d.ts',
    content: `type ColumnProperty = {
    columnInfo: Omit<Column, 'id'>
} & OptionalOrderProperty`,
}
