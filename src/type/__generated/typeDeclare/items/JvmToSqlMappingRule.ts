export default Object.freeze({
    fileName: 'JvmToSqlMappingRule.d.ts',
    content: `type JvmToSqlMappingRule = {
    jvmSource: JvmSource
    databaseSource: DatabaseSource
    matchRegExp: string
    result: SqlType
}`,
})
