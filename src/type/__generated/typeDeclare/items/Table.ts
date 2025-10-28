export default Object.freeze({
    fileName: 'Table.d.ts',
    content: `type Table = {
    schema: string
    name: string
    comment: string
    columns: Column[]
    indexes: Index[]
    foreignKeys: ForeignKey[]
    checks: Check[]
}`,
})
