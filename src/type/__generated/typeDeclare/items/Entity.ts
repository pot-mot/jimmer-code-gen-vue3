export default {
    fileName: 'Entity.d.ts',
    content: `type Entity = {
    id: string
    subPackagePath: string
    name: string
    comment: string
    tableName: string
    extendsIds: string[]
    extraImports: string[]
    extraAnnotations: string[]
    idProperty: IdProperty
    properties: EntityProperty[]
}`,
}
