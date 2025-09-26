export default Object.freeze({
    fileName: 'OneToOneAssociationIdOnly.d.ts',
    content: `type OneToOneAssociationIdOnly = {
    id: string
    name: string
    type: 'OneToOne'
    sourceEntityId: string
    referencedEntityId: string
    sourcePropertyId: string
    mappedProperty: OneToOneMappedProperty
    foreignKeyType: ForeignKeyType
}`,
})
