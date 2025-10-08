export default Object.freeze({
    fileName: 'MultiColumnMidTableJoinInfo.d.ts',
    content: `type MultiColumnMidTableJoinInfo = {
    type: "MultiColumnMidTable"
    sourceJoinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo
    targetJoinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo
} & MidTableInfo`,
})
