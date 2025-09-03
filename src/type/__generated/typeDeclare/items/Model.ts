export default {
    fileName: 'Model.d.ts',
    content: `type Model = {
    id: string
    name: string
    description: string
    createdTime: string
    modifiedTime: string
    database: DatabaseType
    language: BackEndLanguage
    groups: Group[]
}`,
}
