export default Object.freeze({
    fileName: 'TypeSelectPair.d.ts',
    content: `type TypeSelectPair = {
    source: BackEndMappingSource
    sqlType: {
        type: string
        dataSize?: number
        numericPrecision?: number
        nullable: boolean
        defaultValue?: string
    }
    backEndType: {
        rawType: string
        extraImports: string[]
    }
}`,
})
