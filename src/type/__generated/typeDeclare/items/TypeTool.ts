export default Object.freeze({
    fileName: 'TypeTool.d.ts',
    content: `type TypeTool = {
    sqlToJvm(rawType: string): JvmType
    jvmToSql(rawType: string): SqlType
    jvmToTs(rawType: string): TsType
}`,
})
