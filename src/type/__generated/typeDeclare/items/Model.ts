export default Object.freeze({
    fileName: 'Model.d.ts',
    content: `type Model = {
    id: string
    name: string
    description: string
    createdTime: string
    modifiedTime: string
    databaseType: DatabaseType
    databaseNameStrategy: "UPPER_SNAKE" | "LOWER_SNAKE"
    defaultForeignKeyType: ForeignKeyType
    jvmLanguage: JvmLanguage
    defaultEnumerationStrategy: EnumerationStrategy
}`,
})
