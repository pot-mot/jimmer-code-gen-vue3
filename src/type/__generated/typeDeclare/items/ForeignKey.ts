export default Object.freeze({
    fileName: 'ForeignKey.d.ts',
    content: `type ForeignKey = {
    name: string
    referencedTableName: string
    referencedTableSchema: string
    columnRefs: ColumnRef[]
    onUpdate?: string
    onDelete?: string
}`,
})
