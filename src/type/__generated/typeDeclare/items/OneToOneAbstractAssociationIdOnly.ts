export default Object.freeze({
    fileName: 'OneToOneAbstractAssociationIdOnly.d.ts',
    content: `type OneToOneAbstractAssociationIdOnly = {
    id: string
    nameTemplate: string
    commentTemplate: string
    type: 'OneToOne_Abstract'
    sourceAbstractEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    withMappedProperty: boolean
    mappedProperty: OneToOneMappedAbstractProperty
    foreignKeyType: ForeignKeyType
}`,
})
