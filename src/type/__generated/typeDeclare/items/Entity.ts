export default Object.freeze({
    fileName: 'Entity.d.ts',
    content: `type Entity = {
    id: string
    groupId: string
    subPackagePath: string
    name: string
    comment: string
    tableName: string
    extendsIds: string[]
    extraImports: string[]
    extraAnnotations: string[]
}`,
})
