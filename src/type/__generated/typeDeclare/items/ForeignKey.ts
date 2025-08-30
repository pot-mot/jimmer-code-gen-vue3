export default {
    fileName: 'ForeignKey.d.ts',
    content: `type ForeignKey = {
    name: string,
    sourceTableName: string,
    targetTableName: string,
    columnReferences: [
        {
            sourceColumnName: string,
            targetColumnName: string,
        }
    ]
}`,
}
