export default Object.freeze({
    fileName: 'OneToOneAbstractAssociationIdOnly.d.ts',
    content: `type OneToOneAbstractAssociationIdOnly = {
    id: string
    name: string
    type: 'OneToOne_Abstract'
    sourceAbstractEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    mappedProperty: OneToOneMappedAbstractProperty
    foreignKeyType: ForeignKeyType
}`,
})
