type TypeTool = {
    sqlToJvm(rawType: string): JvmType
    jvmToSql(rawType: string): SqlType
    jvmToTs(rawType: string): TsType
}
