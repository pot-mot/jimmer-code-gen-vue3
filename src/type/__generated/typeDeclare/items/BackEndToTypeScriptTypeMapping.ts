export default Object.freeze({
    fileName: 'BackEndToTypeScriptTypeMapping.d.ts',
    content: `type BackEndToTypeScriptTypeMapping = {
    source: BackEndMappingSource
    typeRegExp: string
    tsTypeResult: {
        rawType: string
        extraImports: {
            name: string
            fromPath: string
        }[]
    }
}`,
})
