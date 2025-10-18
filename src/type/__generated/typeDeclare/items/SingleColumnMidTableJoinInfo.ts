export default Object.freeze({
    fileName: 'SingleColumnMidTableJoinInfo.d.ts',
    content: `type SingleColumnMidTableJoinInfo = {
    type: "SingleColumnMidTable"
    sourceColumnName: string
    targetColumnName: string
    sourceForeignKeyType: ForeignKeyType
    targetForeignKeyType: ForeignKeyType
} & MidTableInfo`,
})
