type ForeignKeyType = 'AUTO' | 'REAL' | 'FAKE'

type SingleColumnJoinInfo = {
    type: "SingleColumn",
    columnName: string
}

type MultiColumnJoinInfo = {
    type: "MultiColumn",
    embeddableTypeId: string,
    columnNameOverrides: ColumnNameOverride[]
}

type MidTableInfo = {
    tableName: string
    readonly?: boolean
    preventDeletionBySource?: boolean
    preventDeletionByTarget?: boolean
    cascadeDeletedBySource?: boolean
    cascadeDeletedByTarget?: boolean
    deletedWhenEndpointIsLogicallyDeleted?: boolean
    filter?: {
        columnName: string
        type: string
        value: string[]
    },
    logicalDeleteFilter?: {
        columnName: string
        type: string
        nullable: boolean
        value: string
        generatorType: string
        generatorRef: string
        initializedValue: string
    }
}

type SingleColumnMidTableJoinInfo = {
    type: "SingleColumnMidTable"
    columnName: string
    midTableSourceColumnName: string
    midTableTargetColumnName: string
} & MidTableInfo

type MultiColumnMidTableJoinInfo = {
    type: "MultiColumnMidTable"
    embeddableTypeId: string
    columnNameOverrides: ColumnNameOverride[]
    midTableSourceColumnNameOverrides: ColumnNameOverride[]
    midTableTargetColumnNameOverrides: ColumnNameOverride[]
} & MidTableInfo
