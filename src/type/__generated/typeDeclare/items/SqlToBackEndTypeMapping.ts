export default Object.freeze({
    fileName: 'SqlToBackEndTypeMapping.d.ts',
    content: `type SqlToBackEndTypeMapping = {
    source: BackEndMappingSource
    typeRegExp: string
    javaTypeResult: {
        rawType: string
        extraImports: string[]
    }
}`,
})
