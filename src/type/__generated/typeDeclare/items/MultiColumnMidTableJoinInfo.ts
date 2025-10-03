export default Object.freeze({
    fileName: 'MultiColumnMidTableJoinInfo.d.ts',
    content: `type MultiColumnMidTableJoinInfo = {
    type: "MultiColumnMidTable"
    embeddableTypeId: string
    columnRefs: {
        source: ColumnRef,
        target: ColumnRef
    }[]
} & MidTableInfo`,
})
