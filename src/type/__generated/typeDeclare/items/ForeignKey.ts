export default {
    fileName: 'ForeignKey.d.ts',
    content: `type ForeignKey = {
    id: string
    name: string,
    sourceTableId: string,
    targetTableId: string,
    columnReferences: [
        {
            sourceColumnId: string,
            targetColumnId: string,
        }
    ]
}`,
}
