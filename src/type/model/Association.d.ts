type AssociationType = 'ONE_TO_ONE' | 'MANY_TO_ONE' | 'MANY_TO_MANY'

type ForeignKeyType = 'AUTO' | 'REAL' | 'FAKE'

type JoinColumn = {
    name: string
    referencedColumnName: string
    foreignKeyType: ForeignKeyType
}

type JoinTable = {
    name: string
    joinColumns: JoinColumn[]
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

type Association = {
    id: string
    name: string
    type: AssociationType
    sourceEntityId: string
    targetEntityId: string
    sourcePropertyId: string
    targetPropertyId: string
    joinInfo: {
        type: "joinColumn"
        joinColumn: JoinColumn
    } | {
        type: "joinColumns"
        joinColumns: JoinColumn[]
    } | {
        type: "joinTable"
        joinTable: JoinTable
    }
}
