type ForeignKeyType = 'REAL' | 'FAKE'

type SingleColumnJoinInfo = {
    type: "SingleColumn",
    columnName: string
    foreignKeyType: ForeignKeyType
}

type MultiColumnJoinInfo = {
    type: "MultiColumn",
    embeddableTypeId: string,
    columnRefs: ColumnRef[]
    foreignKeyType: ForeignKeyType
}

type MidTableInfo = {
    tableName: string
    tableComment: string
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
    sourceColumnName: string
    targetColumnName: string
    sourceForeignKeyType: ForeignKeyType
    targetForeignKeyType: ForeignKeyType
} & MidTableInfo

type MultiColumnMidTableJoinInfo = {
    type: "MultiColumnMidTable"
    sourceJoinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo
    targetJoinInfo: SingleColumnJoinInfo | MultiColumnJoinInfo
} & MidTableInfo

type FkJoinInfo =
    | SingleColumnJoinInfo
    | MultiColumnJoinInfo

type MidTableJoinInfo =
    | SingleColumnMidTableJoinInfo
    | MultiColumnMidTableJoinInfo

type JoinInfo =
    | SingleColumnJoinInfo
    | MultiColumnJoinInfo
    | SingleColumnMidTableJoinInfo
    | MultiColumnMidTableJoinInfo
