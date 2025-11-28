type ForeignKeyType = 'REAL' | 'FAKE'

type UnknownJoinInfo = {
    type: "Unknown"
    foreignKeyType: ForeignKeyType
}

type SingleColumnJoinInfo = {
    type: "SingleColumn"
    columnName: string
    foreignKeyType: ForeignKeyType
}

type MultiColumnJoinInfo = {
    type: "MultiColumn"
    embeddableTypeId: string
    columnRefs: ColumnRef[]
    foreignKeyType: ForeignKeyType
}

type MidTableExtraInfo = {
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

type FkJoinInfo =
    | UnknownJoinInfo
    | SingleColumnJoinInfo
    | MultiColumnJoinInfo

type MidTableJoinInfo = {
    type: "MidTable"
    sourceJoinInfo: FkJoinInfo
    targetJoinInfo: FkJoinInfo
    midTableExtraInfo: MidTableExtraInfo
}
