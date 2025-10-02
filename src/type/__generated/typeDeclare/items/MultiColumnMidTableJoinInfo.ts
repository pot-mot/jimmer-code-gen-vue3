export default Object.freeze({
    fileName: 'MultiColumnMidTableJoinInfo.d.ts',
    content: `type MultiColumnMidTableJoinInfo = {
    type: "MultiColumnMidTable"
    embeddableTypeId: string
    columnNameOverrides: ColumnNameOverride[]
    midTableSourceColumnNameOverrides: ColumnNameOverride[]
    midTableTargetColumnNameOverrides: ColumnNameOverride[]
} & MidTableInfo`,
})
