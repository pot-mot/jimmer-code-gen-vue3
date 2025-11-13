export default Object.freeze({
    fileName: 'SqlToJvmMappingRule.d.ts',
    content: `type SqlToJvmMappingRule = {
    databaseSource: DatabaseSource
    jvmSource: JvmSource
    matchRegExp: string
    result: JvmType
}`,
})
