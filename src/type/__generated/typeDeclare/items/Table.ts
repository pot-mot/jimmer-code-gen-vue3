export default Object.freeze({
    fileName: 'Table.d.ts',
    content: `type Table = {
    id: string
    schema: string
    name: string
    comment: string
    columns: Column[]
    indexes: Index[]
    foreignKeys: ForeignKey[]
}`,
})
