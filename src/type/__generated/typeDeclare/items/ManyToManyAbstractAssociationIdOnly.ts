export default Object.freeze({
    fileName: 'ManyToManyAbstractAssociationIdOnly.d.ts',
    content: `type ManyToManyAbstractAssociationIdOnly = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'ManyToMany_Abstract'
    sourceAbstractEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    withMappedProperty: boolean
    mappedProperty: ManyToManyMappedAbstractProperty
    foreignKeyType: ForeignKeyType
}`,
})
