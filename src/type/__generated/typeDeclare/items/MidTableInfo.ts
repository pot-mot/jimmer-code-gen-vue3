export default Object.freeze({
    fileName: 'MidTableInfo.d.ts',
    content: `type MidTableInfo = {
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
}`,
})
