export default Object.freeze({
    fileName: 'ForeignKey.d.ts',
    content: `type ForeignKey = {
    name: string
    referencedTableName: string
    columnReferences: [
        {
            sourceColumnName: string
            referencedColumnName: string
        }
    ]
    onUpdate?: string
    onDelete?: string
}`,
})
