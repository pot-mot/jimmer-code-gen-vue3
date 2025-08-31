export default {
    fileName: 'Entity.d.ts',
    content: `type Entity = {
    package: string
    name: string
    extends: string[]
    extraImports: string[]
    extraAnnotations: string[]
    idProperty: IdProperty
    properties: EntityProperty[]
}`,
}
