export default Object.freeze({
    fileName: 'CrossType.d.ts',
    content: `type CrossType = {
    jvmSource: JvmSource
    databaseSource: DatabaseSource
    sqlType: SqlType
    jvmType: JvmType
    tsType: TsType
    nullable: boolean | undefined
}`,
})
