export default Object.freeze({
    fileName: 'SqlToJvmMappingRule.d.ts',
    content: `type SqlToJvmMappingRule = {
    jvmSource: JvmSource
    databaseSource: DatabaseSource
    matchRegExp: string
    result: JvmType
}`,
})
