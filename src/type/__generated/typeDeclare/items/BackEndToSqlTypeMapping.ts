export default Object.freeze({
    fileName: 'BackEndToSqlTypeMapping.d.ts',
    content: `type BackEndToSqlTypeMapping = {
    source: BackEndMappingSource
    typeRegExp: string
    sqlTypeResult: {
        type: string
        dataSize?: number
        numericPrecision?: number
        nullable: boolean
        defaultValue?: string
    }
}`,
})
