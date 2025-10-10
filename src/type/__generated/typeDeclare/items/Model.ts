export default Object.freeze({
    fileName: 'Model.d.ts',
    content: `type Model = {
    id: string
    name: string
    description: string
    createdTime: string
    modifiedTime: string
    databaseType: DatabaseType
    databaseNameStrategy: NameStrategy
    defaultForeignKeyType: ForeignKeyType
    jvmLanguage: JvmLanguage
    defaultEnumerationStrategy: EnumerationStrategy
}`,
})
