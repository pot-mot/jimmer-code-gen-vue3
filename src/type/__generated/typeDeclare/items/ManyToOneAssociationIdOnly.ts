export default Object.freeze({
    fileName: 'ManyToOneAssociationIdOnly.d.ts',
    content: `type ManyToOneAssociationIdOnly = {
    id: string
    name: string
    comment: string
    type: 'ManyToOne'
    sourceEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    mappedProperty: OneToManyProperty
    foreignKeyType: ForeignKeyType
}`,
})
