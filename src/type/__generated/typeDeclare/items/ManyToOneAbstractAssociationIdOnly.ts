export default Object.freeze({
    fileName: 'ManyToOneAbstractAssociationIdOnly.d.ts',
    content: `type ManyToOneAbstractAssociationIdOnly = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'ManyToOne_Abstract'
    sourceAbstractEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    withMappedProperty: boolean
    mappedProperty: OneToManyAbstractProperty
    foreignKeyType: ForeignKeyType
}`,
})
