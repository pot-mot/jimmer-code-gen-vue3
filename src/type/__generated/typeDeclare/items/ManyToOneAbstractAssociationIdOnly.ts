export default Object.freeze({
    fileName: 'ManyToOneAbstractAssociationIdOnly.d.ts',
    content: `type ManyToOneAbstractAssociationIdOnly = {
    id: string
    name: string
    comment: string
    type: 'ManyToOne_Abstract'
    sourceAbstractEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    mappedProperty: OneToManyAbstractProperty
    foreignKeyType: ForeignKeyType
}`,
})
