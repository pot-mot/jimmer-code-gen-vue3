export default Object.freeze({
    fileName: 'SingleColumnMidTableJoinInfo.d.ts',
    content: `type SingleColumnMidTableJoinInfo = {
    type: "SingleColumnMidTable"
    columnName: string
    midTableSourceColumnName: string
    midTableTargetColumnName: string
} & MidTableInfo`,
})
