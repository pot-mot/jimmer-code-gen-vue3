export default {
    fileName: 'Entity.d.ts',
    content: `type Entity = {
    id: string
    package: string
    name: string
    extendsIds: string[]
    extraImports: string[]
    extraAnnotations: string[]
    idProperty: IdProperty
    properties: EntityProperty[]
}`,
}
