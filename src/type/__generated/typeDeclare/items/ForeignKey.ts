export default {
    fileName: 'ForeignKey.d.ts',
    content: `type ForeignKey = {
    name: string
    targetTableName: string
    columnReferences: [
        {
            sourceColumnName: string
            targetColumnName: string
        }
    ]
    onUpdate?: string
    onDelete?: string
}`,
}
