export default Object.freeze({
    fileName: 'SqlToJvmMappingRule.d.ts',
    content: `type SqlToJvmMappingRule = {
    databaseSource: DatabaseSource
    jvmSource: JvmSource
    nullableLimit: boolean | undefined
    matchRegExp: string
    result: JvmType
}`,
})
